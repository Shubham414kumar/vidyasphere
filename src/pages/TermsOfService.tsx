import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold text-primary">← Back to Home</Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using EduMitra, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">2. Use of Service</h2>
            <p className="text-muted-foreground">
              Our service is provided for educational purposes. You agree to use the platform responsibly and not to share your account credentials with others.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">3. User Content</h2>
            <p className="text-muted-foreground">
              Users may upload notes and PYQs. You retain ownership of your content but grant us a license to use, display, and distribute it on our platform.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">4. Payment Terms</h2>
            <p className="text-muted-foreground">
              All payments for courses and batches are processed securely. Refunds are subject to our refund policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">5. Attendance Data</h2>
            <p className="text-muted-foreground">
              Your attendance data is stored securely on our servers and is used solely for tracking your academic progress. We do not share this data with third parties without your consent.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              EduMitra shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">7. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">
            Last updated: January 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
