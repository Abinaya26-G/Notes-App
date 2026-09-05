# Notes App

This is a simple Notes App made using Spring Boot and React.

Users can register and login, create notes, edit them, delete them and manage their notes based on their status.

## Technologies Used

### Backend

* Java 17
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* PostgreSQL
* Maven
* Lombok

### Frontend

* React 18
* Vite
* React Router
* Axios
* React Toastify
* Lucide React

### Deployment

* Docker
* Jenkins
* GitHub Webhook
* AWS EC2

## Features

* Register and Login
* JWT based authentication
* Create, edit and delete notes
* Save notes as draft
* Mark notes as completed
* Pin and unpin notes
* Search notes by title and content
* Filter notes by status
* Dashboard with note statistics
* Update profile and password
* Responsive UI

## Setup

### Database

Create a PostgreSQL database:

```sql
CREATE DATABASE notes_db;
```

No need to create the tables manually. They will be created automatically when the backend is started.

### Backend

Go to the backend folder:

```bash
cd backend
mvn spring-boot:run
```

Before running, update the PostgreSQL username and password in `application.properties`.

Backend runs at:

`http://localhost:9090`

### Frontend

Go to the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

`http://localhost:5173`

## API

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | `/api/auth/register`       | Register user       |
| POST   | `/api/auth/login`          | Login               |
| GET    | `/api/auth/me`             | Get current user    |
| GET    | `/api/notes`               | Get notes           |
| GET    | `/api/notes/{id}`          | Get note            |
| POST   | `/api/notes`               | Create note         |
| POST   | `/api/notes/draft`         | Save draft          |
| PUT    | `/api/notes/{id}`          | Update note         |
| PATCH  | `/api/notes/{id}/pin`      | Pin / Unpin         |
| PATCH  | `/api/notes/{id}/complete` | Complete note       |
| DELETE | `/api/notes/{id}`          | Delete note         |
| GET    | `/api/notes/stats`         | Get note statistics |
| GET    | `/api/profile`             | Get profile         |
| PUT    | `/api/profile`             | Update profile      |

## Deployment

The application is deployed using Docker, Jenkins and AWS EC2.

GitHub Webhook is connected with Jenkins, so whenever new code is pushed to GitHub, Jenkins automatically starts the build and deployment process.

### Deployment Flow

GitHub → Webhook → Jenkins → Docker → AWS EC2

## Author

Abinaya
