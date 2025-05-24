# Doctor's Appointment Booking System

A modern and secure application for scheduling doctor's appointments, built with the **MERN stack** (MongoDB, Express.js, React, Node.js), **Redux Toolkit** for state management, **Cloudinary** for image storage, and **Stripe.js** for payment processing. The project includes separate **frontend**, **backend**, and **admin panel** components, providing an intuitive experience for patients, doctors, and administrators.

## Requirements

- Node.js (v20.x or later)
- MongoDB (v6.x or later)
- npm (Latest stable version)
- Cloudinary Account (For image storage)
- Stripe Account (For payment processing)

## Environment Variables

Create `.env` files in the `backend`, `frontend`, and `admin` directories with the following configurations:

### Backend (.env, .env.development, .env.production)

```env
# Backend Configuration
MONGO_URI=mongodb://localhost:27017/doctor_appointment
JWT_SECRET=your_jwt_secret_key

### Frontend (.env)
VITE_BASE_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

### Admin Panel (.env)
VITE_BASE_URL=http://localhost:5174
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Note: Adjust scripts in package.json based on your operating system to set the NODE environment.

## Starting the Application
## Backend
## 1. Navigate to the backend directory:
cd backend

### 2. Install dependencies
npm install

### 3. start the aplication
npm run start

The backend server will be running on http://localhost:3000 by default.

### Frontend
### 1. Navigate to the frontend directory:
cd frontend

### 2. Install dependencies
npm install

### 3. Start the frontend development server
npm run dev
The frontend application will be running on http://localhost:5173 by default.

Admin Panel
### 1. Navigate to the admin directory:
cd admin

### 2. Install dependencies
npm install

### 3. Start the admin development server
npm run dev
The admin application will be running on http://localhost:5174 by default.

### Database Setup
### Ensure MongoDB is installed and running on your system.

### 1. Start MongoDB:

Verify MongoDB is running on the default port (27017) or update the MONGO_URI in the backend .env file accordingly.

### 2. Database Creation:

The application automatically creates the doctor_appointment database upon first connection. Ensure the MONGO_URI is correctly configured in the backend .env file.

Cloudinary Setup
Create a Cloudinary account and obtain your CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.
Update the backend .env file with these credentials.
Use Cloudinary’s SDK in the backend to handle doctor profile image uploads.

Stripe Setup
Create a Stripe account and obtain your STRIPE_SECRET_KEY and STRIPE_PUBLIC_KEY.
Update the backend .env file with the STRIPE_SECRET_KEY and the frontend/admin .env files with the STRIPE_PUBLIC_KEY.
Ensure Stripe.js is integrated in the frontend for payment processing.
