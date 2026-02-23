# 🚗 ParkWise – Smart City Parking Intelligence Platform

ParkWise is a full-stack MERN application designed to solve urban parking challenges by enabling users to discover nearby parking, reserve slots in real time, and confirm bookings with a simulated payment flow. The system is built with scalability, automation, and clean architecture in mind.

---

## ✨ Key Features

- 🔐 JWT-based Authentication & Role-Based Access Control (User / Parking Admin)
- 🅿️ Parking Area & Slot Management (Admin)
- 📍 Location-based Nearby Parking Search (MongoDB 2dsphere)
- 📆 Real-time Slot Booking System
- 💳 Dummy UPI Payment Confirmation Flow
- ⏱️ Automatic Slot Release using Cron Jobs
- 🧪 API Testing via Thunder Client (VS Code)

---

## 🛠️ Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- node-cron

**Tools**
- Thunder Client (API testing)
- Git & GitHub

---

## 🧩 System Architecture (High Level)

User → API Gateway (Express) → Controllers → Services → MongoDB  
Background Jobs → Cron Scheduler → Booking & Slot Updates

---

## 🔄 Booking & Payment Flow

1. User logs in
2. User selects nearby parking slot
3. Booking created with `PENDING` status
4. Dummy UPI payment confirmation
5. Booking marked `CONFIRMED`
6. Slot marked `OCCUPIED`
7. If unpaid → auto-released via cron job

---

## 🚀 API Endpoints (Sample)

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Parking
- `POST /api/parking/area` (Admin)
- `POST /api/parking/slots` (Admin)
- `GET /api/parking/areas`
- `GET /api/parking/nearby`

### Booking
- `POST /api/bookings`

### Payment
- `POST /api/payments/confirm`

---

## 🧪 Running the Project Locally

```bash
cd backend
npm install
node server.js