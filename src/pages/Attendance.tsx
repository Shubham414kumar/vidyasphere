import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Trash2, 
  Calendar, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  AlertTriangle,
  Target
} from "lucide-react";

interface Subject {
  id: string;
  name: string;
  totalClasses: number;
  attendedClasses: number;
  lastMarked?: Date;
}

const Attendance = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load subjects from localStorage on component mount
  useEffect(() => {
    const savedSubjects = localStorage.getItem("attendance-subjects");
    if (savedSubjects) {
      const parsed = JSON.parse(savedSubjects);
      // Convert lastMarked strings back to Date objects
      const subjectsWithDates = parsed.map((subject: any) => ({
        ...subject,
        lastMarked: subject.lastMarked ? new Date(subject.lastMarked) : undefined
      }));
      setSubjects(subjectsWithDates);
    }
  }, []);

  // Save subjects to localStorage whenever subjects change
  useEffect(() => {
    localStorage.setItem("attendance-subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (!newSubjectName.trim()) return;
    
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: newSubjectName.trim(),
      totalClasses: 0,
      attendedClasses: 0
    };
    
    setSubjects([...subjects, newSubject]);
    setNewSubjectName("");
    setIsAddDialogOpen(false);
    
    toast({
      title: "Subject Added",
      description: `${newSubject.name} has been added to your attendance tracker.`,
    });
  };

  const removeSubject = (id: string) => {
    const subject = subjects.find(s => s.id === id);
    setSubjects(subjects.filter(s => s.id !== id));
    
    toast({
      title: "Subject Removed",
      description: `${subject?.name} has been removed from your tracker.`,
      variant: "destructive",
    });
  };

  const canMarkAttendance = (subject: Subject): boolean => {
    if (!subject.lastMarked) return true;
    
    const now = new Date();
    const lastMarked = new Date(subject.lastMarked);
    const timeDiff = now.getTime() - lastMarked.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    
    return hoursDiff >= 24;
  };

  const markAttendance = (id: string, isPresent: boolean) => {
    const subject = subjects.find(s => s.id === id);
    if (!subject || !canMarkAttendance(subject)) {
      toast({
        title: "Cannot Mark Attendance",
        description: "You can only mark attendance once every 24 hours per subject.",
        variant: "destructive",
      });
      return;
    }

    setSubjects(subjects.map(subject => 
      subject.id === id 
        ? {
            ...subject,
            totalClasses: subject.totalClasses + 1,
            attendedClasses: subject.attendedClasses + (isPresent ? 1 : 0),
            lastMarked: new Date()
          }
        : subject
    ));

    toast({
      title: "Attendance Marked",
      description: `Marked as ${isPresent ? "Present" : "Absent"} for ${subject?.name}`,
    });
  };

  const getAttendancePercentage = (subject: Subject): number => {
    if (subject.totalClasses === 0) return 0;
    return Math.round((subject.attendedClasses / subject.totalClasses) * 100);
  };

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 75) return { status: "Good", color: "text-green-600", variant: "default" as const };
    if (percentage >= 60) return { status: "Warning", color: "text-yellow-600", variant: "secondary" as const };
    return { status: "Critical", color: "text-red-600", variant: "destructive" as const };
  };

  const getTimeUntilNextMark = (subject: Subject): string => {
    if (!subject.lastMarked || canMarkAttendance(subject)) return "";
    
    const now = new Date();
    const lastMarked = new Date(subject.lastMarked);
    const timeDiff = 24 * 60 * 60 * 1000 - (now.getTime() - lastMarked.getTime());
    
    if (timeDiff <= 0) return "";
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };

  const overallStats = {
    totalSubjects: subjects.length,
    averageAttendance: subjects.length > 0 
      ? Math.round(subjects.reduce((sum, subject) => sum + getAttendancePercentage(subject), 0) / subjects.length)
      : 0,
    subjectsAbove75: subjects.filter(subject => getAttendancePercentage(subject) >= 75).length,
    totalClasses: subjects.reduce((sum, subject) => sum + subject.totalClasses, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Attendance Tracker</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Track your daily attendance across all subjects. Maintain the required 75% attendance 
              and stay on top of your academic progress with our smart tracking system.
            </p>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Subject
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Subject</DialogTitle>
                  <DialogDescription>
                    Add a subject to start tracking your attendance
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject Name</label>
                    <Input
                      placeholder="e.g., Mathematics, Physics, Chemistry"
                      value={newSubjectName}
                      onChange={(e) => setNewSubjectName(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSubject()}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addSubject} className="flex-1">Add Subject</Button>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Overall Stats */}
      {subjects.length > 0 && (
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-primary mb-1">{overallStats.totalSubjects}</div>
                  <div className="text-sm text-muted-foreground">Total Subjects</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-accent mb-1">{overallStats.averageAttendance}%</div>
                  <div className="text-sm text-muted-foreground">Average Attendance</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-1">{overallStats.subjectsAbove75}</div>
                  <div className="text-sm text-muted-foreground">Above 75%</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-secondary mb-1">{overallStats.totalClasses}</div>
                  <div className="text-sm text-muted-foreground">Total Classes</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Subjects List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {subjects.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No subjects added yet</h3>
              <p className="text-muted-foreground mb-6">Add your first subject to start tracking attendance</p>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Subject
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Subject</DialogTitle>
                    <DialogDescription>
                      Start tracking your attendance by adding a subject
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Subject name"
                      value={newSubjectName}
                      onChange={(e) => setNewSubjectName(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSubject()}
                    />
                    <div className="flex gap-2">
                      <Button onClick={addSubject} className="flex-1">Add Subject</Button>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="space-y-6">
              {subjects.map((subject) => {
                const percentage = getAttendancePercentage(subject);
                const status = getAttendanceStatus(percentage);
                const canMark = canMarkAttendance(subject);
                const timeRemaining = getTimeUntilNextMark(subject);

                return (
                  <Card key={subject.id} className="card-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{subject.name}</CardTitle>
                          <CardDescription>
                            {subject.attendedClasses} / {subject.totalClasses} classes attended
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={status.variant} className={status.color}>
                            {status.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSubject(subject.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Attendance Progress</span>
                          <span className={`text-lg font-bold ${status.color}`}>
                            {percentage}%
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Current: {percentage}%</span>
                          <span>Target: 75%</span>
                        </div>
                      </div>

                      {/* 75% Requirement Alert */}
                      {percentage < 75 && subject.totalClasses > 0 && (
                        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <div className="text-sm">
                            <span className="font-medium text-yellow-800">
                              Below 75% requirement
                            </span>
                            <div className="text-yellow-700">
                              Attend next {Math.ceil((0.75 * subject.totalClasses - subject.attendedClasses) / 0.25)} classes to reach 75%
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          onClick={() => markAttendance(subject.id, true)}
                          disabled={!canMark}
                          className="flex-1"
                          variant={canMark ? "default" : "secondary"}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Present
                        </Button>
                        <Button
                          onClick={() => markAttendance(subject.id, false)}
                          disabled={!canMark}
                          variant={canMark ? "destructive" : "secondary"}
                          className="flex-1"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Absent
                        </Button>
                      </div>

                      {/* Time Restriction Info */}
                      {!canMark && timeRemaining && (
                        <div className="text-sm text-muted-foreground text-center p-2 bg-muted/50 rounded">
                          Next attendance can be marked in {timeRemaining}
                        </div>
                      )}

                      {/* Last Marked */}
                      {subject.lastMarked && (
                        <div className="text-xs text-muted-foreground text-center">
                          Last marked: {subject.lastMarked.toLocaleDateString()} at {subject.lastMarked.toLocaleTimeString()}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground">
                Simple and effective attendance tracking for academic success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Plus className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Add Subjects</h3>
                  <p className="text-sm text-muted-foreground">
                    Add all your subjects to start tracking attendance for each class
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <h3 className="text-lg font-semibold mb-2">Mark Daily</h3>
                  <p className="text-sm text-muted-foreground">
                    Mark your attendance once per day for each subject you attend
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Target className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h3 className="text-lg font-semibold mb-2">Reach 75%</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor your progress and maintain the required 75% attendance
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Features */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>24-hour marking restriction to prevent duplicate entries</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Real-time percentage calculation and progress tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Visual progress bars and status indicators</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Local storage - your data stays on your device</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Attendance;