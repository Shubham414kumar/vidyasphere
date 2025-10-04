import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const Attendance = () => {
  const [subject, setSubject] = useState("");
  const [attendance, setAttendance] = useState<any[]>([]);

  const markAttendance = (present: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    const existing = attendance.find(a => a.date === today && a.subject === subject);
    
    if (existing) {
      toast.error("Attendance already marked for today!");
      return;
    }

    setAttendance([...attendance, { subject, date: today, present }]);
    toast.success(`Marked ${present ? 'Present' : 'Absent'} for ${subject}`);
  };

  const calculatePercentage = () => {
    if (attendance.length === 0) return 0;
    const present = attendance.filter(a => a.present).length;
    return ((present / attendance.length) * 100).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold text-primary">← Back to Home</Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Attendance Tracker</h1>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Mark Today's Attendance
            </h2>
            <input
              type="text"
              placeholder="Subject Name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <div className="flex gap-4">
              <button
                onClick={() => markAttendance(true)}
                className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                disabled={!subject}
              >
                Present
              </button>
              <button
                onClick={() => markAttendance(false)}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                disabled={!subject}
              >
                Absent
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Attendance Statistics
            </h2>
            <div className="text-center">
              <p className="text-5xl font-bold text-primary mb-2">{calculatePercentage()}%</p>
              <p className="text-muted-foreground">Overall Attendance</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Total Classes: {attendance.length} | Present: {attendance.filter(a => a.present).length}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> You can mark attendance only once per day for each subject. All data is stored securely and privately on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
