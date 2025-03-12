# TripSync 🌍 - AI-Powered Travel Planning Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**TripSync** is an intelligent travel planning application that combines cutting-edge AI technology with modern web development tools to revolutionize trip organization. Create personalized itineraries, get AI-powered recommendations, and manage your travels effortlessly.

👉 [Live Demo](https://tripsync-seven.vercel.app)


## 🚀 Key Features

- **🤖 Gemini AI Integration** - Smart destination recommendations and itinerary suggestions
- **🔥 Firebase Backend** - Real-time database & secure authentication
- **💎 Modern UI** - Responsive design with TailwindCSS
- **📅 Trip Management** - Create/save multiple travel plans
- **🌍 Location Insights** - Interactive maps & place details
- **📱 Cross-Platform** - Works on all modern browsers
- **🔒 Secure Storage** - Cloud-synced travel plans

## ⚙️ Tech Stack

### Frontend
- **React** - Component-based architecture
- **React Router** - Navigation & routing
- **TailwindCSS** - Modern styling framework
- **Axios** - API communication
- **React Icons** - Icon library

### Backend
- **Firebase** - Authentication & Realtime Database
- **Google Gemini AI** - AI recommendations
- **Google Places API** - Location data & photos

### DevOps
- **Vercel** - Frontend hosting
- **Firebase Hosting** - Backend services
- **GitHub Actions** - CI/CD Pipeline

## 🛠️ Installation Guide

1. **Clone the repository**
```bash
git clone https://github.com/TheRajath/tripsync.git
cd tripsync
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**  
Create `.env.local` file in root directory:
```env
VITE_GOOGLE_PLACE_API_KEY=your_google_maps_api_key
VITE_FIREBASE_API_KEY=your_firebase_config
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. **Start development server**
```bash
npm run dev
```

## 🔑 Required API Keys

| Service          | Environment Variable          | Getting Started Guide |
|------------------|-------------------------------|-----------------------|
| Google Maps      | `VITE_GOOGLE_PLACE_API_KEY`   | [Google Cloud Console](https://console.cloud.google.com) |
| Firebase         | `VITE_FIREBASE_API_KEY`       | [Firebase Console](https://console.firebase.google.com) |
| Google Gemini AI | `VITE_GEMINI_API_KEY`         | [Google AI Studio](https://aistudio.google.com) |

## 📚 Tutorial Highlights

Learn how to implement:
- AI-powered recommendation engine using Gemini
- Secure Firebase authentication flow
- Real-time database operations with Firestore
- Responsive UI design with TailwindCSS
- Google Maps API integration
- Vercel deployment configuration
- Error handling strategies
- Performance optimization techniques

## 🗂 Project Structure
```
tripsync/
├── api/                   # Vercel serverless functions
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   ├── service/           # Firebase & API config
│   ├── App.jsx            # Main application
│   └── main.jsx           # Entry point
├── .env.local             # Environment variables
└── vite.config.js         # Build configuration
```

---
