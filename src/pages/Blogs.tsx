import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, ChevronDown, ChevronUp, Search } from "lucide-react";

const Blogs = () => {
  const [expandedBlog, setExpandedBlog] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogs = [
    {
      id: 1,
      title: "How to Prepare for Engineering Exams?",
      category: "Engineering",
      date: "2025-01-15",
      readTime: "5 min read",
      question: "What are the best strategies to prepare for engineering exams effectively?",
      answer: `Preparing for engineering exams requires a systematic approach:

1. **Understand the Syllabus**: Start by thoroughly reviewing the entire syllabus and identify key topics that carry more weight.

2. **Create a Study Schedule**: Divide your time wisely among all subjects. Allocate more time to difficult topics but don't neglect easier ones.

3. **Practice Previous Year Questions**: Solving PYQs helps you understand exam patterns and frequently asked questions.

4. **Make Short Notes**: Create concise notes for formulas, important concepts, and diagrams for quick revision.

5. **Group Study Sessions**: Collaborate with peers to discuss complex topics and solve problems together.

6. **Take Regular Breaks**: Follow the Pomodoro technique - study for 25 minutes, then take a 5-minute break.

7. **Mock Tests**: Take regular mock tests to assess your preparation level and improve time management.

8. **Stay Healthy**: Maintain a healthy diet, get adequate sleep, and exercise regularly to keep your mind sharp.`
    },
    {
      id: 2,
      title: "Top Tips for Board Exams Success",
      category: "Boards",
      date: "2025-01-10",
      readTime: "6 min read",
      question: "How can students excel in their board examinations?",
      answer: `Board exams are crucial for your academic career. Here are proven strategies:

1. **NCERT is Your Bible**: Focus primarily on NCERT textbooks as most questions come directly from them.

2. **Understand, Don't Memorize**: Focus on understanding concepts rather than rote learning.

3. **Practice Writing**: Board exams test your writing skills. Practice writing answers within time limits.

4. **Previous Year Papers**: Solve at least 10 years of previous papers to understand question patterns.

5. **Time Management**: Allocate specific time to each section during the exam. Don't spend too much time on one question.

6. **Presentation Matters**: Write neat, well-structured answers with proper headings and subheadings.

7. **Revision Strategy**: Revise each subject at least 3 times before the exam.

8. **Stay Positive**: Maintain a positive attitude and don't panic. Believe in your preparation.`
    },
    {
      id: 3,
      title: "Time Management for Students",
      category: "Study Tips",
      date: "2025-01-05",
      readTime: "4 min read",
      question: "What are effective time management techniques for students?",
      answer: `Effective time management is the key to academic success:

1. **Create a Daily Schedule**: Plan your day the night before. Include study time, breaks, meals, and leisure.

2. **Prioritize Tasks**: Use the Eisenhower Matrix - categorize tasks as urgent/important, important/not urgent, etc.

3. **Avoid Multitasking**: Focus on one task at a time for better concentration and efficiency.

4. **Use Technology Wisely**: Use apps like Google Calendar, Todoist, or Focus apps to stay organized.

5. **The 2-Minute Rule**: If a task takes less than 2 minutes, do it immediately instead of postponing.

6. **Set Realistic Goals**: Break large goals into smaller, achievable milestones.

7. **Learn to Say No**: Don't overcommit yourself. It's okay to decline activities that don't align with your priorities.

8. **Review and Adjust**: Weekly review your schedule and adjust based on what worked and what didn't.

9. **Use Dead Time**: Utilize commute time, waiting periods for quick revisions or reading.`
    },
    {
      id: 4,
      title: "How to Stay Motivated During Exam Preparation?",
      category: "Study Tips",
      date: "2025-01-01",
      readTime: "5 min read",
      question: "What strategies help maintain motivation throughout exam preparation?",
      answer: `Staying motivated is challenging but essential for success:

1. **Set Clear Goals**: Define specific, measurable goals for each study session.

2. **Visualize Success**: Imagine yourself achieving your target scores and celebrating success.

3. **Reward Yourself**: Set up a reward system for completing study goals - favorite snack, episode of a show, etc.

4. **Study Environment**: Create a dedicated, comfortable study space free from distractions.

5. **Find Your Study Style**: Experiment with different methods - visual aids, audio notes, flashcards - to find what works best.

6. **Track Progress**: Maintain a study journal to track topics covered and see your progress visually.

7. **Join Study Groups**: Peer support and healthy competition can boost motivation.

8. **Take Care of Mental Health**: Practice meditation, exercise, and take breaks to prevent burnout.

9. **Remember Your Why**: Keep reminding yourself why you're working hard and what you want to achieve.`
    },
    {
      id: 5,
      title: "Best Resources for Competitive Exam Preparation",
      category: "Engineering",
      date: "2024-12-28",
      readTime: "7 min read",
      question: "Which resources are most effective for competitive exam preparation?",
      answer: `Choosing the right resources can make all the difference:

**For JEE Main & Advanced:**
- NCERT Books (Classes 11 & 12)
- H.C. Verma for Physics concepts
- R.D. Sharma for Mathematics
- NCERT for Chemistry + reference books

**For GATE:**
- Standard textbooks for each subject
- Previous 20 years' question papers
- Test series from reputed institutes
- Online platforms like NPTEL for video lectures

**Online Platforms:**
- Khan Academy for concept clarity
- YouTube channels of expert teachers
- Unacademy, BYJU'S for structured courses
- EduMitra for notes and PYQs

**General Tips:**
- Don't buy too many books - master a few good ones
- Focus on understanding concepts, not just solving problems
- Regular practice is more important than collecting resources
- Join online communities for doubt clearing and motivation`
    }
  ];

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category)))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Student Success Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert answers to your most common academic questions
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/20 hover:bg-secondary/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <div
                key={blog.id}
                className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all animate-slide-up"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedBlog(expandedBlog === blog.id ? null : blog.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                          {blog.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {blog.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Published on {new Date(blog.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-muted-foreground italic">
                        Q: {blog.question}
                      </p>
                    </div>
                    <button className="text-primary">
                      {expandedBlog === blog.id ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>

                {expandedBlog === blog.id && (
                  <div className="px-6 pb-6 border-t pt-6 animate-fade-in">
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-line text-foreground leading-relaxed">
                        {blog.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-card border rounded-lg">
              <p className="text-muted-foreground">No blogs found matching your search</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
