🏥 Doctor Appointment Booking System
   
A robust, scalable healthcare management solution built with the MERN stack, featuring patient, doctor, and admin interfaces for seamless appointment booking, profile management, and system administration.
🌟 Key Features
Patient Portal

🔐 Secure Authentication: JWT-based login and registration with password hashing (Bcrypt).
🔍 Advanced Doctor Search: Filter doctors by specialty, location, availability, and ratings.
🗓️ Real-Time Appointment Scheduling: Book, reschedule, or cancel appointments with real-time slot availability.
💳 Secure Payments: Integrated Stripe for processing payments securely.
📱 Mobile-Responsive Design: Optimized for desktops, tablets, and smartphones using Tailwind CSS.
✉️ Notifications: Email (Nodemailer) and SMS (Twilio) for appointment confirmations and reminders.

Doctor Dashboard

👨‍⚕️ Profile Management: Upload and manage profile images and credentials via Cloudinary.
📅 Interactive Calendar: Set and manage availability with a user-friendly calendar interface.
💼 Patient Management: View patient details, appointment history, and medical notes.
📊 Performance Analytics: Track appointment metrics and patient feedback.
🔔 Instant Notifications: Real-time alerts for new bookings and cancellations.

Admin Console

👥 User Management: Manage patients, doctors, and admins with role-based access control.
📈 Analytics Dashboard: Visualize system usage, appointment trends, and revenue.
⚙️ System Configuration: Customize settings like appointment durations and pricing.
🔐 Role-Based Access Control: Restrict access to sensitive features.
📝 Content Management: Update system-wide content like FAQs and policies.

🛠 Technology Stack



Component
Technology



Frontend
React.js, Redux Toolkit, Tailwind CSS, Axios


Backend
Node.js, Express.js, MongoDB, Mongoose


Authentication
JWT, Bcrypt


Payments
Stripe API


Media Storage
Cloudinary


Notifications
Nodemailer (Email), Twilio (SMS)


Deployment
Docker (optional), PM2 (production)


🚀 Quick Start Guide
Prerequisites

Node.js: v20.x or higher
MongoDB: v6.x or higher
Accounts:
Cloudinary for media storage
Stripe for payments
Twilio for SMS notifications
Gmail or similar for email notifications



Installation

Clone the Repository:
git clone https://github.com/yourusername/doctor-appointment-system.git
cd doctor-appointment-system


Install Dependencies:
# Backend
cd backend
npm install

# Frontend (Patient Portal)
cd ../frontend
npm install

# Admin Panel
cd ../admin
npm install



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
│   ├── config/         # Database and third-party service configs
│   ├── controllers/    # Request handling and business logic
│   ├── middleware/     # Authentication and error handling
│   ├── models/         # MongoDB schemas (User, Appointment, Doctor)
│   ├── routes/         # API endpoints (auth, appointments, users)
│   ├── services/       # Integrations (Stripe, Cloudinary, Twilio)
│   └── utils/          # Helper functions (error handling, validation)
├── frontend/
│   ├── public/         # Static assets (favicon, images)
│   └── src/
│       ├── assets/     # Images, fonts, and static resources
│       ├── components/ # Reusable UI components (Navbar, Footer)
│       ├── features/   # Feature modules (auth, booking)
│       ├── hooks/      # Custom React hooks
│       ├── pages/      # Route components (Home, Profile, Booking)
│       ├── redux/      # Redux slices and store configuration
│       ├── services/   # API clients (Axios)
│       └── styles/     # Tailwind CSS and global styles
├── admin/              # Admin panel (similar structure to frontend)
└── README.md           # Project documentation

🗃️ Database Setup

Install MongoDB:

Follow instructions for your OS: MongoDB Installation
For Ubuntu:sudo apt update
sudo apt install mongodb




Start MongoDB:
sudo systemctl start mongod


Verify MongoDB:
sudo systemctl status mongod


Create Database:

MongoDB will automatically create the doctor_appointment database when connected via MONGO_URI.



☁️ Cloudinary Setup

Sign up at Cloudinary.
Navigate to the dashboard and copy:
Cloud Name
API Key
API Secret


Add these to backend/.env.

💳 Stripe Setup

Create a Stripe account.
From the developer dashboard, copy:
Secret Key (for backend/.env)
Public Key (for frontend/.env)


Enable test mode for development.

📬 Twilio Setup (Optional)

Sign up at Twilio.
Get Account SID, Auth Token, and a Twilio phone number.
Add to backend/.env.

✉️ Email Setup

Use a Gmail account or another SMTP provider.
For Gmail, generate an App Password:
Enable 2FA on your Google Account.
Go to Google App Passwords and create a password for "Mail".


Add SMTP details to backend/.env.

Running the System
Development Mode

Backend:
cd backend
npm run dev


Frontend (Patient Portal):
cd ../frontend
npm run dev


Admin Panel:
cd ../admin
npm run dev




Access:
Frontend: http://localhost:5173
Admin Panel: http://localhost:5174
Backend API: http://localhost:3000/api



Production Mode

Backend:
cd backend
npm install
npm start


Frontend:
cd ../frontend
npm install
npm run build
# Serve with a web server (e.g., Nginx)


Admin Panel:
cd ../admin
npm install
npm run build
# Serve with a web server (e.g., Nginx)


Optional: Use PM2 for Backend:
npm install -g pm2
cd backend
pm2 start npm --name "doctor-backend" -- start


Optional: Docker Setup:
# Dockerfile (backend)
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

Build and run:
docker build -t doctor-backend .
docker run -p 3000:3000 --env-file backend/.env doctor-backend



🤝 Contributing Guidelines

Fork the repository.
Create a feature branch:git checkout -b feature/your-feature-name


Commit changes:git commit -m "Add your descriptive message"


Push to the branch:git push origin feature/your-feature-name


Open a pull request with a detailed description of changes.

🔐 Security Best Practices

JWT Secret: Use a 64-character random string for JWT_SECRET.
Environment Variables: Never commit .env files to Git. Add .env to .gitignore.
HTTPS: Use HTTPS in production to secure API requests.
Input Validation: Use libraries like express-validator to sanitize inputs.
Rate Limiting: Implement rate limiting on API endpoints to prevent abuse.

🛠 Troubleshooting

MongoDB Connection Issues:
Ensure MongoDB is running (sudo systemctl status mongod).
Verify MONGO_URI in backend/.env.


Stripe Errors:
Check if API keys are correct and in test mode.


Cloudinary Upload Fails:
Confirm Cloudinary credentials in backend/.env.


CORS Issues:
Ensure VITE_API_URL matches the backend URL.



📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
📞 Contact
For support, contact the repository maintainer at your.email@example.com or open an issue on GitHub.
