# 🏥 MediTrack Personal Health & Appointment Manager

> A secure RESTful API backend system built with **Node.js**, **Express.js**, and **MongoDB** featuring **JWT Authentication**, smart filtering, and a React.js frontend solving a real-world healthcare management problem with clean, structured code.

---

## 📌 Table of Contents

- [Problem Description](#-problem-description)
- [Proposed Solution](#-proposed-solution)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Database Models](#-database-models)
- [API Endpoints](#-api-endpoints)
- [Authentication Flow](#-authentication-flow)
- [Setup Instructions](#-setup-instructions)
- [How to Run the Project](#-how-to-run-the-project)
- [API Testing with Postman](#-api-testing-with-postman)
- [Frontend (Bonus)](#-frontend-bonus-reactjs)

---

## 🚨 Problem Description

Many people struggle to manage their health effectively due to:

- **Forgetting medications** missing doses leads to poor health outcomes
- **Missing doctor appointments** no simple reminder or tracking system
- **Unreliable paper-based tracking** notes get lost or forgotten
- **No secure digital tools** sensitive health data needs proper authentication
- **No affordable tools** existing apps are too complex or expensive for everyday users

---

## 💡 Proposed Solution

**MediTrack** is a secure REST API backend system that allows users to:

- Register and login securely with **JWT Authentication**
- Digitally track all medicines with dosage, frequency, and schedule
- Book, manage, and monitor doctor appointments
- Filter appointments by status **Upcoming**, **Completed**, **Cancelled**
- Filter medicines by date status **Active**, **Expired**, **Latest Added**
- Receive clear success and error messages on every action
- Access all data through a clean React.js frontend

---

## ✅ Features

### 🔐 Authentication Features
- User registration with **bcrypt** password hashing (salt rounds: 10)
- JWT token generation on login (expires in 7 days)
- All medicine and appointment routes **protected** by auth middleware
- Token verification on every request via Authorization header
- Get logged-in user profile via protected route

### 💊 Medicine Features
- Add, view, update and delete medicines with full schedule details
- Filter by **Active** medicines (endDate in future)
- Filter by **Expired** medicines (endDate in past)
- View **Latest 5** medicines added (newest first)
- Auto status badge Active ✅ or Expired ⚠️

### 📅 Appointment Features
- Book, view, update and cancel doctor appointments
- Filter by **Upcoming**, **Completed**, **Cancelled** status
- View **Latest 5** appointments added
- Color-coded status badges

### 🔧 General Features
- ✅ Success messages on every Create, Update, Delete
- ❌ Meaningful error messages with HTTP status codes
- 🔢 Record count on all filter views
- 🛡️ Input validation on all required fields
- 🌐 CORS enabled for frontend integration
- ⚛️ React.js frontend with login page and live filters (Vibe Coding)
- 💬 Toast notifications for all user actions
- 🗑️ Confirm dialog before every delete

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| Node.js | JavaScript runtime environment |
| Express.js | Web framework for building REST APIs |
| MongoDB Atlas | Cloud NoSQL database |
| Mongoose | ODM for schema definition and DB interaction |
| JWT (jsonwebtoken) | Secure token-based authentication |
| bcryptjs | Password hashing and verification |
| dotenv | Environment variable management |
| cors | Cross-Origin Resource Sharing support |
| nodemon | Auto-restart during development |
| Postman | API testing and documentation |
| React.js | Frontend UI (Bonus) |
| Axios | HTTP client for frontend API calls |
| GitHub | Version control and code hosting |

---

## 📁 Project Structure

```
meditrack/
├── backend/
│   ├── models/
│   │   ├── user.model.js             # User schema (name, email, password)
│   │   ├── medicine.model.js         # Medicine schema
│   │   └── appointment.model.js      # Appointment schema
│   ├── controllers/
│   │   ├── auth.controller.js        # Register, Login, Get Profile
│   │   ├── medicine.controller.js    # Medicine CRUD + filter logic
│   │   └── appointment.controller.js # Appointment CRUD + filter logic
│   ├── routes/
│   │   ├── auth.routes.js            # /register, /login, /profile
│   │   ├── medicine.routes.js        # Medicine API routes (protected)
│   │   └── appointment.routes.js     # Appointment API routes (protected)
│   ├── middleware/
│   │   └── auth.middleware.js        # JWT token verification middleware
│   ├── .env                          # Environment variables (not committed)
│   ├── server.js                     # Entry point
│   └── package.json
├── frontend/                         # React.js frontend (Bonus)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx             # Login & Register page
│   │   │   ├── MedicineList.jsx      # Medicine UI with filters + toast
│   │   │   └── AppointmentList.jsx   # Appointment UI with filters + toast
│   │   ├── App.js                    # Auth state + tab navigation
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## 🗄️ Database Models

### User Collection

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | ✅ | Full name of the user |
| email | String | ✅ | Unique email address |
| password | String | ✅ | Hashed password (bcrypt) |
| createdAt | Date | auto | Timestamp (auto-generated) |

### Medicine Collection

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | ✅ | Name of the medicine |
| dosage | String | ✅ | Dosage amount (e.g., 500mg) |
| frequency | String | ✅ | How often to take (e.g., Twice a day) |
| startDate | Date | ✅ | When to start the medicine |
| endDate | Date | ❌ | When the course ends (used for Active/Expired filter) |
| notes | String | ❌ | Additional instructions |
| createdAt | Date | auto | Timestamp (auto-generated) |

### Appointment Collection

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| doctorName | String | ✅ | Name of the doctor |
| specialty | String | ✅ | Doctor's specialty |
| date | Date | ✅ | Date of the appointment |
| time | String | ✅ | Time of the appointment |
| location | String | ❌ | Clinic or hospital name |
| status | Enum | auto | `upcoming` / `completed` / `cancelled` |
| notes | String | ❌ | Additional notes |
| createdAt | Date | auto | Timestamp (auto-generated) |

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

### 🔐 Auth Endpoints (Public)

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|-------------|
| `POST` | `/auth/register` | Register a new user | 201, 400 |
| `POST` | `/auth/login` | Login and get JWT token | 200, 401 |
| `GET` | `/auth/profile` | Get logged-in user profile 🔒 | 200, 401 |

#### Example — POST `/api/auth/register`
```json
{
  "name": "Mowfika Roohi",
  "email": "mowfika@gmail.com",
  "password": "123456"
}
```
**Response (201):**
```json
{
  "message": "✅ Registration successful! Please login.",
  "user": { "id": "...", "name": "Mowfika Roohi", "email": "mowfika@gmail.com" }
}
```

#### Example — POST `/api/auth/login`
```json
{
  "email": "mowfika@gmail.com",
  "password": "123456"
}
```
**Response (200):**
```json
{
  "message": "✅ Welcome back, Mowfika Roohi!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "name": "Mowfika Roohi", "email": "mowfika@gmail.com" }
}
```

---

### 💊 Medicine Endpoints 🔒 (Require Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/medicines` | Add a new medicine |
| `GET` | `/medicines` | Get all medicines (newest first) |
| `GET` | `/medicines/latest` | Get latest 5 medicines |
| `GET` | `/medicines/active` | Get active medicines (endDate in future) |
| `GET` | `/medicines/expired` | Get expired medicines (endDate in past) |
| `GET` | `/medicines/:id` | Get one medicine by ID |
| `PUT` | `/medicines/:id` | Update a medicine |
| `DELETE` | `/medicines/:id` | Delete a medicine |

---

### 📅 Appointment Endpoints 🔒 (Require Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/appointments` | Book a new appointment |
| `GET` | `/appointments` | Get all appointments (newest first) |
| `GET` | `/appointments/latest` | Get latest 5 appointments |
| `GET` | `/appointments/status/upcoming` | Get upcoming appointments |
| `GET` | `/appointments/status/completed` | Get completed appointments |
| `GET` | `/appointments/status/cancelled` | Get cancelled appointments |
| `GET` | `/appointments/:id` | Get one appointment by ID |
| `PUT` | `/appointments/:id` | Update an appointment |
| `DELETE` | `/appointments/:id` | Cancel an appointment |

> 🔒 All medicine and appointment endpoints require the JWT token in the request header:
> ```
> Authorization: Bearer YOUR_TOKEN_HERE
> ```

---

## 🔐 Authentication Flow

```
1. User registers  →  password hashed with bcrypt (10 salt rounds)
                   →  stored in MongoDB (password never stored as plain text)

2. User logs in    →  bcrypt compares entered password with stored hash
                   →  if matched → JWT token generated (signed with JWT_SECRET)
                   →  token sent back to client (expires in 7 days)

3. Protected route →  client sends token in Authorization header
                   →  auth middleware verifies token with JWT_SECRET
                   →  if valid → request allowed → controller runs
                   →  if invalid/missing → 401 Unauthorized returned
```

---

## ⚙️ Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Postman](https://www.postman.com/) for API testing

### 1. Clone the Repository
```bash
git clone https://github.com/roohi-65/MeditrackAPI.git
cd MeditrackAPI
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file inside `backend/`:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/meditrack
PORT=5000
JWT_SECRET=meditrack_super_secret_key_2025
```

### 4. Install Frontend Dependencies (Optional)
```bash
cd ../frontend
npm install
```

---

## ▶️ How to Run the Project

### Run Backend
```bash
cd backend
npm start
```
Expected output:
```
MongoDB Connected ✅
Server running on port 5000
```

### Run Frontend (Optional)
Open a second terminal:
```bash
cd frontend
npm start
```
Opens at: **`http://localhost:3000`**

---

## 🧪 API Testing with Postman

### Step 1 — Register
```
POST http://localhost:5000/api/auth/register
Body (raw JSON):
{
  "name": "Mowfika Roohi",
  "email": "mowfika@gmail.com",
  "password": "123456"
}
```

### Step 2 — Login & Copy Token
```
POST http://localhost:5000/api/auth/login
Body (raw JSON):
{
  "email": "mowfika@gmail.com",
  "password": "123456"
}
```
Copy the `token` value from the response.

### Step 3 — Add Token to All Other Requests
In Postman → **Headers** tab → add:
```
Key:   Authorization
Value: Bearer YOUR_COPIED_TOKEN
```

### Step 4 — Test All Endpoints
```
# Auth
POST   http://localhost:5000/api/auth/register
POST   http://localhost:5000/api/auth/login
GET    http://localhost:5000/api/auth/profile

# Medicines (need token)
POST   http://localhost:5000/api/medicines
GET    http://localhost:5000/api/medicines
GET    http://localhost:5000/api/medicines/latest
GET    http://localhost:5000/api/medicines/active
GET    http://localhost:5000/api/medicines/expired
GET    http://localhost:5000/api/medicines/:id
PUT    http://localhost:5000/api/medicines/:id
DELETE http://localhost:5000/api/medicines/:id

# Appointments (need token)
POST   http://localhost:5000/api/appointments
GET    http://localhost:5000/api/appointments
GET    http://localhost:5000/api/appointments/latest
GET    http://localhost:5000/api/appointments/status/upcoming
GET    http://localhost:5000/api/appointments/status/completed
GET    http://localhost:5000/api/appointments/status/cancelled
GET    http://localhost:5000/api/appointments/:id
PUT    http://localhost:5000/api/appointments/:id
DELETE http://localhost:5000/api/appointments/:id
```

---

## ⚛️ Frontend React.js

Built with **React.js** using **Cursor IDE** (Vibe Coding AI assisted development).

### Pages & Features

**Login / Register Page:**
- Toggle between Login and Register forms
- JWT token stored in localStorage after login
- Auto-login if token exists from previous session
- Error messages displayed inline

**Medicine Tab:**
- 📋 All · 🆕 Newest · ✅ Active · ⚠️ Expired filter buttons
- Add form with validation
- Auto Active/Expired status badge on each row
- Toast notifications on add/delete

**Appointment Tab:**
- 📋 All · 🆕 Latest 5 · ⏰ Upcoming · ✅ Completed · ❌ Cancelled
- Color-coded status badges
- Toast notifications on add/delete

**Header:**
- Shows logged-in user's name
- Logout button clears token and redirects to login

---

## 📝 Git Commit History

```
✅ Update README - JWT auth, all features documented
✅ Add JWT authentication - register, login, protected routes with bcrypt
✅ Add filters - upcoming/completed/cancelled appointments, active/expired medicines
✅ Add React frontend - UI with login, filters and toast (Vibe Coding)
✅ Backend complete - all endpoints tested with Postman
✅ Add Appointment routes - full CRUD + status filters
✅ Add Medicine routes - full CRUD + active/expired/latest filters
✅ Add Appointment controller - CRUD + filter operations
✅ Add Medicine controller - CRUD + filter operations
✅ Add Appointment model - doctor, date, time, status schema
✅ Add Medicine model - name, dosage, frequency, schedule schema
✅ Add server.js - Express server with MongoDB connection
✅ Initial project setup - folder structure and dependencies
```

---

## 👤 Author

NN.Mowfika Roohi
- Registration No: 2022/ICT/103
- Module: IT2234 Web Services & Server Technologies
- Level: 2nd Year IT
- ICA: 03  Final Project
- GitHub: [github.com/roohi-65/MeditrackAPI](https://github.com/roohi-65/MeditrackAPI)

---

## 📄 License

This project is submitted as academic coursework for **IT2234 Web Services & Server Technologies**.
