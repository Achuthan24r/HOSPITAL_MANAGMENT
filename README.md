# CarePulse | Hospital Management System (HMS)

CarePulse is a modern, enterprise-grade Hospital Management System designed to streamline healthcare administration, outpatient clinical scheduling, emergency room triage, bed allocation, and electronic medical records.

![CarePulse Hospital Management System](https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200)

---

## 🌟 Key Features

- **Executive Clinical Dashboard**: Real-time KPI telemetry tracking active patients, appointments queue, on-duty specialist doctors, and ward occupancy percentages.
- **Global Medical UI Shell**: Responsive design with light and deep slate dark theme engine, quick search, status beacons, and mobile navigation drawer.
- **Role-Based Authentication**: Seamless institutional login with built-in 1-click demo personas (Administrator, Lead Cardiologist, Front Desk Receptionist).
- **Interactive Appointment Booking**: Immediate consultation slot reservation with doctor assignment, visit rationale, priority tiers, and dynamic status updates.
- **Comprehensive Supabase Schema**: Production-ready PostgreSQL database migrations covering patients, doctors, departments, beds/rooms, appointments, medical records, and billing invoices with Row Level Security (RLS).
- **Modular Full-Stack Architecture**: React 18 + Vite frontend paired with an Express.js REST API using npm workspaces.

---

## 🏗️ Technology Stack

- **Frontend**: React 18, React Router v6, Lucide Icons, Pure CSS Design Tokens
- **Backend**: Node.js, Express.js, CORS, Dotenv
- **Database**: PostgreSQL / Supabase with Row Level Security
- **Dev Tooling**: Vite, Nodemon, Concurrently

---

## 🚀 Quick Start

### 1. Installation
Clone the repository and install all workspace dependencies with a single command:

```bash
git clone https://github.com/Achuthan24r/HOSPITAL_MANAGMENT.git
cd HOSPITAL_MANAGMENT
npm install
```

### 2. Development Server
Start both the Express backend API (`http://localhost:5000`) and the Vite React frontend (`http://localhost:5173`) concurrently:

```bash
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 🩺 Demo Credentials

| Role | Email | Password | Attending Department |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@carepulse.org` | `password123` | Hospital Administration |
| **Lead Doctor** | `doctor@carepulse.org` | `password123` | Cardiology (Floor 3) |
| **Receptionist** | `receptionist@carepulse.org` | `password123` | Front Desk & Admissions |

---

## 🗄️ Database Setup (Supabase)

To link with your live Supabase project:

1. Copy SQL from [`supabase/schema.sql`](supabase/schema.sql) and execute it in your Supabase SQL Editor.
2. In `server/.env`, configure your credentials:
   ```env
   PORT=5000
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. Restart the server. The application automatically synchronizes live Supabase records.

---

## 📜 License
MIT License. Built for modern clinical operations.
