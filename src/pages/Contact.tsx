import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold text-primary">← Back to Home</Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Mobile Number
              </h3>
              <p className="text-muted-foreground">+91 7667928057</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Any Inquiry
              </h3>
              <p className="text-muted-foreground">+91 7894781215</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                For Support
              </h3>
              <p className="text-muted-foreground">+91 7903647547</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Batch Inquiries
              </h3>
              <p className="text-muted-foreground">+91 8235323227</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Email
              </h3>
              <p className="text-muted-foreground">shubhammrdm394@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
