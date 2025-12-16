# Real-Time Chat Application – Backend

## 📌 Project Overview

This project is the **backend of a Real-Time Chat Application** developed using **Node.js and Express.js**.
It provides **secure authentication**, **real-time communication**, **scalability**, and **security features** similar to modern chat applications.

The backend is designed to be **production-ready** and is suitable for **academic submission, project evaluation, and viva explanation**.

---

## 🎯 Objectives of the Project

* Build a **secure backend** for a chat application
* Implement **real-time messaging** using WebSockets
* Support **scalable architecture** using Redis and PM2
* Apply **industry-level backend practices**
* Demonstrate understanding of **authentication, security, and system design**

---

## 🛠️ Technologies Used

* Node.js – Backend runtime
* Express.js – REST API framework
* MongoDB (Mongoose) – Database
* JWT – Authentication (Access Token + Refresh Token)
* Redis – Pub/Sub for socket scaling
* Socket.IO – Real-time communication
* PM2 – Clustering & process management
* Nodemailer – Email notifications
* Helmet – Security headers
* Rate Limiting & Sanitization – API protection

---

## 🚀 Features Implemented

### 🔐 Authentication & Security

* User Signup & Login
* JWT Access Token authentication
* Refresh Token mechanism
* Protected APIs using middleware
* Rate limiting & request validation
* Security headers & sanitization

### 💬 Chat Features

* One-to-one messaging
* Real-time message delivery
* Typing indicators
* Message delivery & read receipts
* Chat history storage

### ⚡ Scalability & Performance

* Redis Pub/Sub for multi-instance sockets
* PM2 cluster mode for multi-core usage
* Fault tolerance and auto-restart

### 🤖 AI & Notifications

* AI-based message moderation
* Email notifications for offline users

---

## 📂 Backend Folder Structure

```
backend/
│
├── config/
│   ├── db.js
│   └── redis.js
│
├── controllers/
│   ├── authController.js
│   ├── chatController.js
│   ├── roomController.js
│   ├── aiController.js
│   └── notificationController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── rateLimiter.js
│   ├── securityHeaders.js
│   ├── validateRequest.js
│   └── errorHandler.js
│
├── models/
│   ├── User.js
│   ├── Message.js
│   ├── ChatRoom.js
│   └── RefreshToken.js
│
├── routes/
│   ├── authRoutes.js
│   ├── chatRoutes.js
│   ├── roomRoutes.js
│   ├── aiRoutes.js
│   └── notificationRoutes.js
│
├── socket/
│   └── index.js
│
├── utils/
│   ├── jwt.js
│   ├── hash.js
│   ├── logger.js
│   └── emailService.js
│
├── logs/
├── server.js
├── pm2.config.js
└── README.md
```

---

## 🔐 API Endpoints

### Authentication APIs

* POST `/api/auth/signup`
* POST `/api/auth/login`
* POST `/api/auth/refresh`
* POST `/api/auth/logout`

### Chat APIs

* POST `/api/chat/send`
* GET  `/api/chat/messages/:userId`

### Room APIs

* POST `/api/room/create`
* POST `/api/room/join`

### AI API

* POST `/api/ai/analyze`

### Notification API

* POST `/api/notifications/email`

---

## 🔌 Socket Events Used

* add-user
* send-message
* receive-message
* typing-start
* typing-stop
* message-delivered
* message-read
* join-room
* room-message

---

## ⚙️ Environment Variables (.env)

```
PORT=5001
MONGO_URL=your_mongodb_url

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

REDIS_URL=your_redis_url

EMAIL_USER=your_email
EMAIL_PASS=your_app_password
```

---

## ▶️ How to Run the Backend

### Install dependencies

```
npm install
```

### Run in development mode

```
npm start
```

### Run in cluster mode (production-ready)

```
pm2 start pm2.config.js
```

---

## 🧪 Testing

* APIs tested using Postman
* Socket events tested using browser clients
* Authentication tested for token expiry & refresh
* Redis scaling tested with PM2 cluster

---

## 🎓 Academic Relevance

This project demonstrates:

* Secure backend development
* Real-time system design
* Token-based authentication
* Scalable architecture using Redis & PM2
* Clean MVC-based folder structure
* Industry-level backend practices

---

## ✅ Project Status

Backend development **completed successfully**.
Ready for frontend integration, documentation, and viva presentation.