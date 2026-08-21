# Interview AI

An AI-powered interview preparation platform. Users upload their resume and a target job description; the app analyzes the fit and generates a tailored interview report using Google's Gemini API — including likely questions, skill-gap analysis, and preparation guidance.

Live App: [interview-ai-builder.vercel.app](https://interview-ai-builder.vercel.app)

## Features

- User authentication (register, login, logout, session persistence via JWT)
- Resume (PDF) upload and parsing
- AI-generated interview reports based on resume + job description matching
- Interview report history — view past reports by ID or list all reports
- Protected routes with JWT-based auth middleware

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router
- Axios
- SCSS

**Backend**
- Node.js + Express
- MongoDB (Mongoose)
- JWT authentication, bcrypt password hashing
- Multer (file uploads) + pdf-parse (resume parsing)
- Google Gemini API (`@google/genai`) for AI-generated reports
- Zod for schema validation

## Project Structure
Backend/
├── src/
│ ├── config/ # Database configuration
│ ├── controllers/ # Auth and interview logic
│ ├── middleware/ # Auth & file upload middleware
│ ├── models/ # User, InterviewReport, Blacklist schemas
│ ├── routes/ # Auth and interview routes
│ └── services/ # Gemini AI integration
└── server.js

Frontend/
├── src/
│ ├── features/
│ │ ├── auth/ # Login, register, auth context/hooks
│ │ └── interview/ # Interview flow, report display
│ ├── App.jsx
│ └── app.routes.jsx


## Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)
- Google Gemini API key

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173


```bash
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

## API Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Log in and receive JWT | No |
| POST | `/api/auth/logout` | Log out | No |
| GET | `/api/auth/get-me` | Get current logged-in user | Yes |
| POST | `/api/interview` | Upload resume + job description, generate AI interview report | Yes |
| GET | `/api/interview/report/:interviewId` | Get a specific interview report | Yes |
| GET | `/api/interview` | Get all interview reports for the user | Yes |
## License

ISC
