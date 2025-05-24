🏥 Doctor Appointment Booking System
   
A comprehensive healthcare management solution with patient, doctor, and administrative interfaces, built using modern web technologies for seamless appointment scheduling and system management.
Table of Contents

Key Features
Technology Stack
Requirements
Environment Variables
Starting the Application
Database Setup
Third-Party Service Setup
Contributing
License
Support

Key Features
Patient Portal

🔐 Secure authentication with JWT and Bcrypt.
🔍 Advanced doctor search with filters (specialty, location, availability).
🗓️ Real-time appointment scheduling and management.
💳 Secure payment processing via Stripe.
📱 Mobile-responsive design using Tailwind CSS.
✉️ Email and SMS notifications with Nodemailer and Twilio.

Doctor Dashboard

👨‍⚕️ Profile management with Cloudinary integration.
📅 Interactive availability calendar.
💼 Patient management system.
📊 Performance analytics and insights.
🔔 Instant appointment notifications.

Admin Console

👥 Comprehensive user management with role-based access.
📈 Advanced analytics dashboard.
⚙️ System configuration settings.
🔐 Role-based access control.
📝 Content management for system-wide updates.

Technology Stack



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


Requirements

Node.js (v20.x or later)
MongoDB (v6.x or later)
npm
Accounts: Cloudinary, Stripe, Twilio (optional), Gmail (or SMTP provider)

Environment Variables
Create .env files in the respective directories with the following variables:
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

Starting the Application
Backend
Navigate to the backend directory and start the server:
cd backend
npm install
npm run dev

The backend server will run on http://localhost:3000 by default.
Frontend
Navigate to the frontend directory and start the development server:
cd frontend
npm install
npm run dev

The frontend will run on http://localhost:5173 by default.
Admin Panel
Navigate to the admin directory and start the development server:
cd admin
npm install
npm run dev

The admin panel will run on http://localhost:5174 by default.
Production
For production deployment:
# Backend
cd backend && npm install && npm start

# Frontend
cd ../frontend && npm install && npm run build

# Admin
cd ../admin && npm install && npm run build

Serve the built files using a web server like Nginx.
Database Setup
Ensure MongoDB is installed and running:

Install MongoDB: Refer to MongoDB Installation Guide.
Start the MongoDB service:sudo systemctl start mongod


Verify the service:sudo systemctl status mongod


The database doctor_appointment will be created automatically upon connection using the MONGO_URI.

Third-Party Service Setup
Cloudinary

Sign up at Cloudinary.
Obtain Cloud Name, API Key, and API Secret from the dashboard.
Add to backend/.env.

Stripe

Create an account at Stripe.
Get API keys from the developer dashboard.
Add Secret Key to backend/.env and Public Key to frontend/.env.

Email Notifications

Use Gmail or another SMTP provider.
For Gmail, generate an App Password (enable 2FA).
Add SMTP details to backend/.env.

Contributing
Contributions are welcome! Follow these steps:

Fork the repository.
Create a feature branch:git checkout -b feature/feature-name


Commit your changes:git commit -m "Add descriptive message"


Push to the branch:git push origin feature/feature-name


Submit a pull request with a detailed description.

License
This project is licensed under the MIT License. See the LICENSE file for details.
Support
For assistance, contact the project maintainer at support@yourdomain.com or open an issue on GitHub.
