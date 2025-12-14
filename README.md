#  Full Stack Notes Dashboard (React + Node.js)

A full-stack web application built as part of a **Frontend Developer Intern assignment**, featuring **authentication, protected dashboard, and CRUD operations on notes**, with a scalable **MVC backend**.

---

##  Features

###  Authentication
- User **Signup & Login**
- JWT-based authentication
- Token stored in `localStorage`
- Protected APIs

###  Dashboard
- Fixed navbar with search
- Responsive sidebar (desktop & mobile)
- Add Note / View Notes toggle
- Notes are **user-specific**
- Search notes by title
- Logout functionality

###  Notes Management
- Create notes
- View all notes
- Delete notes
- Real-time UI updates (no refresh)

---

##  Tech Stack

### Frontend
- React (JavaScript)
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- MVC Architecture


---

##  API Endpoints

### Auth
| Method | Endpoint |
|------|---------|
| POST | `/api/user/register` |
| POST | `/api/user/login` |

### Notes (Protected)
| Method | Endpoint |
|------|---------|
| GET | `/api/note` |
| POST | `/api/note` |
| DELETE | `/api/note/:id` |

---

##  Authentication Flow

1. User logs in
2. Backend returns JWT
3. JWT stored in `localStorage`
4. JWT sent via `Authorization: Bearer <token>`
5. Backend validates token using middleware

---

##  Setup Instructions

### Backend
cd backend
npm install
npm run dev
Create .env:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### frontend
npm install
npm run dev


## API Testing
All APIs tested using Postman
Protected routes verified with JWT token


