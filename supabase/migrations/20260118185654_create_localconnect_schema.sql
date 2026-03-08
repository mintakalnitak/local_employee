/*
  # LocalConnect Database Schema

  ## Overview
  This migration creates the complete database structure for the LocalConnect application,
  a platform for finding and hiring nearby service providers.

  ## New Tables

  ### 1. `employees` (Service Providers)
  Stores information about service providers (plumbers, electricians, etc.)
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Provider's full name
  - `profession` (text) - Type of service (Plumber, Electrician, etc.)
  - `location` (text) - City/area where they operate
  - `phone` (text) - Contact phone number
  - `email` (text) - Email address
  - `rating` (numeric) - Average rating (0-5)
  - `skills` (text array) - List of specific skills
  - `availability` (text) - Working hours/days
  - `photo_url` (text) - Profile photo URL
  - `description` (text) - Bio/description
  - `experience_years` (integer) - Years of experience
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. `reviews`
  Stores customer reviews and ratings for service providers
  - `id` (uuid, primary key) - Unique identifier
  - `employee_id` (uuid, foreign key) - References employees table
  - `customer_name` (text) - Name of the reviewer
  - `rating` (integer) - Rating given (1-5)
  - `comment` (text) - Review text
  - `created_at` (timestamptz) - Review timestamp

  ### 3. `bookings`
  Stores booking/contact requests from customers
  - `id` (uuid, primary key) - Unique identifier
  - `employee_id` (uuid, foreign key) - References employees table
  - `customer_name` (text) - Customer's name
  - `customer_phone` (text) - Customer's phone
  - `customer_email` (text) - Customer's email
  - `service_required` (text) - Description of service needed
  - `preferred_date` (date) - Preferred service date
  - `status` (text) - Booking status (pending/confirmed/completed)
  - `created_at` (timestamptz) - Booking creation timestamp

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Public read access for employees and reviews (anyone can browse)
  - Public write access for bookings and reviews (anyone can book/review)
  - Employees table is read-only for public (admin-only writes in future)

  ## Notes
  - All tables use UUID primary keys for scalability
  - Timestamps use timestamptz for timezone awareness
  - Rating calculations can be done via triggers in future updates
*/

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  profession text NOT NULL,
  location text NOT NULL,
  phone text NOT NULL,
  email text,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  skills text[] DEFAULT '{}',
  availability text DEFAULT 'Mon-Sat, 9am-6pm',
  photo_url text,
  description text DEFAULT '',
  experience_years integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  service_required text NOT NULL,
  preferred_date date,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for employees table
-- Anyone can view employees
CREATE POLICY "Anyone can view employees"
  ON employees
  FOR SELECT
  TO public
  USING (true);

-- RLS Policies for reviews table
-- Anyone can view reviews
CREATE POLICY "Anyone can view reviews"
  ON reviews
  FOR SELECT
  TO public
  USING (true);

-- Anyone can add reviews
CREATE POLICY "Anyone can add reviews"
  ON reviews
  FOR INSERT
  TO public
  WITH CHECK (true);

-- RLS Policies for bookings table
-- Anyone can create bookings
CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_employees_profession ON employees(profession);
CREATE INDEX IF NOT EXISTS idx_employees_location ON employees(location);
CREATE INDEX IF NOT EXISTS idx_employees_rating ON employees(rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_employee ON reviews(employee_id);
CREATE INDEX IF NOT EXISTS idx_bookings_employee ON bookings(employee_id);

-- Function to update employee rating based on reviews
CREATE OR REPLACE FUNCTION update_employee_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE employees
  SET rating = (
    SELECT COALESCE(AVG(rating), 0)
    FROM reviews
    WHERE employee_id = NEW.employee_id
  )
  WHERE id = NEW.employee_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update rating when review is added
CREATE TRIGGER trigger_update_employee_rating
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_employee_rating();

INSERT INTO employees (name, profession, location, phone, email, rating, skills, availability, photo_url, description, experience_years) VALUES
('Manoj Kumar', 'Plumber', 'Kochi', '9876543210', 'manoj.kumar@example.com', 4.5, ARRAY['Pipe fitting', 'Drain cleaning', 'Leak repair'], 'Mon-Sat, 9am-6pm', 'https://i.pravatar.cc/150?u=manojkumar', 'A reliable plumber with over 10 years of experience.', 10),
('Priya Nair', 'Electrician', 'Trivandrum', '9876543211', 'priya.nair@example.com', 4.8, ARRAY['Wiring', 'Fixture installation', 'Panel upgrades'], 'Mon-Fri, 10am-7pm', 'https://i.pravatar.cc/150?u=priyanair', 'Certified electrician specializing in residential and commercial projects.', 8),
('Anil Varma', 'Carpenter', 'Kozhikode', '9876543212', 'anil.varma@example.com', 4.2, ARRAY['Furniture making', 'Cabinetry', 'Door installation'], 'Mon-Sat, 8am-5pm', 'https://i.pravatar.cc/150?u=anilvarma', 'Skilled carpenter with a passion for creating custom furniture.', 15),
('Sunitha Menon', 'House Painter', 'Thrissur', '9876543213', 'sunitha.menon@example.com', 4.9, ARRAY['Interior painting', 'Exterior painting', 'Texture painting'], 'Mon-Sun, 9am-6pm', 'https://i.pravatar.cc/150?u=sunithamenon', 'Experienced house painter known for high-quality work and attention to detail.', 12),
('Rajesh Pillai', 'AC Mechanic', 'Kollam', '9876543214', 'rajesh.pillai@example.com', 4.6, ARRAY['AC installation', 'AC repair', 'AC maintenance'], 'Mon-Sat, 9am-7pm', 'https://i.pravatar.cc/150?u=rajeshpillai', 'Expert AC mechanic providing fast and efficient services.', 7);
