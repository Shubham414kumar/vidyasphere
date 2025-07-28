import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, ArrowLeft, Smartphone } from "lucide-react";

const SignUp = () => {
  const [step, setStep] = useState<"details" | "otp">("details");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: ""
  });
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canResendOTP, setCanResendOTP] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 10) {
      return digits;
    }
    return digits.slice(0, 10);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === "phone" ? formatPhoneNumber(value) : value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.phone.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.grade) {
      toast({
        title: "Grade Required",
        description: "Please select your current grade/level",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSendOTP = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      startCountdown();
      toast({
        title: "OTP Sent",
        description: `Verification code sent to +91 ${formData.phone}`,
      });
    }, 2000);
  };

  const startCountdown = () => {
    setCanResendOTP(false);
    setCountdown(30);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResendOTP(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created Successfully",
        description: "Welcome to VidyaSphere! Your account has been created.",
      });
      // Redirect logic would go here
    }, 2000);
  };

  const handleResendOTP = () => {
    if (!canResendOTP) return;
    
    startCountdown();
    toast({
      title: "OTP Resent",
      description: `New verification code sent to +91 ${formData.phone}`,
    });
  };

  const goBack = () => {
    setStep("details");
    setOtp("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="card-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  {step === "details" ? (
                    <UserPlus className="h-8 w-8 text-primary-foreground" />
                  ) : (
                    <Smartphone className="h-8 w-8 text-primary-foreground" />
                  )}
                </div>
                <CardTitle className="text-2xl">
                  {step === "details" ? "Create Account" : "Verify Phone"}
                </CardTitle>
                <CardDescription>
                  {step === "details" 
                    ? "Join VidyaSphere and start your learning journey"
                    : `Enter the 6-digit code sent to +91 ${formData.phone}`
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {step === "details" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile Number</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          +91
                        </span>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="pl-12"
                          maxLength={10}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="grade">Current Grade/Level</Label>
                      <select
                        id="grade"
                        value={formData.grade}
                        onChange={(e) => handleInputChange("grade", e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md"
                      >
                        <option value="">Select your grade/level</option>
                        <option value="class-8">Class 8th</option>
                        <option value="class-9">Class 9th</option>
                        <option value="class-10">Class 10th</option>
                        <option value="class-11">Class 11th</option>
                        <option value="class-12">Class 12th</option>
                        <option value="engineering">Engineering Student</option>
                        <option value="competitive">Competitive Exam Aspirant</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <Button 
                      onClick={handleSendOTP}
                      disabled={isLoading}
                      className="w-full"
                      size="lg"
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="text-center text-lg tracking-widest"
                        maxLength={6}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleVerifyOTP}
                      disabled={isLoading || otp.length !== 6}
                      className="w-full"
                      size="lg"
                    >
                      {isLoading ? "Verifying..." : "Verify & Complete Signup"}
                    </Button>
                    
                    <div className="text-center space-y-2">
                      <Button
                        variant="ghost"
                        onClick={goBack}
                        className="text-sm"
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Edit Details
                      </Button>
                      
                      <div>
                        {canResendOTP ? (
                          <Button
                            variant="link"
                            onClick={handleResendOTP}
                            className="text-sm"
                          >
                            Resend OTP
                          </Button>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Resend OTP in {countdown}s
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
                
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
                
                {step === "details" && (
                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    By creating an account, you agree to our{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SignUp;