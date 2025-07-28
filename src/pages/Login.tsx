import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, ArrowLeft } from "lucide-react";

const Login = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canResendOTP, setCanResendOTP] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    // Limit to 10 digits for Indian mobile numbers
    if (digits.length <= 10) {
      return digits;
    }
    return digits.slice(0, 10);
  };

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      startCountdown();
      toast({
        title: "OTP Sent",
        description: `Verification code sent to +91 ${phoneNumber}`,
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
        title: "Login Successful",
        description: "Welcome to VidyaSphere!",
      });
      // Redirect logic would go here
    }, 2000);
  };

  const handleResendOTP = () => {
    if (!canResendOTP) return;
    
    startCountdown();
    toast({
      title: "OTP Resent",
      description: `New verification code sent to +91 ${phoneNumber}`,
    });
  };

  const goBack = () => {
    setStep("phone");
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
                  <Smartphone className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">
                  {step === "phone" ? "Welcome Back" : "Verify OTP"}
                </CardTitle>
                <CardDescription>
                  {step === "phone" 
                    ? "Enter your mobile number to login to VidyaSphere"
                    : `Enter the 6-digit code sent to +91 ${phoneNumber}`
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {step === "phone" ? (
                  <>
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
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                          className="pl-12"
                          maxLength={10}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleSendOTP}
                      disabled={isLoading || phoneNumber.length !== 10}
                      className="w-full"
                      size="lg"
                    >
                      {isLoading ? "Sending OTP..." : "Send OTP"}
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
                      {isLoading ? "Verifying..." : "Verify & Login"}
                    </Button>
                    
                    <div className="text-center space-y-2">
                      <Button
                        variant="ghost"
                        onClick={goBack}
                        className="text-sm"
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Change Number
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
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;