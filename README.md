# 🌿 Serene — Mental Health Web App

<p align="center">
  <b>A calm and simple mental wellness web app for mood tracking, journaling, gratitude, and self-reflection.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-In%20Development-7C3AED?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

---

## ✨ About Serene

**Serene** is a mental health and self-care web app designed to help users understand their emotions through small daily habits.

The app focuses on creating a peaceful digital space where users can log their mood, write journals, practice gratitude, view weekly insights, and interact with a supportive AI companion.

> Serene is not a replacement for professional therapy, diagnosis, medical advice, or emergency care.
> It is a self-reflection and wellness support tool.

---

## 🌸 Core Features

| Feature            | Description                                            |
| ------------------ | ------------------------------------------------------ |
| 😊 Mood Tracker    | Log daily mood using a simple 1-5 mood scale           |
| 📝 Journal         | Write personal journal entries and reflect on emotions |
| 🌼 Gratitude Log   | Add 3 things you are grateful for each day             |
| 📊 Weekly Insights | View mood trends and emotional patterns                |
| 🤖 Serene Chat     | AI-powered supportive chat for reflection              |
| 🎵 Mood Playlists  | Spotify-based playlist suggestions according to mood   |
| 📄 Weekly Report   | Download a simple PDF summary of weekly progress       |

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* Chart.js

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Dotenv
* CORS

### Integrations

* Claude API for AI chat and emotional summaries
* Spotify API for mood-based playlists
* PDFKit for weekly report generation

---

## 📁 Project Structure

```bash
serene/
├── client/          # React frontend
├── server/          # Node.js + Express backend
├── .gitignore
├── README.md
└── SETUP.md
```

---

## ⚙️ Main Modules

### Frontend

```bash
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # App pages
│   ├── context/        # Authentication context
│   ├── api/            # API calls
│   ├── utils/          # Helper functions
│   ├── App.jsx
│   └── main.jsx
```

### Backend

```bash
server/
├── models/             # MongoDB models
├── routes/             # API routes
├── controllers/        # Request handling logic
├── middleware/         # Auth and validation middleware
├── services/           # External services and utilities
├── config/             # Database configuration
└── server.js
```

---

## 🔗 Planned API Routes

### Authentication

```bash
POST /auth/register
POST /auth/login
```

### Mood

```bash
POST /mood
GET /mood
GET /mood/week
```

### Journal

```bash
POST /journal
GET /journal
DELETE /journal/:id
```

### Gratitude

```bash
POST /gratitude
GET /gratitude/today
GET /gratitude/history
```

### Insights, Chat & Reports

```bash
GET /insights/week
POST /chat
GET /report/weekly
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd serene
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

## 🌍 Deployment Plan

| Part     | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |

---

## 👩‍💻 Author

Made with care by **Bhumi Uppal**

---

<p align="center">
  🌿 <b>Serene — Reflect. Breathe. Grow.</b> 🌿
</p>
