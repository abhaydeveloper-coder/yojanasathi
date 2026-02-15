# Yojana Sathi – AI-Powered Government Scheme Assistant

Yojana Sathi is an AI-powered civic assistant designed to help citizens easily discover, understand, and apply for government schemes they are eligible for. It simplifies access to public welfare programs using AI, personalization, and conversational interaction.

---

## 📌 Problem Statement

Millions of citizens are unaware of government schemes they qualify for due to:

* Lack of awareness
* Complex eligibility criteria
* Language barriers
* Difficult government portals
* No centralized personalized platform

**Yojana Sathi solves this by providing an intelligent assistant that recommends schemes based on user profile and answers questions in simple language.**

---

## 🎯 Objectives

* Provide personalized government scheme recommendations
* Simplify scheme eligibility checking
* Offer conversational AI support
* Improve accessibility with multilingual support
* Increase awareness and utilization of government benefits

---

## 🚀 Key Features

### 1. AI Chatbot Interface

* Conversational assistant similar to ChatGPT
* Answers scheme-related questions
* Guides users step-by-step

### 2. Personalized Scheme Recommendations

* Recommends schemes based on:

  * Age
  * State
  * Occupation
  * Income
  * Category (Student, Farmer, etc.)

### 3. Eligibility Matching Engine

* Rule-based eligibility checking
* Shows:

  * Eligible schemes
  * Partially eligible schemes
  * Not eligible schemes with reason

### 4. Multilingual Support

* Supports multiple Indian languages
* Improves accessibility for rural users

### 5. User Profile Management

* Easy onboarding
* Saves user preferences
* Provides personalized experience

### 6. Scheme Information Dashboard

* Scheme details
* Benefits
* Eligibility criteria
* Application process
* Official links

---

## 🏗️ System Architecture

```
Frontend (React / Web UI)
        ↓
Backend (Node.js / Python)
        ↓
AI Engine (Gemini API / OpenAI API)
        ↓
Eligibility Engine (Rule-based logic)
        ↓
Database (MongoDB / Firebase)
```

---

## 🛠️ Tech Stack

### Frontend

* HTML, CSS, JavaScript
* React.js (recommended)
* Tailwind CSS

### Backend

* Node.js / Express.js
  or
* Python / FastAPI

### Database

* MongoDB / Firebase

### AI Integration

* Gemini API or OpenAI API

### Deployment

* Vercel / Netlify (Frontend)
* Render / Railway (Backend)

---

## 📂 Project Structure

```
yojana-sathi/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── App.js
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
│
├── database/
│   └── schemes.json
│
├── README.md
└── package.json
```

---

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/yojana-sathi.git
cd yojana-sathi
```

### 2. Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

### 3. Run the project

Frontend:

```bash
npm start
```

Backend:

```bash
node server.js
```

---

## 💡 Example Usage

User enters:

```
Age: 19
State: Rajasthan
Occupation: Student
```

Yojana Sathi will recommend:

* PM Scholarship Scheme
* Skill Development Schemes
* Student Support Schemes

---

## 🌍 Target Users

* Students
* Farmers
* Job seekers
* Low income families
* Rural citizens
* General public

---

## 📈 Future Enhancements

* Mobile App version
* Voice assistant support
* Direct application integration
* Aadhaar based personalization
* Real-time scheme updates

---

## 🤝 Contribution

Contributions are welcome.

Steps:

1. Fork the repository
2. Create a new branch
3. Make changes
4. Submit pull request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Abhay Pratap Singh**
Developer of Yojana Sathi
AI for Communities & Public Impact Project

---

## ⭐ Conclusion

Yojana Sathi aims to bridge the gap between citizens and government welfare schemes using AI, making access simple, personalized, and inclusive.

---

**"Empowering citizens through intelligent access to government schemes."**
