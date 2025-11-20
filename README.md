# Job Board Application

A modern, responsive job board application built with React, TypeScript, and Vite. This application allows users to browse job listings, filter them by various criteria, and view detailed information about each position.

## Features

### 🔍 Search & Discovery
- **Advanced Search**: Filter jobs by title, company name, or keywords within the description.
- **Location Filtering**: Narrow down opportunities by specific locations.
- **Job Type Filtering**: Sort jobs by type (Full-time, Part-time, Contract, Freelance).
- **Real-time Results**: Search results update instantly as you type.

### 📋 Job Listings
- **Responsive Grid Layout**: Browse jobs in a clean, card-based interface responsive to screen size.
- **Job Cards**: Quick preview of key details: Title, Company, Location, Salary, Type, and Posted Date.
- **Status Indicators**: Visual cues for job types and categories.
- **Empty States**: User-friendly messages and "Clear filters" action when no results match.

### 📄 Job Details
- **Comprehensive View**: Full job description, requirements, and company details.
- **Key Information**: clear display of salary range, location, employment type, and posting date.
- **Action Buttons**: 'Apply Now' and 'Save Job' interface elements.
- **Navigation**: Easy breadcrumb/back navigation to return to search results.

## Tech Stack

- **Framework**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these steps to get the project running locally on your machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd job-board-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/      # Reusable UI components (JobCard, Badge, etc.)
├── data/            # Mock data (jobs.ts)
├── pages/           # Page components (HomePage, JobDetailPage)
├── types/           # TypeScript type definitions
├── App.tsx          # Main application component & routing
└── main.tsx         # Application entry point
```

## License

This project is open source and available under the [MIT License](LICENSE).
