import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Attendance = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddSubject, setShowAddSubject] = useState(false);

  useEffect(() => {
    fetchSubjectsAndAttendance();
  }, []);

  const fetchSubjectsAndAttendance = async () => {
    try {
      setLoading(true);
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.log("Auth error or no user:", authError);
        toast.error("Please login to view attendance");
        setLoading(false);
        return;
      }

      console.log("Fetching subjects for user:", user.id);

      const { data: subjectsData, error: subjectsError } = await supabase
        .from('subjects')
        .select('*')
        .eq('user_id', user.id)
        .order('name');

      if (subjectsError) {
        console.error("Subjects error:", subjectsError);
        throw subjectsError;
      }
      
      console.log("Subjects fetched:", subjectsData);
      setSubjects(subjectsData || []);

      const { data: attendanceData, error: attendanceError } = await supabase
        .from('attendance')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (attendanceError) {
        console.error("Attendance error:", attendanceError);
        throw attendanceError;
      }
      
      console.log("Attendance fetched:", attendanceData);
      setAttendance(attendanceData || []);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast.error(error.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const addSubject = async () => {
    if (!newSubject.trim()) {
      toast.error("Please enter a subject name");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please login to add subjects");
        return;
      }

      const { error } = await supabase
        .from('subjects')
        .insert({ name: newSubject, user_id: user.id });

      if (error) throw error;

      toast.success("Subject added successfully");
      setNewSubject("");
      setShowAddSubject(false);
      fetchSubjectsAndAttendance();
    } catch (error: any) {
      console.error('Error adding subject:', error);
      toast.error("Failed to add subject");
    }
  };

  const deleteSubject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('subjects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success("Subject deleted successfully");
      fetchSubjectsAndAttendance();
    } catch (error: any) {
      console.error('Error deleting subject:', error);
      toast.error("Failed to delete subject");
    }
  };

  const markAttendance = async (subjectId: string, present: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please login to mark attendance");
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      
      const subject = subjects.find(s => s.id === subjectId);
      
      console.log("Marking attendance:", { user_id: user.id, subject_id: subjectId, subject: subject?.name, date: today, present });
      
      // Check if attendance already exists for today
      const { data: existingAttendance } = await supabase
        .from('attendance')
        .select('*')
        .eq('user_id', user.id)
        .eq('subject_id', subjectId)
        .eq('date', today)
        .single();

      if (existingAttendance) {
        toast.error("Attendance already marked for today");
        return;
      }

      const { error } = await supabase
        .from('attendance')
        .insert({
          user_id: user.id,
          subject_id: subjectId,
          subject: subject?.name || '',
          date: today,
          present
        });

      if (error) {
        console.error("Insert error:", error);
        throw error;
      }

      toast.success("Attendance marked successfully");
      fetchSubjectsAndAttendance();
    } catch (error: any) {
      console.error('Error marking attendance:', error);
      toast.error(error.message || "Failed to mark attendance");
    }
  };

  const getSubjectStats = (subjectId: string) => {
    const subjectAttendance = attendance.filter(a => a.subject_id === subjectId);
    const total = subjectAttendance.length;
    const present = subjectAttendance.filter(a => a.present).length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : '0';
    
    return { total, present, percentage };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12 mt-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text flex items-center justify-center gap-3">
            <Calendar className="w-10 h-10" />
            Attendance Tracker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your attendance and monitor your progress
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Subjects</h2>
            <button
              onClick={() => setShowAddSubject(!showAddSubject)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Subject
            </button>
          </div>

          {showAddSubject && (
            <div className="bg-card/80 backdrop-blur-sm border rounded-xl p-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Enter subject name"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addSubject()}
                />
                <button
                  onClick={addSubject}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowAddSubject(false);
                    setNewSubject("");
                  }}
                  className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {subjects.length === 0 ? (
            <div className="text-center py-12 bg-card/80 backdrop-blur-sm border rounded-xl">
              <p className="text-muted-foreground">No subjects added yet. Click "Add Subject" to get started.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {subjects.map((subject) => {
                const stats = getSubjectStats(subject.id);
                return (
                  <div
                    key={subject.id}
                    className="bg-card/80 backdrop-blur-sm border rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                        <div className="flex gap-4 text-sm">
                          <span className="text-muted-foreground">
                            Total: <span className="font-semibold text-foreground">{stats.total}</span>
                          </span>
                          <span className="text-muted-foreground">
                            Present: <span className="font-semibold text-green-600">{stats.present}</span>
                          </span>
                          <span className="text-muted-foreground">
                            Percentage: <span className={`font-semibold ${parseFloat(stats.percentage) >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                              {stats.percentage}%
                            </span>
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteSubject(subject.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => markAttendance(subject.id, true)}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => markAttendance(subject.id, false)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Absent
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Attendance;