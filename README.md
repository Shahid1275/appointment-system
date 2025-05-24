🏥 Doctor Appointment Booking System
   
A robust and scalable healthcare management solution built with the MERN stack, offering patient, doctor, and admin interfaces for efficient appointment scheduling, profile management, and system administration.
🌟 Key Features
Patient Portal

🔐 Secure authentication using JWT and Bcrypt.
🔍 Advanced doctor search with filters (specialty, location, availability).
🗓️ Real-time appointment scheduling and management.
💳 Secure payment processing via Stripe.
📱 Fully responsive design optimized for all devices.
✉️ Email and SMS notifications using Nodemailer and Twilio.

Doctor Dashboard

👨‍⚕️ Profile management with Cloudinary media storage.
📅 Interactive availability calendar.
💼 Comprehensive patient management system.
📊 Performance analytics and insights.
🔔 Real-time notifications for appointments.

Admin Console

👥 User management with role-based access control.
📈 Advanced analytics dashboard.
⚙️ System configuration options.
🔐 Secure role-based permissions.
📝 Content management for system-wide updates.

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
Nodemailer, Twilio


🚀 Getting Started
Prerequisites

Node.js (v20.x+)
MongoDB (v6.x+)
Accounts: Cloudinary, Stripe, Twilio, Gmail (or SMTP provider)

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
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
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
│   ├── config/         # Database and third-party service configurations
│   ├── controllers/    # Request handling and business logic
│   ├── middleware/     # Authentication and error handling
│   ├── models/         # MongoDB schemas (User, Appointment, Doctor)
│   ├── routes/         # API endpoints (auth, appointments, users)
│   ├── services/       # Integrations (Stripe, Cloudinary, Twilio)
│   └── utils/          # Helper functions and utilities
├── frontend/
│   ├── public/         # Static assets (favicon, images)
│   └── src/
│       ├── assets/     # Images, fonts, and static resources
│       ├── components/ # Reusable UI components (Navbar, Footer)
│       ├── features/   # Feature modules (auth, booking)
│       ├── hooks/      # Custom React hooks
│       ├── pages/      # Route components (Home, Profile)
│       ├── redux/      # Redux slices and store configuration
│       ├── services/   # API clients (Axios)
│       └── styles/     # Tailwind CSS and global styles
├── admin/              # Admin panel (similar structure to frontend)
└── README.md           # Project documentation

🗃 Database Setup

Install MongoDB: Follow MongoDB Installation Guide.
Start MongoDB:sudo systemctl start mongod


Verify status:sudo systemctl status mongod



☁️ Cloudinary Setup

Sign up at Cloudinary.
Obtain Cloud Name, API Key, and API Secret from the dashboard.
Add to backend/.env.

💳 Stripe Setup

Create a Stripe account.
Get Secret Key and Public Key from the developer dashboard.
Add to backend/.env and frontend/.env.

📬 Twilio Setup

Sign up at Twilio.
Retrieve Account SID, Auth Token, and Phone Number.
Add to backend/.env.

✉️ Email Setup

Use Gmail or another SMTP provider.
Generate an App Password for Gmail (enable 2FA).
Add SMTP details to backend/.env.

▶️ Running the System
Development Mode

Backend:cd backend
npm run dev


Frontend:cd ../frontend
npm run dev


Admin Panel:cd ../admin
npm run dev




Access: Frontend (http://localhost:5173), Admin (http://localhost:5174), API (http://localhost:3000/api).

Production Mode

Build and serve each module with appropriate web servers (e.g., Nginx).

🤝 Contributing

Fork the repository.
Create a feature branch:git checkout -b feature/your-feature-name


Commit changes:git commit -m "Add your descriptive message"


Push and submit a pull request.

🔐 Security

Use a strong 64-character JWT_SECRET.
Add .env to .gitignore.
Implement HTTPS in production.

📜 License
MIT License. See LICENSE for details.
📞 Support
Contact your.email@example.com or open a GitHub issue.
