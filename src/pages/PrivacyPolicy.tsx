import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold text-primary">← Back to Home</Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information you provide directly to us, including name, email, phone number, and educational information when you register for an account.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your learning experience.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">3. Attendance Data Storage</h2>
            <p className="text-muted-foreground">
              Your attendance records are stored securely on our servers with encryption. This data is accessible only to you and authorized administrators. We implement industry-standard security measures to protect your attendance data from unauthorized access.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">5. Information Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information with service providers who assist us in operating our platform.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, update, or delete your personal information. You can do this by contacting us or through your account settings.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">7. Cookies and Tracking</h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to track activity on our service and hold certain information.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">8. Changes to Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">9. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at shubhammrdm394@gmail.com
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

export default PrivacyPolicy;
