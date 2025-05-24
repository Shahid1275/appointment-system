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
```bash
# Clone the repository
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
