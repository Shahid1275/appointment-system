Doctor's Appointment Booking System
A robust and scalable application for booking doctor's appointments, built with the MERN stack (MongoDB, Express.js, React, Node.js), Redux Toolkit for state management, Cloudinary for image storage, and Stripe.js for secure payment processing. This project includes separate frontend, backend, and admin panel components, providing a seamless experience for patients, doctors, and administrators.
Features

Appointment Booking: Patients can browse available doctors, view schedules, and book appointments easily.
User Authentication: Secure login and signup for patients, doctors, and admins using JSON Web Tokens (JWT).
Admin Dashboard: Manage doctors, appointments, and system settings with a dedicated admin panel.
Doctor Profiles: Upload and manage doctor profiles with images stored on Cloudinary.
Payment Integration: Secure payment processing for appointments using Stripe.js.
Appointment Management: Patients can view, reschedule, or cancel appointments; doctors can manage their schedules.
Redux Toolkit: Efficient state management for a smooth and predictable user experience.
Notifications: Email or in-app notifications for appointment confirmations and reminders.
Fully Responsive UI: Modern, user-friendly design optimized for desktop and mobile devices.
Search and Filter: Easily find doctors by specialty, location, or availability.
Appointment History: Track past and upcoming appointments for both patients and doctors.

Requirements

Node.js: v20.x or later
MongoDB: v6.x or later
npm: Latest stable version
Cloudinary Account: For image storage
Stripe Account: For payment processing

Environment Variables
Create .env files in the respective directories (backend, frontend, admin) with the following variables:
Backend (.env, .env.development, .env.production)
# Backend
MONGO_URI=mongodb://localhost:27017/doctor_appointment
JWT_SECRET=your_jwt_secret
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

# Note: Update scripts in package.json based on your OS to set the NODE environment.

Frontend (.env)
VITE_BASE_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

Admin (.env)
VITE_BASE_URL=http://localhost:5174
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

Starting the Application
Backend

Navigate to the backend directory:
cd backend


Install dependencies:
npm install


Start the backend server:
npm run start:dev

The backend server will run on http://localhost:3000 by default.


Frontend

Navigate to the frontend directory:
cd frontend


Install dependencies:
npm install


Start the frontend development server:
npm run dev

The frontend application will run on http://localhost:5173 by default.


Admin Panel

Navigate to the admin directory:
cd admin


Install dependencies:
npm install


Start the admin panel development server:
npm run dev

The admin panel will run on http://localhost:5174 by default.


Database Setup
Ensure MongoDB is installed and running. Create a database for the appointment booking system.

Connect to MongoDB:
Start your MongoDB server and ensure it’s running on the default port (27017) or update the MONGO_URI in the .env file accordingly.

Seed the Database (Optional):
If you have a seed script (e.g., seed.js), run it to populate initial data:
node backend/seed.js

Note: Passwords are stored in hashed form for security. Ensure your application uses a secure hashing library like bcrypt.


Cloudinary Setup

Create a Cloudinary account and obtain your CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.
Update the backend .env file with these credentials.
Use Cloudinary’s SDK in the backend to handle doctor profile image uploads.

Stripe Setup

Create a Stripe account and obtain your STRIPE_SECRET_KEY and STRIPE_PUBLIC_KEY.
Update the backend .env file with the STRIPE_SECRET_KEY and the frontend/admin .env files with the STRIPE_PUBLIC_KEY.
Ensure Stripe.js is integrated in the frontend for payment processing.

Project Structure

backend/: Contains the Express.js server, API routes, and MongoDB models.
frontend/: React application for patients to book appointments and manage their profiles.
admin/: React application for administrators to manage doctors, appointments, and system settings.

Contributing
Contributions are welcome! To contribute, please follow these steps:

Fork the repository.

Create a new branch for your feature or bugfix:
git checkout -b feature/your-feature-name


Make your changes and ensure tests pass.

Submit a pull request with a detailed description of your changes.


License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For any inquiries or support, please contact the project maintainers at your-email@example.com.
