-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2),
  duration TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create batches table
CREATE TABLE IF NOT EXISTS public.batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  price DECIMAL(10,2) NOT NULL,
  start_date DATE,
  end_date DATE,
  schedule TEXT,
  max_students INTEGER,
  current_students INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create notes table
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  subject TEXT,
  grade TEXT,
  file_url TEXT NOT NULL,
  uploaded_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create pyqs table (Previous Year Questions)
CREATE TABLE IF NOT EXISTS public.pyqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  subject TEXT,
  year INTEGER,
  file_url TEXT NOT NULL,
  uploaded_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  category TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  date DATE NOT NULL,
  present BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, subject, date)
);

-- Create donations table
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  message TEXT,
  payment_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create batch_enrollments table
CREATE TABLE IF NOT EXISTS public.batch_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE,
  payment_id TEXT,
  status TEXT DEFAULT 'active',
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, batch_id)
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pyqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batch_enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses (public read)
CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);

-- RLS Policies for batches (public read)
CREATE POLICY "Anyone can view batches" ON public.batches FOR SELECT USING (true);

-- RLS Policies for notes (public read, authenticated upload)
CREATE POLICY "Anyone can view notes" ON public.notes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can upload notes" ON public.notes FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

-- RLS Policies for pyqs (public read, authenticated upload)
CREATE POLICY "Anyone can view pyqs" ON public.pyqs FOR SELECT USING (true);
CREATE POLICY "Authenticated users can upload pyqs" ON public.pyqs FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

-- RLS Policies for blogs (public read published, authors can manage their own)
CREATE POLICY "Anyone can view published blogs" ON public.blogs FOR SELECT USING (published = true OR auth.uid() = author_id);
CREATE POLICY "Authors can create blogs" ON public.blogs FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update their blogs" ON public.blogs FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete their blogs" ON public.blogs FOR DELETE USING (auth.uid() = author_id);

-- RLS Policies for attendance (users manage their own)
CREATE POLICY "Users can view their attendance" ON public.attendance FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their attendance" ON public.attendance FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their attendance" ON public.attendance FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for donations (users can view their own)
CREATE POLICY "Users can view their donations" ON public.donations FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Anyone can create donations" ON public.donations FOR INSERT WITH CHECK (true);

-- RLS Policies for batch_enrollments (users manage their own)
CREATE POLICY "Users can view their enrollments" ON public.batch_enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can enroll in batches" ON public.batch_enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_batches_updated_at BEFORE UPDATE ON public.batches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();