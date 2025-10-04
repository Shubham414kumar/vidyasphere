import { Link } from "react-router-dom";

const Batches = () => {
  const batches = [
    { id: 1, name: "Morning Batch - Engineering", price: 2999, schedule: "Mon-Fri, 8 AM - 10 AM", seats: 50 },
    { id: 2, name: "Evening Batch - Class 10th", price: 1999, schedule: "Mon-Fri, 5 PM - 7 PM", seats: 40 },
    { id: 3, name: "Weekend Batch - Class 12th", price: 1499, schedule: "Sat-Sun, 10 AM - 2 PM", seats: 30 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold text-primary">← Back to Home</Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Available Batches</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {batches.map(batch => (
            <div key={batch.id} className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-4">{batch.name}</h3>
              <p className="text-muted-foreground mb-2">Schedule: {batch.schedule}</p>
              <p className="text-muted-foreground mb-4">Available Seats: {batch.seats}</p>
              <p className="text-2xl font-bold text-primary mb-4">₹{batch.price}/month</p>
              <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Join Batch
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Batches;
