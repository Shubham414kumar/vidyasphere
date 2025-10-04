import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your support! Payment integration coming soon.");
    setAmount("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold text-primary">← Back to Home</Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Support Our Mission</h1>
              <p className="text-muted-foreground">
                Your contribution helps us provide quality education to more students
              </p>
            </div>
            <form onSubmit={handleDonate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Donation Amount (₹)</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message (Optional)</label>
                <textarea
                  placeholder="Leave a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg h-24"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold"
              >
                Donate Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
