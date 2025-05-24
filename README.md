🏥 Doctor Appointment Booking System
   
A comprehensive healthcare management solution designed with modern web technologies, providing secure and efficient interfaces for patients, doctors, and administrators.
🌟 Key Features
Patient Portal

🔐 Secure authentication leveraging JWT and Bcrypt.
🔍 Advanced doctor search with customizable filters (specialty, location, availability).
🗓️ Real-time appointment scheduling and management.
💳 Secure payment processing integrated with Stripe.
📱 Fully responsive design optimized across devices.
✉️ Automated email and SMS notifications via Nodemailer and Twilio.

Doctor Dashboard

👨‍⚕️ Profile management with Cloudinary for media storage.
📅 Interactive availability calendar for scheduling.
💼 Robust patient management system.
📊 Detailed performance analytics.
🔔 Real-time notifications for appointment updates.

Admin Console

👥 Comprehensive user management with role-based access control.
📈 Advanced analytics dashboard for system insights.
⚙️ Flexible system configuration options.
🔐 Granular role-based permissions.
📝 Centralized content management capabilities.

🛠 Technology Stack



Component
Technology



Frontend
React.js, Redux Toolkit, Tailwind CSS


Backend
Node.js, Express.js, MongoDB


Authentication
JWT, Bcrypt


Payments
Stripe API


Media Storage
Cloudinary


Notifications
Nodemailer, Twilio (SMS)


🚀 Quick Start Guide
Prerequisites

Node.js (v20.x or higher)
MongoDB (v6.x or higher)
Accounts: Cloudinary, Stripe, Twilio (optional), Gmail (or SMTP provider)

Installation

Clone the repository:
git clone https://github.com/yourusername/doctor-appointment-system.git
cd doctor-appointment-system


Install dependencies:
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install



Configuration
Create .env files in the respective directories with the following configurations:
Backend (./backend/.env)
MONGO_URI=mongodb://localhost:27017/doctor_appointment
JWT_SECRET=your_secure_jwt_secret_64_characters_long
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password

Frontend (./frontend/.env)
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name

Admin (./admin/.env)
VITE_API_URL=http://localhost:3000/api
VITE_ADMIN_SECRET=your_admin_secret_key

🏗 System Architecture
doctor-appointment-system/
├── backend/
│   ├── config/        # Configuration files (database, third-party services)
│   ├── controllers/   # Business logic and request handlers
│   ├── middleware/    # Authentication and error handling
│   ├── models/        # MongoDB schemas (User, Appointment, Doctor)
│   ├── routes/        # API endpoints
│   ├── services/      # Third-party integrations (Stripe, Cloudinary)
│   └── utils/         # Helper functions and utilities
├── frontend/
│   ├── public/        # Static assets (favicon, images)
│   └── src/
│       ├── assets/    # Images, fonts, and static resources
│       ├── components/ # Reusable UI components
│       ├── features/  # Feature-specific modules
│       ├── hooks/     # Custom React hooks
│       ├── pages/     # Route components
│       ├── redux/     # State management with Redux
│       ├── services/  # API service clients
│       └── styles/    # Global styles with Tailwind CSS
├── admin/             # Admin panel (mirrors frontend structure)
└── README.md          # Project documentation

🗃 Database Setup

Install MongoDB: Refer to MongoDB Installation Guide.
Start the MongoDB service:sudo systemctl start mongod


Verify the service status:sudo systemctl status mongod



☁️ Cloudinary Setup

Register at Cloudinary.
Retrieve Cloud Name, API Key, and API Secret from the dashboard.
Add to backend/.env.

💳 Stripe Setup

Create an account at Stripe.
Obtain API keys from the developer dashboard.
Add Secret Key to backend/.env and Public Key to frontend/.env.

🚀 Running the System
Development Mode

Backend:cd backend && npm install && npm run dev


Frontend (Patient Portal):cd ../frontend && npm install && npm run dev


Admin Panel:cd ../admin && npm install && npm run dev




Access: Frontend (http://localhost:5173), Admin (http://localhost:5174), API (http://localhost:3000/api).

Production Mode

Backend:cd backend && npm install && npm start


Frontend:cd ../frontend && npm install && npm run build


Admin:cd ../admin && npm install && npm run build




Serve built files using a web server (e.g., Nginx).

🤝 Contributing Guidelines

Fork the repository.
Create a feature branch:git checkout -b feature/feature-name


Commit changes:git commit -m "Add descriptive commit message"


Push to the branch:git push origin feature/feature-name


Submit a pull request with a detailed description.

🔐 Security Best Practices

Use a strong, unique 64-character JWT_SECRET.
Exclude .env files from version control (add to .gitignore).
Implement HTTPS in production environments.
Validate and sanitize all user inputs.

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
📞 Support
For assistance, contact the project maintainer at support@yourdomain.com or open an issue on GitHub.
📅 Last Updated
May 24, 2025
