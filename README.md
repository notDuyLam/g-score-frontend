# G-Score Frontend

A modern React-based student management system for viewing and analyzing student examination scores. Built with Vite, TypeScript, and Tailwind CSS.

## 🌐 Live Demo

Check out the live application here: [https://g-score-frontend-ten.vercel.app/](https://g-score-frontend-ten.vercel.app/)

## 🖇️ Backend API

The frontend connects to the backend API, which is available at:  
[https://g-score-backend-ut59.onrender.com](https://g-score-backend-ut59.onrender.com)

> **Note:**  
> Make sure the backend API server is running before starting the frontend application. The frontend relies on the backend for all data fetching and analytics features.

## 🚀 Features

- **Student Score Lookup**: Search individual student scores by registration number
- **Dashboard Analytics**: View top 10 students in Group A (Math, Physics, Chemistry)
- **Score Distribution Reports**: Analyze performance across different subjects with interactive charts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with shadcn/ui components for a professional look

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Chart.js with react-chartjs-2
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API server running (for data fetching)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/notDuyLam/g-score-frontend
   cd g-score-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

   For production, create `.env.production`:

   ```env
   VITE_API_BASE_URL=https://your-backend-api-url.com
   ```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Application header
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── ui/             # shadcn/ui components
├── config/             # Configuration files
│   └── api.ts          # API configuration
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Top students dashboard
│   ├── Score.tsx       # Individual score lookup
│   ├── Report.tsx      # Score distribution reports
│   └── Setting.tsx     # Settings page
├── routes/             # Application routing
│   └── AppRoutes.tsx   # Main router component
└── lib/                # Utility libraries
    └── utils.ts        # Helper functions
```

## 🔌 API Endpoints

The frontend expects the following API endpoints:

- `GET /api/{regNumber}` - Get individual student scores
- `GET /api/group/A` - Get top students in Group A
- `GET /api/counts/{subject}` - Get score distribution for a subject

## 📱 Pages Overview

### 1. Dashboard (`/`)

- Displays top 10 students in Group A
- Shows combined scores for Math, Physics, and Chemistry
- Includes ranking with trophy icons for top 3 positions

### 2. Score Lookup (`/score`)

- Search individual student by registration number
- Displays detailed scores for all subjects
- Shows calculated averages and statistics

### 3. Analytics (`/dashboard`)

- Interactive charts showing score distribution
- Filter by different subjects
- Visual representation of student performance

### 4. Settings (`/setting`)

- Application configuration (placeholder)

## 🎨 Responsive Design

The application is fully responsive with:

- **Desktop**: Fixed sidebar with full navigation
- **Tablet/Mobile**: Collapsible sidebar with hamburger menu
- **Touch-friendly**: Optimized for mobile interaction

## 🔧 Environment Configuration

### Development

```env
VITE_API_BASE_URL=http://localhost:3000
```

### Production

```env
VITE_API_BASE_URL=https://your-production-api.com
```
