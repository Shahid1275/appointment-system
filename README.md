# 🏥 Doctor Appointment Booking System

![MERN Stack](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?logo=stripe&logoColor=white)

A comprehensive medical appointment platform with patient, doctor, and admin interfaces built with modern web technologies.

## ✨ Features

### For Patients
- 🔐 Secure JWT authentication
- 🔍 Doctor search by specialty/location
- 🗓️ Appointment scheduling system
- 💳 Stripe payment integration
- 📱 Fully responsive design

### For Doctors
- 👨‍⚕️ Profile management with Cloudinary
- 📅 Availability calendar
- 💼 Appointment dashboard
- 🔔 Notification system

### For Admins
- 👥 User management console
- 📊 Analytics dashboard
- ⚙️ System configuration
- 🔐 Role-based access control

## 🚀 Quick Setup

### Prerequisites
- Node.js v20+
- MongoDB v6+
- Cloudinary account
- Stripe account

### Installation
```bash
git clone https://github.com/yourusername/doctor-appointment-system.git
cd doctor-appointment-system


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

## Frontend (.env)
VITE_API_URL=http://localhost:5173
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key


## Admin (.env)
VITE_API_URL=http://localhost:5174
VITE_ADMIN_SECRET=your_admin_secret


## Running the System
# Backend
cd backend && npm install && npm start

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



🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/AmazingFeature)

Open a pull request
