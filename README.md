# Task Management App

A real-time task management application that allows users to create, move, and reorder tasks within different categories using drag-and-drop functionality. The app is built with the MERN stack and utilizes **Socket.io** for real-time updates.

## 🚀 Live Demo

[🔗 View Live Application](#) _(Replace with your live link)_

## 📦 Dependencies

### Backend:

- Express.js
- MongoDB
- Socket.io

### Frontend:

- React.js
- DnD Kit (Drag and Drop)
- Tailwind CSS
- Socket.io-client

## 🛠 Installation Guide

### 1️⃣ Clone the Repository:

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

### 2️⃣ Backend Setup:

```bash
cd server
npm install
```

#### Configure Environment Variables:

Create a `.env` file in the `server` directory and add:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run the backend server:

```bash
npm start
```

### 3️⃣ Frontend Setup:

```bash
cd client
npm install
npm start
```

## 🏗️ Technologies Used

- **Frontend:** React.js, Tailwind CSS, DnD Kit
- **Backend:** Node.js, Express.js, MongoDB
- **Real-Time:** Socket.io

## ✨ Features

- ✅ Create, Update, Delete tasks
- 🎯 Drag and drop to reorder tasks within a category
- 🔄 Move tasks between different categories
- 📡 Real-time updates using Socket.io
- 🔥 Responsive UI with Tailwind CSS
