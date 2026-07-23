# Notes App - Full Stack Portfolio Project

## Tech Stack
- **Backend:** Java 17, Spring Boot 3.x, Spring Security, JWT, Spring Data JPA, PostgreSQL, Maven, Lombok
- **Frontend:** React 18, Vite, React Router DOM, Axios, React Toastify, Lucide React Icons,

## Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL (database `notes_db` must exist)
- Maven

## Setup

### 1. PostgreSQL
Create database (do NOT create tables):
```sql
CREATE DATABASE notes_db;
```

### 2. Backend
1. Open `backend/src/main/resources/application.properties`
2. Replace `YOUR_PASSWORD` with your PostgreSQL password
3. Run:
```bash
cd backend
mvn spring-boot:run
```
Server runs on `http://localhost:9090`

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## Features
- JWT Authentication (Register / Login)
- Create, Edit, Delete, View Notes
- Save as Draft
- Mark Pending as Completed
- Pin / Unpin Notes (pinned notes appear at top)
- Real-time Search by title and content
- Tab Filters: All, Draft, Pending, Completed
- Dashboard Stats Cards (auto-update)
- Profile Page with Edit Name / Password
- Responsive Minimal UI

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Current User |
| GET | /api/notes | All Notes |
| GET | /api/notes/{id} | Get Note |
| POST | /api/notes | Create Note (Pending) |
| POST | /api/notes/draft | Save Draft |
| PUT | /api/notes/{id} | Update Note |
| PATCH | /api/notes/{id}/pin | Toggle Pin |
| PATCH | /api/notes/{id}/complete | Mark Complete |
| DELETE | /api/notes/{id} | Delete Note |
| GET | /api/notes/stats | Statistics |
| GET | /api/profile | Get Profile |
| PUT | /api/profile | Update Profile |
