import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, FileText, Book, DollarSign, TrendingUp, 
  CheckCircle, XCircle, Shield, Calendar, Eye, Download,
  AlertCircle, Activity, GraduationCap
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Stats {
  totalUsers: number;
  totalNotes: number;
  totalPyqs: number;
  totalBatches: number;
  totalDonations: number;
  pendingNotes: number;
  pendingPyqs: number;
}

interface Note {
  id: string;
  title: string;
  category: string;
  subject: string;
  uploaded_by: string;
  created_at: string;
  view_count: number;
  download_count: number;
}

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  profiles: {
    full_name: string;
    phone: string;
  }[] | null;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<"analytics" | "content" | "users">("analytics");
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalNotes: 0,
    totalPyqs: 0,
    totalBatches: 0,
    totalDonations: 0,
    pendingNotes: 0,
    pendingPyqs: 0,
  });
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [newRoleEmail, setNewRoleEmail] = useState("");
  const [newRoleType, setNewRoleType] = useState<"admin" | "moderator" | "user">("user");

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Access Denied",
          description: "Please login to access the admin dashboard",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { data: roleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (error || !roleData) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await loadDashboardData();
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/");
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load stats
      const [usersRes, notesRes, pyqsRes, batchesRes, donationsRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("notes").select("id", { count: "exact", head: true }),
        supabase.from("pyqs").select("id", { count: "exact", head: true }),
        supabase.from("batches").select("id", { count: "exact", head: true }),
        supabase.from("donations").select("amount"),
      ]);

      const totalDonations = donationsRes.data?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;

      setStats({
        totalUsers: usersRes.count || 0,
        totalNotes: notesRes.count || 0,
        totalPyqs: pyqsRes.count || 0,
        totalBatches: batchesRes.count || 0,
        totalDonations,
        pendingNotes: 0,
        pendingPyqs: 0,
      });

      // Load recent notes
      const { data: notes } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      setRecentNotes(notes || []);

      // Load user roles
      await loadUserRoles();
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadUserRoles = async () => {
    const { data, error } = await supabase
      .from("user_roles")
      .select(`
        id,
        user_id,
        role,
        profiles (
          full_name,
          phone
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading user roles:", error);
      return;
    }

    setUserRoles(data || []);
  };

  const deleteNote = async (noteId: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Note deleted successfully",
    });

    loadDashboardData();
  };

  const addUserRole = async () => {
    if (!newRoleEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    try {
      // Find user profile by searching profiles table
      // First get all profiles
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("user_id, full_name");
      
      if (profileError) throw profileError;

      // Note: In production, you'd need a more robust way to find users
      // For now, admins will need to manually get user IDs
      toast({
        title: "Info",
        description: "Please use the user's ID instead of email. You can find user IDs in the Supabase dashboard under Authentication > Users.",
        variant: "default",
      });

      // For demo purposes, we'll try to insert with the email as user_id
      // In production, this should be the actual UUID
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: newRoleEmail, role: newRoleType });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `Role ${newRoleType} assigned successfully`,
      });

      setNewRoleEmail("");
      setNewRoleType("user");
      loadUserRoles();
    } catch (error) {
      console.error("Error adding user role:", error);
      toast({
        title: "Error",
        description: "Failed to assign role",
        variant: "destructive",
      });
    }
  };

  const removeUserRole = async (roleId: string) => {
    if (!confirm("Are you sure you want to remove this role?")) return;

    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("id", roleId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove role",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Role removed successfully",
    });

    loadUserRoles();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Total Notes", value: stats.totalNotes, icon: FileText, color: "from-purple-500 to-pink-500" },
    { label: "Total PYQs", value: stats.totalPyqs, icon: Book, color: "from-green-500 to-teal-500" },
    { label: "Active Batches", value: stats.totalBatches, icon: GraduationCap, color: "from-orange-500 to-red-500" },
    { label: "Total Donations", value: `₹${stats.totalDonations.toFixed(2)}`, icon: DollarSign, color: "from-indigo-500 to-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Manage your platform, users, and content</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === "analytics"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Activity className="w-4 h-4 inline mr-2" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === "content"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Content Management
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === "users"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            User Roles
          </button>
        </div>

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {statCards.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Activity Overview */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Platform Activity
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Pending Approvals</p>
                  <p className="text-2xl font-bold text-orange-500">{stats.pendingNotes + stats.pendingPyqs}</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Views</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {recentNotes.reduce((sum, n) => sum + n.view_count, 0)}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Downloads</p>
                  <p className="text-2xl font-bold text-green-500">
                    {recentNotes.reduce((sum, n) => sum + n.download_count, 0)}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">User Roles</p>
                  <p className="text-2xl font-bold text-purple-500">{userRoles.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Management Tab */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recent Notes
              </h2>
              
              {recentNotes.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No notes found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentNotes.map((note) => (
                    <div
                      key={note.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{note.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Book className="w-4 h-4" />
                            {note.category}
                          </span>
                          {note.subject && (
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {note.subject}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {note.view_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {note.download_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(note.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* User Roles Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Add Role Form */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Assign User Role
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="User email address"
                  value={newRoleEmail}
                  onChange={(e) => setNewRoleEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  value={newRoleType}
                  onChange={(e) => setNewRoleType(e.target.value as any)}
                  className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={addUserRole}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Add Role
                </button>
              </div>
            </div>

            {/* User Roles List */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Current User Roles
              </h2>
              
              {userRoles.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No user roles assigned</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userRoles.map((userRole) => {
                    const profile = Array.isArray(userRole.profiles) ? userRole.profiles[0] : null;
                    return (
                      <div
                        key={userRole.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div>
                          <p className="font-semibold">{profile?.full_name || "Unknown User"}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{profile?.phone || "No phone"}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              userRole.role === "admin"
                                ? "bg-red-500/20 text-red-500"
                                : userRole.role === "moderator"
                                ? "bg-blue-500/20 text-blue-500"
                                : "bg-green-500/20 text-green-500"
                            }`}>
                              {userRole.role.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeUserRole(userRole.id)}
                          className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
