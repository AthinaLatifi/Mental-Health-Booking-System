# 🧠 Mental Health Booking

**Mental Health Booking** is a web application that helps users book appointments with psychologists. It uses a mental health assessment test to match patients with the best-suited psychologist, reducing the frustration of switching providers.

---

## 🚀 Features

- Secure login and registration for patients
- Secure login for psychologists
- Mental health assessment test for matchmaking
- Patient dashboard:
  - View and book appointments
  - Take assessment test
  - Update profile
- Psychologist dashboard:
  - View appointments
  - Set absences (unavailable time slots)
  - Update profile

---

## 🛠 Technologies Used

- JavaScript (Node.js)
- Express.js
- EJS (templating)
- MongoDB (via Mongoose)
- MySQL (via Sequelize and mysql2)
- dotenv for environment variable management

---

## 📦 Installation Instructions

### 1. Clone the repository

```bash
git clone https://github.com/AthinaLatifi/mental-health-booking.git
cd mental-health-booking
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root folder of the project with the following content:

```env
# MongoDB
MONGO_USER=yourMongoUsername
MONGO_PASS=yourMongoPassword
MONGO_DB=doctor

# MySQL
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASS=
MYSQL_DB=doctor
```

### 4. Start the application

```bash
nodemon index.js
```

Make sure your local MongoDB and MySQL databases are running.

---

## 🧪 Usage

1. Go to the home page and click **"GET STARTED"**.
2. Register or log in:
   - **Patients** can:
     - Take the mental health test
     - Book/view appointments
     - Edit their profile
   - **Psychologists** can:
     - Log in
     - View appointments
     - Mark absences
     - Edit profile

---

## 📂 Project Structure (Simplified)

```
mental-health-booking/
├── models/
│   └── schedule.js
├── views/
│   └── *.ejs
├── index.js
├── .env         # <- your environment variables
├── package.json
└── README.md
```

---

## 🛡 Security

- Environment variables handled with `dotenv`
- Sessions managed with `express-session`
- Sensitive data is not hardcoded

---

## 📝 License

This project is licensed under the **ISC License**.

---

## 🙋‍♀️ Contributions

Not accepting external contributions at the moment. Check back soon!
