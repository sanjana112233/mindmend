# mindmend
# 🧠 MindMend – AI-Powered Mental Health Support Platform

MindMend is a full-stack AI mental-wellness application built with a modern architecture that includes a **React frontend**, **Node.js backend**, and a **Python machine-learning service**.  
This README explains the project structure clearly so anyone can understand how the application works.

---

## 📁 Project Folder Structure

Below is the overall structure of the MindMend project:

MindMend/
│
├── frontend/ → React UI (Vite + Tailwind CSS)//client
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/ → Node.js API (Express + MongoDB + JWT Auth)//server
│ ├── server.js
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── package.json
│
├── ml_service/ → Python ML Microservice (Sentiment & Mood Analysis)//middleware
│ ├── main.py
│ ├── tasks.py
│ └── requirements.txt
│
└── README.md

--

## 🏗️ What Each Folder Does

### **📂 frontend/**
This folder contains the **React application**, responsible for:
- User Interface  
- Login / Signup pages  
- Chatbot UI  
- Journal page  
- Dashboard visualization  
- API communication with backend  
- Protected routes using Context API  

---

### **📂 backend/**
This folder contains the **Node.js Express backend**, responsible for:
- User authentication (JWT)
- Managing journals, moods, messages
- Gamification system (XP, levels)
- Validating routes with middleware
- Communicating with MongoDB
- Sending requests to the Python ML service

---

### **📂 ml_service/**
This folder contains the **Python ML engine**, responsible for:
- Text preprocessing
- Sentiment analysis
- Mood prediction
- Generating emotional insights
- Sending predictions back to Node.js backend
