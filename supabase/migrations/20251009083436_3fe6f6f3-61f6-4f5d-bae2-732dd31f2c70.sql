-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
ON public.user_roles FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update notes table policies for admin
CREATE POLICY "Admins can update any note"
ON public.notes FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete any note"
ON public.notes FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update pyqs table policies for admin
CREATE POLICY "Admins can update any pyq"
ON public.pyqs FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete any pyq"
ON public.pyqs FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Add subjects table for attendance
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on subjects
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- RLS policies for subjects
CREATE POLICY "Users can view their own subjects"
ON public.subjects FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subjects"
ON public.subjects FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subjects"
ON public.subjects FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own subjects"
ON public.subjects FOR DELETE
USING (auth.uid() = user_id);

-- Update attendance table to reference subjects
ALTER TABLE public.attendance ADD COLUMN subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE;

-- Add payment tables
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  payment_method TEXT DEFAULT 'phonepe',
  transaction_id TEXT,
  status TEXT DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS policies for payments
CREATE POLICY "Users can view their own payments"
ON public.payments FOR SELECT
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create payments"
ON public.payments FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all payments"
ON public.payments FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));