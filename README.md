**📝Notid**

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

> A full-stack notes application built with the MERN stack, featuring secure authentication, real-time CRUD operations, and seamless deployment across Vercel and Render.

[Live Demo](https://notid-frontend.vercel.app/)

---

## 🎯 Overview

A production-ready notes application that allows users to securely register, authenticate, and manage their personal notes with full CRUD functionality. Built with modern web technologies and deployed on industry-standard cloud platforms, this project demonstrates end-to-end full-stack development skills including authentication, database design, API development, and deployment.

### ✨ Why This Project?

- **Full-Stack Implementation**: Complete separation of concerns with dedicated frontend and backend repositories
- **Secure Authentication**: JWT-based session management with bcrypt password hashing
- **Real-Time Updates**: In-place note editing without page refreshes
- **Production Deployment**: Live application with professional hosting on Vercel (frontend) and Render (backend)

## 🚀 Features

### Core Functionality
- ✅ **User Authentication**
  - Secure user registration with email, username, and password
  - Login system with JWT token-based session management
  - Password encryption using bcrypt
  - Secure logout functionality

- ✅ **Notes Management**
  - Create new notes with ease
  - View all personal notes in a clean dashboard
  - Update notes in-place without navigation
  - Delete notes with instant feedback
  - User-specific notes (each user only sees their own notes)

- ✅ **User Experience**
  - Personalized dashboard with welcome message
  - Responsive design for all devices
  - Local storage integration for session persistence
  - Smooth UI interactions

### Security Features
- 🔒 Password hashing with bcrypt
- 🔑 JWT-based authentication
- 🛡️ Protected API routes
- 🔐 Secure CORS configuration

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js** | UI library for building interactive interfaces |
| **TypeScript** | Type-safe JavaScript for better code quality |
| **React Router** | Client-side routing and navigation |
| **CSS3** | Custom styling for components |
| **LocalStorage API** | Client-side session management |
| **Fetch API** | HTTP requests to backend |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database for data persistence |
| **Mongoose** | ODM for MongoDB schema modeling |
| **bcrypt** | Password hashing library |
| **jsonwebtoken** | JWT generation and verification |
| **CORS** | Cross-origin resource sharing middleware |

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 🏗️ Architecture
```mermaid
graph TB
    subgraph "Client Side - Vercel"
        A[React Frontend] --> B[Login/Register]
        A --> C[Dashboard]
        A --> D[Notes Manager]
    end
    
    subgraph "Server Side - Render"
        E[Express API] --> F[Auth Routes]
        E --> G[Notes Routes]
        E --> H[Middleware]
    end
    
    subgraph "Database - MongoDB Atlas"
        I[(User Collection)]
        J[(Notes Collection)]
    end
    
    A -->|HTTP Requests| E
    F -->|JWT Token| A
    G -->|CRUD Operations| J
    F -->|User Auth| I
    H -->|CORS Protection| A
```

### Data Flow
1. **Authentication Flow**
   - User registers → Backend hashes password with bcrypt → Stored in MongoDB
   - User logs in → Backend verifies credentials → Issues JWT token
   - Token stored in localStorage → Sent with each API request
   - Protected routes verify JWT before processing requests

2. **Notes CRUD Flow**
   - User creates note → POST request with JWT → Saved to user's notes collection
   - Dashboard loads → GET request with JWT → Fetches user-specific notes
   - User updates note → PUT request with JWT → Updates in-place
   - User deletes note → DELETE request with JWT → Removes from database

---

## 📁 Project Structure

### Frontend Structure
```
frontend/
├── public/
├── src/
│   ├── assets/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Dashboard.css
│   │   ├── Login/
│   │   │   ├── Login.tsx
│   │   │   └── Login.css
│   │   └── Register/
│   │       ├── Register.tsx
│   │       └── Register.css
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── .gitignore
├── eslintconfig.js
├── index.html
└── package.json
```

### Backend Structure
```
backend/
├── models/
│   ├── notesModel.js    # Mongoose schema for notes
│   └── userModel.js     # Mongoose schema for users
├── .env
├── .gitignore
├── app.js               # Express app configuration
├── package.json
└── package-lock.json
```

### Database Schema

**User Model**
```javascript
{
  email: String (unique, required),
  username: String (required),
  password: String (hashed, required),
  createdAt: Date
}
```

**Notes Model**
```javascript
{
  userId: ObjectId (ref: User, required),
  title: String,
  content: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login existing user | No |

### Notes (Protected Routes)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notes` | Get all user notes | Yes (JWT) |
| POST | `/api/notes` | Create a new note | Yes (JWT) |
| PUT | `/api/notes/:id` | Update a note | Yes (JWT) |
| DELETE | `/api/notes/:id` | Delete a note | Yes (JWT) |

**Authentication:** Protected routes require a valid JWT token in the Authorization header.

### Environment Variables

#### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/notesdb` |
| `JWT_SECRET` | Secret key for JWT signing | `your_random_secret_key_here` |
| `PORT` | Server port (optional for local dev) | `5000` |

**Note:** Never commit your `.env` files to GitHub. Add them to `.gitignore`.



## 🧩 Challenges Overcome

### 1. CORS Configuration Issues
**Problem:** Dashboard would flicker and disappear after login due to CORS blocking API requests between Vercel (frontend) and Render (backend).

**Solution:** 
- Implemented proper CORS middleware configuration in Express
- Added specific origin whitelisting for both development and production environments
- Configured credentials support for cookie/token handling
- Tested thoroughly across different deployment stages

### 2. Authentication State Management
**Problem:** Initially implemented JWT storage that caused bugs in session persistence.

**Solution:**
- Rolled back to localStorage for token storage
- Maintained JWT for secure session management on the backend
- Implemented proper token verification middleware
- Added automatic token inclusion in API request headers

### 3. In-Place Note Updates
**Problem:** Needed smooth UX for updating notes without page navigation or refreshes.

**Solution:**
- Implemented inline editing functionality
- Used React state management to update UI immediately
- Synchronized with backend API calls
- Added proper error handling for failed updates

### 4. Secure Password Management
**Problem:** Needed to ensure user passwords are never stored in plain text.

**Solution:**
- Integrated bcrypt for password hashing
- Implemented proper salt rounds (10+)
- Never expose password hashes in API responses
- Added password validation on both frontend and backend

---

## 🔮 Potential Improvements

- [ ] Enhanced UI/UX with better styling and animations
- [ ] Add note search functionality
- [ ] Implement note categorization with tags
- [ ] Add timestamps display for notes
- [ ] Improve mobile responsiveness
- [ ] Add loading states and better error messages

---

## 🎓 What I Learned

This project taught me:
- Building and connecting a full MERN stack application
- Implementing secure authentication with JWT and bcrypt
- Managing CORS in production environments
- Deploying frontend and backend to different platforms
- Database schema design with Mongoose
- State management in React with TypeScript
