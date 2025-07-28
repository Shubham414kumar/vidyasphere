import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, BookOpen, Target } from "lucide-react";

const Donate = () => {
  const amounts = [100, 500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 text-red-500" />
            <h1 className="text-5xl font-bold mb-6">Support Education</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Help us make quality education accessible to every student. Your donation helps us provide free resources and support to thousands of learners.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto card-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Make a Donation</CardTitle>
              <CardDescription>Choose an amount to support VidyaSphere</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                {amounts.map(amount => (
                  <Button key={amount} variant="outline" className="h-16">₹{amount}</Button>
                ))}
              </div>
              <Button className="w-full" size="lg">Donate Now</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;