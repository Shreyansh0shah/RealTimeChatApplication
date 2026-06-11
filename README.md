# 🚀 Real-Time Chat Application

A scalable, secure, and production-oriented real-time messaging platform built with Node.js, Express.js, MongoDB, Socket.IO, Redis, and React.

The application enables instant communication between users with features such as real-time messaging, typing indicators, message delivery/read receipts, group conversations, JWT-based authentication, AI-powered moderation, offline notifications, and distributed event synchronization.

---

## 📖 Overview

Modern messaging platforms require low-latency communication, secure authentication, and the ability to scale across multiple server instances.

This project was developed to explore and implement the core architectural concepts behind real-world messaging systems such as WhatsApp, Discord, Slack, and Microsoft Teams.

The backend follows a modular architecture and incorporates WebSockets, token-based authentication, distributed event propagation, and horizontal scalability mechanisms.

---

## ✨ Key Features

### Authentication & Security

- User Registration and Login
- JWT Access Token Authentication
- Refresh Token Rotation
- Protected API Routes
- Password Hashing using bcrypt
- Rate Limiting
- Request Validation & Sanitization
- Security Headers (Helmet)

### Real-Time Communication

- One-to-One Messaging
- Instant Message Delivery
- Online / Offline Presence Tracking
- Typing Indicators
- Delivery Receipts
- Read Receipts

### Group Conversations

- Create Chat Rooms
- Join / Leave Rooms
- Real-Time Group Messaging

### Notifications

- Offline Email Notifications
- Event-Based Notification System

### AI Features

- Toxic Content Detection
- Message Moderation Pipeline
- Urgency Analysis Support

### Scalability

- Redis Pub/Sub Integration
- PM2 Cluster Mode
- Multi-Core Utilization
- Horizontal Scaling Ready

---

## 🏗 System Architecture

```text
┌────────────────────┐
│      React UI      │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  Express REST API  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   Socket.IO Layer  │
└───────┬──────┬─────┘
        │      │
        ▼      ▼
┌──────────┐ ┌──────────┐
│ MongoDB  │ │  Redis   │
└──────────┘ └──────────┘
        │
        ▼
┌────────────────────┐
│   PM2 Clustering   │
└────────────────────┘
```

---

## 🛠 Technology Stack

### Frontend

- React
- React Router
- Axios
- Socket.IO Client

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Real-Time Layer

- Socket.IO

### Authentication

- JWT
- Refresh Tokens

### Scaling & Performance

- Redis Pub/Sub
- PM2 Cluster Mode

### Security

- bcrypt
- Helmet
- Rate Limiting
- Input Validation

### Notifications

- Nodemailer

---

## 🔄 Real-Time Messaging Flow

```text
Sender
   │
   ▼
Socket.IO Event
   │
   ▼
Backend Socket Server
   │
   ▼
MongoDB Persistence
   │
   ▼
Receiver Socket Lookup
   │
   ▼
Real-Time Delivery
   │
   ▼
Receiver
```

If the receiver is offline:

```text
Message Stored
      │
      ▼
Notification Service
      │
      ▼
Email Notification
```

---

## 🔐 Authentication Flow

```text
Login Request
      │
      ▼
Credential Verification
      │
      ▼
Access Token Generated
      │
      ▼
Refresh Token Generated
      │
      ▼
Protected API Access
      │
      ▼
Access Token Expiry
      │
      ▼
Refresh Endpoint
      │
      ▼
New Access Token
```

---

## 📂 Project Structure

```text
RealTimeChatApplication
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── socket
│   ├── utils
│   ├── logs
│   ├── server.js
│   └── pm2.config.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── socket
│   │   └── styles
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/your-username/realtime-chat-application.git
cd realtime-chat-application
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5001

MONGO_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password

REDIS_HOST=localhost
REDIS_PORT=6379
```

Start Backend

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## ⚡ Running with PM2

```bash
pm2 start pm2.config.js
```

View logs

```bash
pm2 logs
```

Monitor processes

```bash
pm2 monit
```

---

## 🧪 Core Functionalities Tested

### Authentication

- User Registration
- Login
- Logout
- Token Refresh
- Protected Routes

### Messaging

- Real-Time Messaging
- Typing Indicators
- Delivery Receipts
- Read Receipts

### Group Chat

- Room Creation
- Room Join / Leave
- Group Messaging

### Notifications

- Offline Email Notifications

### Scalability

- Redis Synchronization
- PM2 Multi-Core Clustering

---

## 📈 Future Enhancements

- End-to-End Encryption
- Voice Messaging
- Video Calling
- File Sharing
- Push Notifications
- Mobile Application
- AI Chat Assistant
- Message Reactions

---

## 📚 Key Learnings

This project provided hands-on experience with:

- REST API Design
- JWT Authentication
- Refresh Token Rotation
- MongoDB Data Modeling
- Socket.IO Communication
- Distributed Event Systems
- Redis Pub/Sub
- PM2 Clustering
- Email Notification Services
- Scalable Backend Architecture

---

## 👨‍💻 Author

**Shreyansh Shah**

PG-DAC Student | Aspiring Full Stack Developer

**Areas of Interest**

- Java Backend Development
- Distributed Systems
- Real-Time Applications
- Scalable Software Architecture

GitHub: https://github.com/your-username

---

⭐ If you found this project interesting, consider giving it a star.
