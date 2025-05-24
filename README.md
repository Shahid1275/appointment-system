# 🏥 Doctor Appointment Booking System

![MERN Stack](https://img.shields.io/badge/Stack-MERN-9cf) ![Redux](https://img.shields.io/badge/State-Redux-purple) ![Stripe](https://img.shields.io/badge/Payments-Stripe-blue) ![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-orange)

A complete healthcare management solution with patient, doctor, and administrative interfaces built on modern web technologies.

## 🌟 Key Features

### Patient Portal
- 🔐 Secure authentication with JWT
- 🔍 Advanced doctor search with filters
- 🗓️ Real-time appointment scheduling
- 💳 Secure payment processing via Stripe
- 📱 Mobile-responsive design
- ✉️ Email/SMS notifications

### Doctor Dashboard
- 👨‍⚕️ Profile management with Cloudinary
- 📅 Interactive availability calendar
- 💼 Patient management system
- 📊 Performance analytics
- 🔔 Instant notifications

### Admin Console
- 👥 Comprehensive user management
- 📈 Advanced analytics dashboard
- ⚙️ System configuration
- 🔐 Role-based access control
- 📝 Content management

## 🛠 Technology Stack

| Component       | Technology                          |
|-----------------|-------------------------------------|
| Frontend        | React.js, Redux Toolkit, Tailwind CSS |
| Backend         | Node.js, Express.js, MongoDB       |
| Authentication | JWT, Bcrypt                        |
| Payments        | Stripe API                         |
| Media Storage   | Cloudinary                         |
| Notifications   | Nodemailer, Twilio (SMS)           |

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v20.x+
- MongoDB v6.x+
- Cloudinary account
- Stripe account

### Installation

# Clone the repository
git clone https://github.com/yourusername/doctor-appointment-system.git
cd doctor-appointment-system


### Backend Configuration (./backend/.env)
MONGO_URI=mongodb://localhost:27017/doctor_appointment
JWT_SECRET=your_secure_jwt_secret
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password




## Frontend Configuration (./frontend/.env)
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name




## Admin Configuration (./admin/.env)
VITE_API_URL=http://localhost:3000/api
VITE_ADMIN_SECRET=your_admin_secret



## 🏗 System Architecture
doctor-appointment-system/
├── backend/
│   ├── config/        # Configuration files
│   ├── controllers/   # Business logic
│   ├── middleware/    # Authentication
│   ├── models/        # Database schemas
│   ├── routes/        # API endpoints
│   ├── services/      # Third-party integrations
│   └── utils/         # Helper functions
├── frontend/
│   ├── public/        # Static assets
│   └── src/
│       ├── assets/    # Images, fonts
│       ├── components # Reusable UI
│       ├── features/  # Feature modules
│       ├── hooks/     # Custom hooks
│       ├── pages/     # Route components
│       ├── redux/     # State management
│       ├── services/  # API clients
│       └── styles/    # Global styles
└── admin/             # Admin panel (similar structure)



## Running the System
Development Mode
# Backend
cd backend && npm install && npm run dev

# Frontend (Patient)
cd ../frontend && npm install && npm run dev

# Admin Panel
cd ../admin && npm install && npm run dev



🗃️ Database Setup
Install MongoDB

Start service:

sudo systemctl start mongod

Verify:

sudo systemctl status mongod



☁️ Cloudinary Setup
Sign up at Cloudinary

Get credentials from dashboard

Add to backend/.env



💳 Stripe Setup
Create account at Stripe

Get API keys from developer dashboard

Add to both backend and frontend .env files



## Prduction
# Backend
cd backend && npm install && npm start

# Frontend
cd ../frontend && npm install && npm run build

# Admin
cd ../admin && npm install && npm run build



🤝 Contributing Guidelines
Fork the repository

Create feature branch: git checkout -b feature/feature-name

Commit changes: git commit -m "Descriptive message"

Push to branch: git push origin feature/feature-name

Open pull request with detailed description
