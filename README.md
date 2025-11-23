# Job Board Application - Full Stack

A modern, full-stack job board application built with React, TypeScript, Vite, and Supabase. This application allows users to browse job listings, employers to post and manage jobs, and admins to approve job listings with complete authentication and role-based access control.

## Features

### 🔐 Authentication & Authorization
- **Email/Password Authentication**: Secure sign up and sign in powered by Supabase Auth
- **Role-Based Access Control**: Three user types with distinct permissions
  - **Job Seekers**: Browse and apply to approved jobs
  - **Employers**: Post, edit, and manage their own job listings
  - **Admins**: Review, approve, or reject job listings
- **Protected Routes**: Role-specific pages with automatic redirects
- **Session Management**: Persistent authentication with automatic token refresh

### 👤 User Roles

#### Job Seeker
- Browse all approved job listings
- Search and filter jobs by title, location, type, and category
- View detailed job information
- Apply to jobs (UI ready, application flow uses placeholder)
- Manage personal profile (Name, Email)

#### Employer
- Access employer dashboard with job statistics
- Post new job listings (submitted for admin approval)
- Edit and delete own job listings
- View job status (pending, approved, rejected)
- Manage company profile (Name, Description, Website)
- Filter jobs by status

#### Admin
- Access admin dashboard with platform statistics
- Review all job listings across the platform
- Approve or reject pending job submissions
- Search and filter jobs by status and keywords
- View detailed job information in review modal

### 🔍 Search & Discovery
- **Advanced Search**: Filter jobs by title, company name, or keywords
- **Location Filtering**: Narrow down opportunities by location
- **Job Type Filtering**: Filter by Full-time, Part-time, Contract, or Freelance
- **Category Filtering**: Browse by job category (Engineering, Design, Marketing, etc.)
- **Real-time Results**: Search results update instantly

### 📋 Job Management
- **Employer Dashboard**: Stats cards showing total, pending, approved, and rejected jobs
- **Job Posting Form**: Comprehensive form with validation
  - Job title, company, location, type, salary, category
  - Rich description field
  - Dynamic requirements list
- **Job Editing**: Update existing job listings
- **Status Tracking**: Visual status badges for job approval states
- **Admin Review**: Modal-based job review with approve/reject actions

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first design that works on all devices
- **Clean Interface**: Professional design with Tailwind CSS
- **Loading States**: Skeleton screens and spinners for better UX
- **Error Handling**: User-friendly error messages with retry options
- **Empty States**: Helpful messages when no data is available
- **Role-Based Navigation**: Dynamic navbar based on user role

## Tech Stack

- **Frontend**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend**: [Supabase](https://supabase.com/)
  - PostgreSQL Database
  - Row Level Security (RLS)
  - Authentication
  - Real-time subscriptions (ready for implementation)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- A Supabase account ([sign up for free](https://supabase.com))

### 1. Clone the Repository

```bash
git clone <repository-url>
cd job-board-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details:
   - Project name
   - Database password (save this securely)
   - Region (choose closest to your users)
4. Wait for the project to be created (1-2 minutes)

#### Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (the public anonymous key)

#### Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 4. Run Database Migrations

You need to run the SQL migration files to set up the database schema, RLS policies, and functions.

1. In your Supabase dashboard, go to **SQL Editor**
2. Run each migration file in the following order by copying the content and running it in the SQL Editor:

   1. `supabase/migrations/20240101000000_initial_schema.sql`
   2. `supabase/migrations/20240101000001_rls_policies.sql`
   3. `supabase/migrations/20240101000002_functions.sql`
   4. `supabase/migrations/20251123000000_fix_handle_new_user_path.sql`
   5. `supabase/migrations/20251124000000_auto_create_employer_profile.sql`
   6. `supabase/migrations/20251124000001_fix_admin_policies.sql`
   7. `supabase/migrations/20251124000002_fix_job_recursion.sql`
   8. `supabase/migrations/99999999999999_reset_and_fix.sql` (Optional: Run if you encounter issues with user signup)

### 5. Run the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Testing the Application

### Create Test Accounts

Since you're starting with an empty database, you'll need to create test accounts for each role:

#### 1. Create a Job Seeker Account
1. Click "Sign Up" on the homepage
2. Fill in the form:
   - Full Name: "John Doe"
   - Email: "jobseeker@test.com"
   - Password: "password123"
   - Role: "Job Seeker"
3. Sign up and you'll be logged in

#### 2. Create an Employer Account
1. Sign out (click on user menu in navbar)
2. Click "Sign Up"
3. Fill in the form:
   - Full Name: "Jane Smith"
   - Email: "employer@test.com"
   - Password: "password123"
   - Role: "Employer"
   - Company Name: "TechCorp Inc." (You can update this in Profile later)
4. Sign up and you'll be logged in
5. You'll see the Employer Dashboard

#### 3. Create an Admin Account
Admins cannot be created through the UI for security. Create one via SQL:

1. First, create a regular account via Sign Up (can be any role)
2. In Supabase SQL Editor, run:
   ```sql
   UPDATE public.users
   SET role = 'admin'
   WHERE email = 'admin@test.com';
   ```
   (Replace with the email you signed up with)
3. Sign out and sign back in to see admin access

### Test the Workflow

#### As an Employer:
1. Go to "Post Job" from the navbar
2. Fill out the job form
3. Submit the job (it will be in "pending" status)
4. Go to "Employer Dashboard" to see your posted job

#### As an Admin:
1. Go to "Admin Dashboard"
2. You'll see all jobs including pending ones
3. Click "Review" on a pending job
4. Approve or reject the job

#### As a Job Seeker (or Public):
1. Go to homepage
2. You'll see only approved jobs
3. Use search and filters to find jobs
4. Click on a job to see details

## Database Schema

### Tables

#### users
- `id` (UUID, references auth.users)
- `role` (enum: job_seeker, employer, admin)
- `full_name` (text)
- `created_at`, `updated_at` (timestamps)

#### employers
- `id` (UUID, primary key)
- `user_id` (UUID, references users)
- `company_name` (text)
- `company_description` (text, nullable)
- `company_website` (text, nullable)
- `company_logo_url` (text, nullable)
- `created_at`, `updated_at` (timestamps)

#### jobs
- `id` (UUID, primary key)
- `employer_id` (UUID, references employers)
- `title`, `company`, `location`, `salary`, `category`, `description` (text)
- `type` (enum: Full-time, Part-time, Contract, Freelance)
- `requirements` (text array)
- `status` (enum: pending, approved, rejected)
- `posted_at` (date)
- `created_at`, `updated_at` (timestamps)

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

#### Public Access
- Read approved jobs (status = 'approved')

#### Employers
- Create jobs (status automatically set to 'pending')
- Read, update, delete own jobs
- Cannot change job status

#### Admins
- Read all jobs regardless of status
- Update job status (approve/reject)

#### Users
- Read and update own profile
- Employers can manage own company info

## Project Structure

```
job-board-app/
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/            # React Context providers
│   ├── pages/              # Page components
│   ├── services/           # API service layers
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions and constants
│   ├── config/             # Configuration files
│   ├── lib/                # Library initializations
│   ├── App.tsx             # Main app with routing
│   └── main.tsx            # Entry point
├── supabase/
│   └── migrations/         # Database migration files
├── .env.example            # Environment variables template
└── README.md
```

## Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment Variables

Required environment variables (add to `.env.local`):

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Future Enhancements

- [ ] Job application system (Application tracking and management)
- [ ] Email notifications (Confirmation emails, Status updates)
- [ ] Public Company Profiles (View all jobs by a specific company)
- [ ] Saved jobs for job seekers
- [ ] Real-time updates (Live job status changes)
- [ ] File uploads for company logos
- [ ] Analytics dashboard for Admins and Employers

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure you've created `.env.local` with your credentials
- Restart the dev server after adding environment variables

### "Failed to load jobs"
- Check that you've run all database migrations
- Verify your Supabase project is active
- Check the browser console for specific errors

### "Not authorized" errors
- Make sure RLS policies are properly set up (Run migration `20240101000001_rls_policies.sql` and `20251124000001_fix_admin_policies.sql`)
- Check that you're logged in with the correct role
- Verify the user's role in the database

### User Signup Issues
- If you encounter errors during signup or user profiles aren't created, run `supabase/migrations/99999999999999_reset_and_fix.sql` to reset the user creation trigger.

## License

This project is open source and available under the [MIT License](LICENSE).
