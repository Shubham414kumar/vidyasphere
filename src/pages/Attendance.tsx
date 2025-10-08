import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, TrendingUp, Plus, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Attendance = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please login to track attendance");
      navigate("/auth");
      return;
    }
    setUserId(user.id);
    fetchAttendance(user.id);
  };

  const fetchAttendance = async (uid: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('user_id', uid)
        .order('date', { ascending: false });
      
      if (error) throw error;
      setAttendance(data || []);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      toast.error("Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (present: boolean) => {
    if (!userId || !subject) {
      toast.error("Please enter a subject name");
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const existing = attendance.find(a => 
      a.date === today && 
      a.subject.toLowerCase() === subject.toLowerCase()
    );
    
    if (existing) {
      toast.error("Attendance already marked for this subject today!");
      return;
    }

    try {
      const { error } = await supabase
        .from('attendance')
        .insert({
          user_id: userId,
          subject: subject,
          date: today,
          present: present
        });

      if (error) throw error;

      toast.success(`Marked ${present ? 'Present' : 'Absent'} for ${subject}`);
      setSubject("");
      fetchAttendance(userId);
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast.error("Failed to mark attendance");
    }
  };

  const calculatePercentage = () => {
    if (attendance.length === 0) return 0;
    const present = attendance.filter(a => a.present).length;
    return ((present / attendance.length) * 100).toFixed(2);
  };

  const getSubjectStats = () => {
    const stats: { [key: string]: { total: number; present: number } } = {};
    attendance.forEach(a => {
      if (!stats[a.subject]) {
        stats[a.subject] = { total: 0, present: 0 };
      }
      stats[a.subject].total++;
      if (a.present) stats[a.subject].present++;
    });
    return stats;
  };

  const subjectStats = getSubjectStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Attendance Tracker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your attendance and maintain your academic performance
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Mark Attendance Card */}
          <div className="bg-card border rounded-lg shadow-lg p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Plus className="w-6 h-6 text-primary" />
              Mark Today's Attendance
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Subject Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => markAttendance(true)}
                  className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
                  disabled={!subject}
                >
                  ✓ Present
                </button>
                <button
                  onClick={() => markAttendance(false)}
                  className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                  disabled={!subject}
                >
                  ✗ Absent
                </button>
              </div>
            </div>
          </div>

          {/* Overall Statistics */}
          <div className="bg-card border rounded-lg shadow-lg p-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Overall Statistics
            </h2>
            <div className="text-center">
              <p className="text-6xl font-bold text-primary mb-2">{calculatePercentage()}%</p>
              <p className="text-muted-foreground text-lg mb-6">Overall Attendance</p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-3xl font-bold text-primary">{attendance.length}</p>
                  <p className="text-sm text-muted-foreground">Total Classes</p>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4">
                  <p className="text-3xl font-bold text-green-600">
                    {attendance.filter(a => a.present).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Days Present</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subject-wise Statistics */}
          {Object.keys(subjectStats).length > 0 && (
            <div className="bg-card border rounded-lg shadow-lg p-8 animate-slide-up">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                Subject-wise Breakdown
              </h2>
              <div className="space-y-4">
                {Object.entries(subjectStats).map(([subject, stats]) => {
                  const percentage = ((stats.present / stats.total) * 100).toFixed(1);
                  return (
                    <div key={subject} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg">{subject}</h3>
                        <span className={`text-lg font-bold ${
                          parseFloat(percentage) >= 75 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            parseFloat(percentage) >= 75 ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {stats.present} / {stats.total} classes attended
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Info Card */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> You can mark attendance only once per day for each subject. 
              All data is stored securely and privately. Maintain at least 75% attendance for academic requirements.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Attendance;
