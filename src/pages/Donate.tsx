import { useState } from "react";
import { Heart, Users, BookOpen, Award, CheckCircle, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const presetAmounts = [100, 500, 1000, 2500, 5000, 10000];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount || amount;
    if (!finalAmount) {
      toast.error("Please select or enter an amount");
      return;
    }
    toast.success(`Thank you for your generous donation of ₹${finalAmount}! Payment integration coming soon.`);
    setAmount("");
    setCustomAmount("");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-secondary to-accent text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-20 h-20 mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Support Our Mission</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-slide-up">
            Help us provide quality education to students across India
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Donation Form */}
          <div className="glass-effect rounded-2xl p-8 border animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Make a Donation</h2>
            
            <form onSubmit={handleDonate} className="space-y-6">
              {/* Preset Amounts */}
              <div>
                <label className="block text-sm font-semibold mb-3">Select Amount</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setAmount(preset.toString());
                        setCustomAmount("");
                      }}
                      className={`py-3 px-4 rounded-lg border-2 font-semibold transition ${
                        amount === preset.toString() && !customAmount
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      ₹{preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-sm font-semibold mb-2">Or Enter Custom Amount</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount("");
                    }}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    min="1"
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name *</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Message (Optional)</label>
                <textarea
                  placeholder="Leave a message of support..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Donate Now
              </button>
            </form>
          </div>

          {/* Impact Section */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="glass-effect rounded-2xl p-8 border">
              <h2 className="text-3xl font-bold mb-6">Your Impact</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Every contribution, no matter the size, helps us continue our mission of making quality education accessible to all students.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">₹500 Can Provide</h3>
                    <p className="text-muted-foreground">Study materials and notes for 5 students for one semester</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">₹2,500 Can Provide</h3>
                    <p className="text-muted-foreground">Access to live classes and mentorship for a student for 3 months</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">₹10,000 Can Provide</h3>
                    <p className="text-muted-foreground">Full course access with exam preparation for underprivileged students</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Donate */}
            <div className="glass-effect rounded-2xl p-8 border">
              <h3 className="text-2xl font-bold mb-4">Why Support EduMitra?</h3>
              <div className="space-y-3">
                {[
                  "100% of donations go directly to educational resources",
                  "Transparent reporting on fund utilization",
                  "Tax deduction benefits under Section 80G",
                  "Join thousands of supporters making a difference"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="glass-effect rounded-2xl p-6 border bg-primary/5">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">₹2.5L+</div>
                  <div className="text-sm text-muted-foreground">Total Raised</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Supporters</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Donate;
