import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageCircle,
  Users,
  HelpCircle,
  CreditCard
} from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "General Inquiries",
      description: "For general questions and information",
      contact: "+91 7667928057",
      availability: "Mon-Fri, 9 AM - 6 PM"
    },
    {
      icon: Phone,
      title: "Batch Inquiries",
      description: "For questions about courses and batches",
      contact: "+91 7894781215",
      availability: "Mon-Fri, 10 AM - 8 PM"
    },
    {
      icon: HelpCircle,
      title: "Technical Support",
      description: "For technical issues and platform support",
      contact: "+91 7903647547",
      availability: "24/7 Available"
    },
    {
      icon: Users,
      title: "Batch Feedback",
      description: "For feedback regarding batches and courses",
      contact: "+91 8235323227",
      availability: "Mon-Sat, 11 AM - 7 PM"
    }
  ];

  const quickActions = [
    {
      icon: CreditCard,
      title: "Payment Issues",
      description: "Having trouble with payments or refunds?",
      action: "Contact Support"
    },
    {
      icon: MessageCircle,
      title: "Join Community",
      description: "Connect with fellow students and teachers",
      action: "Join Now"
    },
    {
      icon: Phone,
      title: "Schedule Call",
      description: "Need personalized guidance? Book a call",
      action: "Book Call"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're here to help you succeed in your educational journey. Reach out to us 
              for any questions, support, or feedback about VidyaSphere.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground">
              Choose the best way to reach us based on your inquiry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className="card-shadow hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <method.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-primary">{method.contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{method.availability}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="card-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <Input type="email" placeholder="your.email@example.com" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input placeholder="+91 9876543210" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <select className="w-full px-3 py-2 border border-input rounded-md">
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="technical">Technical Support</option>
                        <option value="batch">Batch Information</option>
                        <option value="payment">Payment Issue</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea 
                      rows={6}
                      placeholder="Please describe your inquiry or message in detail..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Quick Actions</h2>
            <p className="text-xl text-muted-foreground">
              Common tasks you might want to do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {quickActions.map((action, index) => (
              <Card key={index} className="card-shadow hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <action.icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-lg mb-2">{action.title}</CardTitle>
                  <CardDescription className="mb-4">{action.description}</CardDescription>
                  <Button variant="outline" className="w-full">{action.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Location</h2>
              <p className="text-xl text-muted-foreground">
                Based at Government Engineering College, Kishanganj
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Government Engineering College<br />
                    Kishanganj, Bihar<br />
                    India
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>shubhammrdm394@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+91 7667928057</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <p className="text-sm text-muted-foreground">
                        <strong>Emergency Support:</strong> Available 24/7 for technical issues
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>
            
            <div className="space-y-4">
              <Card className="card-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How can I enroll in a batch?</h3>
                  <p className="text-muted-foreground">
                    Visit our Batches page, select your desired course, and click "Enroll Now". 
                    You can pay securely through our payment gateway.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Are the study materials free?</h3>
                  <p className="text-muted-foreground">
                    Yes, our basic notes and PYQ collection is completely free to access. 
                    Premium batches include additional materials and live sessions.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How does the attendance tracker work?</h3>
                  <p className="text-muted-foreground">
                    Add your subjects and mark attendance daily. The system calculates your 
                    percentage and helps you maintain the required 75% attendance.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Can I upload my own notes and PYQs?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! We encourage community contributions. Use the upload buttons 
                    on the Notes and PYQ pages to share your materials.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;