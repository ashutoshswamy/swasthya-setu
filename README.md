# 🏥 स्वास्थ्य सेतु (Swasthya Setu)

<div align="center">

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![MIT WPU](https://img.shields.io/badge/MIT%20WPU-Team%20WellNourish-purple)

**A Centralized Health Management System for Solapur City**

*Bridging Health Services for the People of Solapur*

[Getting Started](#-getting-started) • [Features](#-features) • [Portals](#-portals) • [Tech Stack](#-tech-stack)

</div>

---

## 📋 Overview

**Swasthya Setu** is a comprehensive, centralized health management platform developed for the Solapur Municipal Corporation. The system connects citizens, hospitals, and administrators through dedicated portals to streamline healthcare service delivery, incident reporting, and resource management.

### 🎯 Key Highlights

- **45+ Hospitals Connected** - Integrated network of healthcare facilities
- **2,500+ Beds Tracked** - Real-time bed availability monitoring
- **1,200+ Incidents Resolved** - Efficient health incident management
- **10,000+ Active Users** - Growing community of healthcare stakeholders

---

## ✨ Features

### 🤖 AI-Powered Assistance
- Integrated **Gemini AI** assistant available across all portals
- Context-aware health information and guidance
- Smart insights and recommendations

### 📊 Real-Time Monitoring
- Live bed availability tracking
- Disease trend visualization
- Resource utilization dashboards

### 🚨 Incident Management
- Health incident reporting system
- Alert generation and notification
- Incident resolution tracking

### 🏥 Resource Management
- Hospital capacity management
- Medical equipment tracking
- Staff allocation tools

---

## 🚪 Portals

### 👥 Citizen Portal (`/citizen`)
Empowering citizens with health information and services:
- **Report Incidents** - Submit health-related incidents
- **Check Bed Availability** - Real-time hospital bed status
- **View Health Trends** - Area-wise disease patterns
- **AI Assistant** - Get health-related guidance

### 🏨 Hospital Portal (`/hospital`)
Streamlined hospital management tools:
- **Manage Beds** - Update bed availability in real-time
- **Update Resources** - Track and manage medical resources
- **View Reports** - Access incident reports and analytics
- **AI Assistant** - Hospital-specific insights

### ⚙️ Admin Portal (`/admin`)
Complete system oversight and control:
- **System Overview** - Comprehensive dashboard
- **Manage Hospitals** - Hospital registration and monitoring
- **Analytics Dashboard** - Advanced data visualization
- **Health Trends** - City-wide health analytics
- **Alert Management** - Configure and manage system alerts
- **AI Insights** - AI-powered administrative analysis

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.1.6 |
| **Frontend** | React 19.2.3 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion 12.33 |
| **Icons** | Lucide React |
| **AI Integration** | Google Generative AI (Gemini) |
| **Utilities** | clsx, tailwind-merge |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/swasthya-setu.git
   cd swasthya-setu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   > 💡 Get your free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### Project Structure

```
swasthya-setu/
├── app/
│   ├── admin/       # Admin portal pages
│   ├── citizen/     # Citizen portal pages
│   ├── hospital/    # Hospital portal pages
│   └── api/         # API routes
├── components/      # Reusable UI components
├── lib/             # Utility functions
└── public/          # Static assets
```

---

<div align="center">

**Made with ❤️ by Team WellNourish from MIT WPU**

*स्वास्थ्य सेतु - Bridging Health Services for the People of Solapur*

</div>
