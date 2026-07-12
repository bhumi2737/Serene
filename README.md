# 🌿 Serene — AI-Powered Mental Wellness Companion

> A private, full-stack mental wellness web app that helps you understand your emotions through daily mood tracking, guided journalling, and AI-powered insights.

---

## 💡 Why Serene?

Mental health support in India is largely inaccessible — therapy costs ₹1500–3000 per session and carries significant stigma. Most people don't even have a private space to process their emotions daily.

Serene solves this by providing:
- A **judgment-free** daily check-in experience
- **AI-powered** emotion detection and conversation
- **Pattern insights** that help users understand themselves over time
- A **completely private** space — no data sharing, no ads

---

## ✨ Features

### Core Wellness Tools
- **Mood Tracker** — Log daily mood with emoji-based picker (Low / Okay / Good / Great / Amazing). Visualise weekly trends with SVG charts.
- **Reflection Journal** — Write personal entries with AI-powered emotion detection. Each entry is automatically tagged with detected emotions (calm, anxious, hopeful etc.) and a short AI summary.
- **Gratitude Log** — Log three daily highlights to build a gratitude practice. Past entries persist and are viewable anytime.
- **AI Chat Companion** — Talk to a calm, empathetic AI companion powered by Groq (Llama 3.3). Designed to listen, reflect, and ask thoughtful questions — not give advice.

### Insights & Reports
- **Insights Page** — Real mood trend charts, mood distribution breakdown, day-of-week pattern detection, journal and gratitude activity stats, streak tracking.
- **PDF Wellness Reports** — Download weekly or monthly wellness reports as PDFs generated server-side using PDFKit.

### User Experience
- **Light / Dark Theme** — Toggle between Calm Light (warm beige) and Calm Dark (deep charcoal) themes. Preference persisted across sessions.
- **Smart Notifications** — Browser notifications remind you to check in only if you haven't logged your mood yet today. User-configurable reminder time.
- **Streak Counter** — Tracks consecutive days of mood logging to build habit consistency.

### Safety & Resources
- **Resources Page** — Curated mental health articles, self-help techniques (4-7-8 breathing, 5-4-3-2-1 grounding, brain dump journalling), and guidance on finding professional support in India.
- **Safety Page** — Clear clinical notice about what Serene is and isn't, AI companion disclaimer, data privacy information, and emergency contact guidance.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework and build tool |
| Tailwind CSS | Utility-first styling |
| React Router v6 | Client-side routing |
| Plain SVG | Custom mood and insights charts |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB Atlas + Mongoose | Cloud database and ODM |
| JWT + bcrypt | Authentication and password hashing |
| PDFKit | Server-side PDF generation |
| Groq API (Llama 3.3) | AI chat companion and emotion detection |
| Axios | HTTP client for AI API calls |

### Security
| Package | Purpose |
|---|---|
| Helmet | HTTP security headers |
| express-rate-limit | Brute force protection |
| express-mongo-sanitize | NoSQL injection prevention |
| CORS lockdown | Origin restriction in production |
| Input validation middleware | Request body sanitisation |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting with CDN |
| Render | Backend API hosting |
| MongoDB Atlas | Cloud database (Mumbai region) |

---

## 📁 Project Structure

```
serene/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Sidebar, reusable UI
│   │   ├── pages/             # All page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── MoodPage.jsx
│   │   │   ├── JournalPage.jsx
│   │   │   ├── JournalNewPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── GratitudePage.jsx
│   │   │   ├── InsightsPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── ResourcesPage.jsx
│   │   │   └── SafetyPage.jsx
│   │   ├── utils/
│   │   │   ├── api.js         # All API fetch functions
│   │   │   ├── streak.js      # Streak calculation logic
│   │   │   ├── theme.js       # Light/dark theme toggle
│   │   │   └── notifications.js # Browser notification logic
│   │   └── App.jsx            # Routes + protected route wrapper
│   └── .env                   # VITE_API_URL
│
└── server/                    # Express backend
    ├── config/
    │   └── db.js              # MongoDB connection + reconnection
    ├── controllers/
    │   ├── authController.js
    │   ├── moodController.js
    │   ├── journalController.js
    │   ├── gratitudeController.js
    │   ├── chatController.js
    │   ├── journalAnalyseController.js
    │   └── reportController.js
    ├── middleware/
    │   ├── authMiddleware.js   # JWT verification
    │   └── validateInput.js   # Input validation
    ├── models/
    │   ├── User.js
    │   ├── Mood.js
    │   ├── Journal.js
    │   └── Gratitude.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── moodRoutes.js
    │   ├── journalRoutes.js
    │   ├── gratitudeRoutes.js
    │   ├── chatRoutes.js
    │   └── reportRoutes.js
    └── server.js              # Express app entry point
```

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and receive JWT |

### Moods
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/moods` | Get all moods for logged-in user |
| POST | `/api/moods` | Save or update today's mood |

### Journals
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/journals` | Get all journal entries |
| POST | `/api/journals` | Create new journal entry |
| PATCH | `/api/journals/:id/analyse` | Save AI emotion analysis |
| DELETE | `/api/journals/:id` | Delete a journal entry |

### Gratitude
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/gratitude` | Get all gratitude entries |
| POST | `/api/gratitude` | Save or update today's gratitude |

### AI
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/chat` | Send message to AI companion |
| POST | `/api/journals/analyse` | Analyse journal entry emotions |

### Reports
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/report/generate` | Generate PDF wellness report |

---

## 🔒 Security

- All dashboard routes protected by JWT authentication
- Passwords hashed with bcrypt (10 salt rounds)
- Rate limiting: 20 requests/15min on auth, 200 requests/15min on API
- HTTP security headers via Helmet
- NoSQL injection prevention via express-mongo-sanitize
- Input validation on all write endpoints
- CORS restricted to frontend origin in production
- Environment variables for all secrets — never committed to Git

---

## 📊 Database Schema

```
Users:      { name, email, password (hashed), createdAt }
Moods:      { userId, date, mood } — unique per user per day
Journals:   { userId, date, title, body, emotions[], summary }
Gratitude:  { userId, date, items[] } — unique per user per day
```

---

## 🧠 AI Integration

Serene uses the **Groq API** (Llama 3.3 70B Versatile model) for two features:

**Chat Companion** — A calm therapist personality defined via system prompt. Responds in 2–4 sentences, listens empathetically, asks one thoughtful question at a time. Never gives medical advice.

**Journal Emotion Detection** — When a journal entry is saved, the body text is sent to Groq with a structured prompt requesting a JSON response containing emotion tags and a one-sentence summary. Results are saved alongside the journal entry in MongoDB.

---

## 👩‍💻 About the Developer

Built by **Bhumi Uppal** as a placement portfolio project — a full-stack MERN application demonstrating real-world skills in React, Node.js, MongoDB, JWT authentication, AI API integration, and production deployment.

- GitHub: [@bhumi2737](https://github.com/bhumi2737)
- Project: [github.com/bhumi2737/Serene](https://github.com/bhumi2737/Serene)

---

*Serene is a self-guided wellness tool. It is not a clinical therapy service, medical diagnostic tool, or emergency intervention service. If you are in crisis, please contact emergency services immediately.*
