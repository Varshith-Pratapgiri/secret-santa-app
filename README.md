
# 🎄 Secret Santa Generator

A modern, responsive Secret Santa web application built with React and Vite.
Easily add participants, generate random gift pairs, and export the results to Excel.

---

## 📌 Features

* ✅ Add and remove participants dynamically
* ✅ Upload participants via Excel file
* ✅ Random Secret Santa pair generation
* ✅ Prevent self-assignment
* ✅ Download generated pairs as Excel file
* ✅ Responsive design (mobile + desktop)
* ✅ Clean UI with modern styling
* ✅ Slideshow “How It Works” section

---

## 🛠 Tech Stack

* **React**
* **Vite**
* **React Router**
* **XLSX (Excel file parsing & export)**
* **CSS (Custom design system with variables)**
* **Vercel (Deployment)**

---

## 📂 Project Structure

```
secretSantaProject/
│
├── public/
├── src/
│   ├── components/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/yourusername/secret-santa-app.git
cd secret-santa-app
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 📱 Responsive Design

The application is optimized for:

* Desktop browsers
* Tablets
* Mobile devices

Tested using Chrome DevTools device simulation.

---

## 🧠 How It Works

1. Enter participant names manually or upload an Excel file.
2. Click “Generate Pairs”.
3. The app randomly assigns each participant a receiver.
4. Download the results as an Excel file.

---

## 📦 Deployment

This project is deployed using **Vercel**.

Every push to the `main` branch triggers automatic deployment.

---

## 🔮 Future Improvements

* Prevent duplicate participant names
* Add constraints (e.g., avoid assigning specific people to each other)
* Add email sending functionality
* Add authentication for private groups
* Store data using backend (Firebase / Supabase)

---



