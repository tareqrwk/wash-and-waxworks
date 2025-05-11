# 🚗 Wash&WaxWorks - Car Detailing Web App

---

## 🔧 Features

### 💻 Client-Side (Frontend)
- ✅ Mobile-responsive UI built with **Tailwind CSS**
- 🧾 Service booking form with real-time validation
- 🎯 Prefilled booking page from service page
- 🗓️ Scroll-triggered animations using **AOS**
- 📩 Contact form to reach the business via email
- ⭐ Review form for client feedback
- 📸 Before-and-after gallery
- 📊 Page visit counter

### 🔐 Admin-Side (Dashboard)
- 🔐 Secure login system for admins
- 📋 View all bookings in a table and calendar
- 🔎 Filter bookings by date
- 🌍 View total website visits
- 💬 View, feature, and delete reviews
- ➕ One-click add-to-homepage for testimonials

---

## 🧰 Tech Stack

| Layer     | Technologies                              |
|-----------|-------------------------------------------|
| Frontend  | React, Tailwind CSS, AOS, React Router    |
| Backend   | Node.js, Express.js, Nodemailer           |
| Database  | MongoDB with Mongoose                     |
| Email     | Gmail SMTP via Nodemailer                 |
| Deployment| Render (Server), Vercel/Netlify (Frontend)|

---

## 📁 Project Structure

wash-and-waxworks/
├── client/ # React Frontend
│ ├── components/ # UI Components (Hero, Navbar, etc.)
│ ├── pages/ # Route-level Pages (Booking, Admin)
│ ├── App.js # Router and Layout
│ └── ...
├── server/ # Express Backend
│ ├── index.js # API Routes and Server Logic
│ └── ...
├── .env # Environment Variables
└── README.md # Project Documentation

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/wash-and-waxworks.git
cd wash-and-waxworks
```
### 2. Install dependencies

```bash
Frontend:
cd client
npm install

Backend:
cd server
npm install
```

### 3. Set Up Enviroment Variables

MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMINS=[{"email":"admin@example.com","password":"yourPassword123"}]
💡 Make sure you've enabled "Less secure apps" or created an App Password in your Gmail account.

## 🌐 Deployment

Frontend: Deploy using Vercel or Netlify
Backend: Deploy using Render or Railway

## Custom Domain

You can connect a custom domain by:

1. Purchasing a domain (GoDaddy, Namecheap, etc.)
2. Linking it to Vercel/Netlify in your dashboard
3. Updating environment variables (localhost → new domain if needed for backend URLs)

## 🙌 Acknowledgements
Built by Tareq Kurdiah as a portfolio project to practice full-stack development, UI/UX design, backend integration, and production deployment. 

📬 Contact
📧 Email: tareqrwk@gmail.com

📄 License
This project is for educational, portfolio, and business use only. All rights reserved © 2025.