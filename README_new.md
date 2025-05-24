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
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

# Note: Adjust scripts in package.json based on your operating system to set the NODE environment.
