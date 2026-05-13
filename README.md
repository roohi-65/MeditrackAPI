# 🏥 MediTrack Personal Health & Appointment Manager

> A RESTful API backend system built with **Node.js**, **Express.js**, and **MongoDB** that helps users manage their daily medicines and doctor appointments solving a real-world healthcare problem with clean, structured code.

---

## 📌 Table of Contents

- [Problem Description](#-problem-description)
- [Proposed Solution](#-proposed-solution)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Database Models](#-database-models)
- [API Endpoints](#-api-endpoints)
- [Setup Instructions](#-setup-instructions)
- [How to Run the Project](#-how-to-run-the-project)
- [API Testing with Postman](#-api-testing-with-postman)
- [Frontend (Bonus)](#-frontend-bonus---reactjs)

---

## 🚨 Problem Description

Many people struggle to manage their health effectively due to:

- **Forgetting medications** : missing doses leads to poor health outcomes
- **Missing doctor appointments** : no simple reminder or tracking system
- **Unreliable paper-based tracking** : notes get lost or forgotten
- **No affordable digital tools** : existing apps are too complex or expensive for everyday users

This is especially a problem for elderly patients, students, and busy working adults who need a simple, lightweight solution.

---

## 💡 Proposed Solution

**MediTrack** is a lightweight REST API backend system that allows users to:

- Digitally track all their medicines with dosage, frequency, and schedule
- Book, manage, and monitor doctor appointments
- Filter appointments by status : **Upcoming**, **Completed**, **Cancelled**
- Filter medicines by date status : **Active**, **Expired**, **Latest Added**
- Receive clear success and error messages on every action
- Access their health data through clean, well-documented API endpoints

The system is built following REST principles with proper validation and error handling, and is paired with a React.js frontend for an accessible user experience.

---

## ✅ Features

### 💊 Medicine Features
- Add, view, update and delete medicines with full schedule details
- Filter medicines by **Active** (endDate in future)
- Filter medicines by **Expired** (endDate in past)
- View **Latest 5** medicines added (newest first)
- Auto status badge : Active ✅ or Expired ⚠️ on each record

### 📅 Appointment Features
- Book, view, update and cancel doctor appointments
- Filter appointments by **Upcoming** status
- Filter appointments by **Completed** status
- Filter appointments by **Cancelled** status
- View **Latest 5** appointments added
- Color-coded status badges : 🟡 Upcoming · 🟢 Completed · 🔴 Cancelled

### 🔧 General Features
- ✅ Success messages on every Create, Update, Delete action
- ❌ Meaningful error messages with proper HTTP status codes
- 🔢 Record count shown on all filtered views
- 🛡️ Input validation on all required fields
- 🌐 CORS enabled for frontend integration
- ⚛️ React.js frontend with live filter buttons (Vibe Coding)
- 💬 Confirm dialog before every delete action

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| Node.js | JavaScript runtime environment |
| Express.js | Web framework for building REST APIs |
| MongoDB Atlas | Cloud NoSQL database |
| Mongoose | ODM for schema definition and DB interaction |
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
│   │   ├── medicine.model.js         # Medicine schema
│   │   └── appointment.model.js      # Appointment schema
│   ├── controllers/
│   │   ├── medicine.controller.js    # Medicine CRUD + filter logic
│   │   └── appointment.controller.js # Appointment CRUD + filter logic
│   ├── routes/
│   │   ├── medicine.routes.js        # Medicine API routes
│   │   └── appointment.routes.js     # Appointment API routes
│   ├── .env                          # Environment variables (not committed)
│   ├── server.js                     # Entry point
│   └── package.json
├── frontend/                         # React.js frontend (Bonus)
│   ├── src/
│   │   ├── components/
│   │   │   ├── MedicineList.jsx      # Medicine UI with filters + toast
│   │   │   └── AppointmentList.jsx   # Appointment UI with filters + toast
│   │   ├── App.js                    # Tab navigation
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## 🗄️ Database Models

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
| specialty | String | ✅ | Doctor's specialty (e.g., Cardiologist) |
| date | Date | ✅ | Date of the appointment |
| time | String | ✅ | Time of the appointment |
| location | String | ❌ | Clinic or hospital name |
| status | Enum | auto | `upcoming` / `completed` / `cancelled` (default: upcoming) |
| notes | String | ❌ | Additional notes |
| createdAt | Date | auto | Timestamp (auto-generated) |

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

### 💊 Medicine Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|-------------|
| `POST` | `/medicines` | Add a new medicine | 201, 400 |
| `GET` | `/medicines` | Get all medicines (newest first) | 200, 500 |
| `GET` | `/medicines/latest` | Get latest 5 medicines added | 200, 500 |
| `GET` | `/medicines/active` | Get active medicines (endDate in future) | 200, 500 |
| `GET` | `/medicines/expired` | Get expired medicines (endDate in past) | 200, 500 |
| `GET` | `/medicines/:id` | Get one medicine by ID | 200, 404, 500 |
| `PUT` | `/medicines/:id` | Update a medicine | 200, 400, 404 |
| `DELETE` | `/medicines/:id` | Delete a medicine | 200, 404, 500 |

#### Example : POST `/api/medicines`

**Request Body:**
```json
{
  "name": "Paracetamol",
  "dosage": "500mg",
  "frequency": "Twice a day",
  "startDate": "2025-05-01",
  "endDate": "2025-05-10",
  "notes": "Take after meals"
}
```

**Response (201):**
```json
{
  "message": "✅ Medicine added successfully!",
  "data": {
    "_id": "664abc123def456789",
    "name": "Paracetamol",
    "dosage": "500mg",
    "frequency": "Twice a day",
    "startDate": "2025-05-01T00:00:00.000Z",
    "endDate": "2025-05-10T00:00:00.000Z",
    "notes": "Take after meals",
    "createdAt": "2025-05-01T08:30:00.000Z"
  }
}
```

#### Example : GET `/api/medicines/active`

**Response (200):**
```json
{
  "message": "💊 3 active medicine(s) found",
  "count": 3,
  "data": [ ... ]
}
```

---

### 📅 Appointment Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|-------------|
| `POST` | `/appointments` | Book a new appointment | 201, 400 |
| `GET` | `/appointments` | Get all appointments (newest first) | 200, 500 |
| `GET` | `/appointments/latest` | Get latest 5 appointments | 200, 500 |
| `GET` | `/appointments/status/upcoming` | Get upcoming appointments | 200, 500 |
| `GET` | `/appointments/status/completed` | Get completed appointments | 200, 500 |
| `GET` | `/appointments/status/cancelled` | Get cancelled appointments | 200, 500 |
| `GET` | `/appointments/:id` | Get one appointment by ID | 200, 404, 500 |
| `PUT` | `/appointments/:id` | Update an appointment | 200, 400, 404 |
| `DELETE` | `/appointments/:id` | Cancel an appointment | 200, 404, 500 |

#### Example : POST `/api/appointments`

**Request Body:**
```json
{
  "doctorName": "Dr. Perera",
  "specialty": "Cardiologist",
  "date": "2025-05-15",
  "time": "10:30 AM",
  "location": "Colombo National Hospital",
  "status": "upcoming",
  "notes": "Bring previous ECG report"
}
```

**Response (201):**
```json
{
  "message": "✅ Appointment booked successfully!",
  "data": {
    "_id": "664xyz789abc012345",
    "doctorName": "Dr. Perera",
    "specialty": "Cardiologist",
    "date": "2025-05-15T00:00:00.000Z",
    "time": "10:30 AM",
    "location": "Colombo National Hospital",
    "status": "upcoming",
    "notes": "Bring previous ECG report",
    "createdAt": "2025-05-01T09:00:00.000Z"
  }
}
```

#### Example : GET `/api/appointments/status/upcoming`

**Response (200):**
```json
{
  "message": "📅 2 upcoming appointment(s) found",
  "count": 2,
  "data": [ ... ]
}
```

---

## ⚙️ Setup Instructions

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier is fine)
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

Create a `.env` file inside the `backend/` folder:

```env
MONGO_URL=mongodb://localhost:27017/meditrack
PORT=5000
```

> ⚠️ Replace `<your-username>` and `<your-password>` with your MongoDB Atlas credentials. Never commit this file to GitHub it is listed in `.gitignore`.

### 4. Install Frontend Dependencies (Optional — Bonus)

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

Server starts at: **`http://localhost:5000`**

Expected output:
```
MongoDB Connected ✅
Server running on port 5000
```

### Run Frontend (Optional — Bonus)

Open a **second terminal** and run:

```bash
cd frontend
npm start
```

React app opens at: **`http://localhost:3000`**

> ⚠️ Make sure the backend is already running before starting the frontend!

---

## 🧪 API Testing with Postman

All endpoints have been tested using Postman.

### How to Test

1. Open **Postman**
2. Set the request method (GET / POST / PUT / DELETE)
3. Enter the URL
4. For POST and PUT: go to **Body → raw → JSON** and paste the request body
5. Click **Send**

### All Endpoints to Test

```
# ── Medicines ──────────────────────────────────────
POST   http://localhost:5000/api/medicines
GET    http://localhost:5000/api/medicines
GET    http://localhost:5000/api/medicines/latest
GET    http://localhost:5000/api/medicines/active
GET    http://localhost:5000/api/medicines/expired
GET    http://localhost:5000/api/medicines/:id
PUT    http://localhost:5000/api/medicines/:id
DELETE http://localhost:5000/api/medicines/:id

# ── Appointments ───────────────────────────────────
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

### Postman Collection

The exported Postman collection is included in this repository:
📁 `postman/MediTrack.postman_collection.json`

Import it into Postman: **File → Import → Upload the JSON file**

---

## ⚛️ Frontend (Bonus) — React.js

The optional frontend was built using **React.js** with **Cursor IDE** (Vibe Coding — AI-assisted development).

### Medicine Tab Filters
| Button | What it shows |
|--------|--------------|
| 📋 All | All medicines, newest first |
| 🆕 Newest | Latest 5 medicines added |
| ✅ Active | Medicines with future end date |
| ⚠️ Expired | Medicines with past end date |

### Appointment Tab Filters
| Button | What it shows |
|--------|--------------|
| 📋 All | All appointments, newest first |
| 🆕 Latest 5 | Most recently booked |
| ⏰ Upcoming | Status = upcoming |
| ✅ Completed | Status = completed |
| ❌ Cancelled | Status = cancelled |

### UI Features
- Toast notification (green ✅ / red ❌) on every add, delete, or error
- Color-coded status badges on every appointment row
- Active / Expired badge on every medicine row
- Record count display next to filter bar
- Confirm dialog before every delete

### Vibe Coding
The frontend was generated and refined using AI prompting in **Cursor IDE**, satisfying the Vibe Coding bonus requirement of the assignment.

---

## 📝 Git Commit History

```
✅ Update README - all features, filters and new endpoints documented
✅ Add filters - upcoming/completed/cancelled appointments, active/expired/latest medicines
✅ Add React frontend - medicine and appointment UI with filters and toast (Vibe Coding)
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
- ICA: 03 — Final Project
- GitHub: [github.com/roohi-65/MeditrackAPI](https://github.com/roohi-65/MeditrackAPI)

---

## 📄 License

This project is submitted as academic coursework for **IT2234 — Web Services & Server Technologies**.

