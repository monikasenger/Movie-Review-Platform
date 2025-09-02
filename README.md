# 🎬 CineScope – Movie Review Platform

CineScope is a full-stack web application where users can browse movies, read and write reviews, add films to their watchlist, and rate movies.  
It provides an **admin dashboard** to manage movies and users.  

Built with **React (frontend)**, **Node.js + Express (backend)**, and **MongoDB (database)**.  

---

## 🚀 Deployment

- **Frontend (Render):** [fontend](https://movie-review-platform-laud.onrender.com)  
- **Backend (Render):** [backend](https://movie-review-platform-backend.onrender.com)

---
## 🚀 Features

### 👥 Users
- Browse all movies with **search, filter, and pagination**
- View **detailed movie pages** (cast, director, synopsis, average ratings, poster)
- Submit **reviews with star ratings & text**
- Manage **personal watchlist**
- Access **user profile** with review history & saved movies
- **Authentication** (JWT-based login/register)

### 🎬 Admin
- Secure **admin login**
- Add, edit, and delete movies
- View all movies with stats

### ⭐ Extras
- Responsive, mobile-friendly UI
- State management with React Context API
- RESTful API with validation and error handling
- Average rating calculation
- Environment variable configuration

---

## 🛠️ Tech Stack

| Technology   | Description                      |
|--------------|----------------------------------|
| **Frontend** | React (Vite), Tailwind CSS, Axios |
| **Backend**  |Node.js, Express.js, JWT, bcrypt |
| **Database** | MongoDB with Mongoose            |
| **Deployment** | Render (Frontend & Backend)   |

---

## 📡 API Endpoints
## 🔑 Admin Routes (/api/admin)
- POST /login → Admin login (returns JWT token)
- POST /movies → Add a new movie (Admin only)
- PUT /movies/:id → Update an existing movie (Admin only)
- DELETE /movies/:id → Delete a movie (Admin only)


## 👤 User Routes (/api/users)
- POST /signup → Register a new user
- POST /login → User login (returns JWT token)
- GET /:id → Get user profile (protected)
- PUT /:id → Update user profile with profile picture upload (protected)
- GET /:id/watchlist → Get user’s watchlist (protected)
- POST /:id/watchlist → Add a movie to watchlist (protected)
- DELETE /:id/watchlist/:movieId → Remove a movie from watchlist (protected)

## 🎬 Movie Routes (/api/movies)
- GET / → Get all movies (supports pagination, filtering)
- GET /:id → Get details of a specific movie
- GET /:id/reviews → Get all reviews for a movie
- POST /:id/reviews → Add a new review for a movie (protected)

---

## ⚙️ Environment Variables

Create a `.env` file in both **backend** and **frontend** folders.

### Backend `.env`
```bash

ADMIN_EMAIL=
ADMIN_PASSWORD=
MONGODB_URI='mongodb+srv://yourusername:yourpassword@cluster0.sguyk.mongodb.net'
JWT_SECRET=yoursecerat
JWT_SECRET_ADMIN=yoursecreate admin
CLOUDINARY_NAME = 'your name'
CLOUDINARY_API_KEY = 'your api key'
CLOUDINARY_SECRET_KEY = 'your secret key'

```
---
### Frontend `.env`
```bash
VITE_BACKEND_URL=http://localhost:4000

```
---

## 💻 Installation Guide  & Setup

### ✅ Prerequisites

- **Node.js installed**  
- **MongoDB URI** (Cloud or Local)

---

### 📦 Clone the Repository
```bash

git clone https://github.com/monikasenger/Movie-Review-Platform.git
cd Movie-Review-Platform
```
---

### 🔧 Setup Backend:

```bash
cd backend
npm install

▶️ Run the backend:
npm start
http://localhost:4000
```
---
### 💻 Setup Frontend:
```bash
cd frontend
npm install

▶️ Run the frontend:
npm run dev
http://localhost:5173
```
---
## 📁 Folder Structure 
```bash
Arvyax_Wellness_Platform/
│── backend/              # Express + MongoDB backend
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── middleware/       # JWT auth middleware
│   └── server.js         # Entry point
│
│── frontend/             # React (Vite) frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # App pages (Login, Register, Home, Admin, etc.)
│   │   ├── context/       # React Context API for global state(Admin, User, Movie )
│   │   └── App.jsx       # Main App
│   └── vite.config.js
│
└── README.md
