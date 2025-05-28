const express = require('express');
const bodyParser =require('body-parser');
const app = express();
const http = require('http');
const mysql = require('mysql2');
const { default: mongoose } = require('mongoose');
const session = require('express-session');
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(express.json());
app.use(session({"secret": "athina"}));
app.use(express.static('views'));
app.use(bodyParser.json());


const _Port =1000;
const server = http.createServer(app);
require('dotenv').config();
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
});

let Schedule = require('./models/schedule');
const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.1rslh5n.mongodb.net/${process.env.MONGO_DB}`;
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB error:', err));

const db = pool.promise();

function getEmail(req){
    return req.session.email ? req.session.email : '' ;
};


server.listen(_Port, () => {
    console.log("Server is running on http://localhost:"+_Port);
});


app.get('/', (req, res) => {
    res.render('./pages/main');    
});

app.get('/login', (req, res) => {
   res.render('./pages/login', {error: ''});    
});

app.post('/login', async (req, res) => {
    patients= [];
    query = "SELECT id, email, password FROM patient";
    try{
        const [rows] = await db.query(query);
        patients = patients.concat(rows)
    } catch (error) {
        console.error(error)
    }
    doctors=[];
    query = "SELECT id, email, password FROM doc";
    try{
        const [rows] = await db.query(query);
        doctors = doctors.concat(rows)
    } catch (error) {
        console.error(error)
    }
    const tempAllUsers = doctors.concat(patients);
    const username = req.body.email;
    const password = req.body.password;
    const user = tempAllUsers.find(u => u.email === username);
    if (!user) {
        return res.render('./pages/login', { error: 'User does not exist' });
    }
    if (user.password !== password) {
        return res.render('./pages/login', { error: 'Incorrect password' });
    }
    // Successful login - Redirect based on role
    if (doctors.some(doc => doc.email === username)) {
        req.session.email = username;
        return res.redirect('/doctor');
    } else {
        req.session.email = username;
        return res.redirect('/home');
    }
});

app.post('/register', async (req, res) => {
    const querySelect = 'SELECT * FROM patient WHERE email = ?';
    const queryInsert = 'INSERT INTO patient (full_name, email, password, telephone) VALUES (?, ?, ?, ?)';
  
    const { fullName, email, password, telephone } = req.body;
  
    try {
      // 1. Check if user exists
      const [patients] = await db.query(querySelect, [email]);
  
      if (patients.length > 0) {
        // User already exists
        return res.render('./pages/login', { error: "User already exists" }); // Note: Don't include '/' in view name
      }
  
      // 2. Insert new user
      await db.query(queryInsert, [fullName, email, password, telephone]);
  
      // 3. Redirect to login page
      res.redirect('/login');
  
    } catch (err) {
      console.error('Registration Error:', err);
      res.status(500).send('Server error. Please try again.');
    }
  });


app.get('/home', async (req, res) => {
    query = 'SELECT id FROM patient WHERE email= "'+getEmail(req)+'";';
    let [row] = await db.query(query);
    let patient_id = row[0]['id'];
    query = 'SELECT * FROM doc';
    let [docs] = await db.query(query);
    query = 'SELECT * FROM booking WHERE patient_id= "'+patient_id+'";';
    let [rows] = await db.query(query);
    const mergedAppointments = rows.map(app => {
        const doctor = docs.find(doc => doc.id === app.doc_id);
        return {
          ...app,
          doctor: doctor ? {
            id: doctor.id,
            full_name: doctor.full_name,
            email: doctor.email,
            location: doctor.location
          } : null
        };
      });
    res.render('./pages/home', {"email": getEmail(req), "appointments": mergedAppointments});  
});



app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});


var answers;

app.get('/book', async (req, res) => {
    let docs = [];
    const schedules = await Schedule.find();

    if (answers){
        group1 = answers.slice(0,5)
        group2 = answers.slice(5,10)
        group3 = answers.slice(10,15)
        group4 = answers.slice(15,20)
        
        let group1Counter = 0
        for (let i=0; i<=group1.length;i++){
            if (group1[i]=='yes'){
                group1Counter++;
            }
        }
        if (group1Counter >= 4){
            let query = 'SELECT * FROM doc WHERE speciality="Insomnia"; '
            try{
                const [rows] = await db.query(query);
                docs = docs.concat(rows)
            } catch (error) {
                console.error(error)
            }
        }
        group2Counter = 0
        for (let i=0; i<=group2.length;i++){
            if (group2[i]=='yes'){
                group2Counter++;
            }    
        }
        if (group2Counter >= 4){
            let query = 'SELECT * FROM doc WHERE speciality="Stress"; '
            try{
                const [rows] = await db.query(query);
                docs = docs.concat(rows)
            } catch (error) {
                console.error(error)
            }
        }
        group3Counter = 0
        for (let i=0; i<=group3.length;i++){
            if (group3[i]=='yes'){
                group3Counter++;
            }
        }
        if (group3Counter >= 4){
            let query = 'SELECT * FROM doc WHERE speciality="Anxiety"; '
            try{
                const [rows] = await db.query(query);
                docs = docs.concat(rows)
            } catch (error) {
                console.error(error)
            }
        }
        group4Counter = 0
        for (let i=0; i<=group4.length;i++){
            if (group4[i]=='yes'){
                group4Counter++;
            }
        }
        if (group4Counter >= 4){
            let query = 'SELECT * FROM doc WHERE speciality="Emotional Damage"; '
            try{
                const [rows] = await db.query(query);
                docs = docs.concat(rows);
            } catch (error) {
                console.error(error);
            }
        }
    } else {
        let query = 'Select * from doc';
        try {
            const [rows] = await db.query(query);
            docs = rows;
        } catch (error) {
            console.error(error);
        }
    }
    

    absence = []
    try{
        query = 'SELECT * FROM absence;'
        const [rows] = await db.query(query);
        absence = absence.concat(rows);
    } catch (error){
        console.error(error);
    }
    books = []
    try{
        query = 'SELECT * FROM booking;'
        const [rows] = await db.query(query);
        books = books.concat(rows);        
    } catch (error){
        console.error(error);
    }
    console.log(schedules);
    console.log(schedules[0]);
    res.render('./pages/book', {'doctors':docs, schedules, absence, books, 'email': getEmail(req)} );    
});

app.post('/book', async (req, res) => {
    // create a row in booking table
    const {appointmentDoctor, appointmentDate, selectedTime} = req.body;
    query = 'SELECT id FROM patient WHERE email= "'+getEmail(req)+'";';
    let [row] = await db.query(query);
    query = 'INSERT INTO booking (doc_id, patient_id, on_date, on_time) VALUES (?,?,?,?)';

    db.query(query, [appointmentDoctor, row[0]['id'], appointmentDate, selectedTime], (err, result) => { // change '1' with the user's id from the session
        if (err) {
            console.error('Insert Error:', err);
            return res.status(500).json({ message: 'Error saving booking' });
        }
        res.json({ message: 'Booking saved successfully!' });
    });        
    res.redirect('/home');
})

app.get('/test', (req, res) => {
    res.render('./pages/test', {"email": getEmail(req)}); 
});

app.post('/test', (req,res) => {
    answers = req.body.answers;
    res.render('./pages/test', {"email": getEmail(req)});
})

// app.get('/profile', (req, res) => {
//     res.render('./pages/profile', {"email": getEmail(req)}); 
// });

app.get('/profile', async (req, res) => {
  const email = getEmail(req);

  const [rows] = await db.execute('SELECT full_name, email, telephone FROM patient WHERE email = ?', [email]);

  if (rows.length === 0) return res.status(404).send('Patient not found');

  res.render('./pages/profile', { patient: rows[0] });
});

app.post('/update_patient', async (req, res) => {
  const { field, value } = req.body;
  const email = getEmail(req); // Use session/cookie for current user

  const allowed = ['full_name', 'email', 'telephone'];
  if (!allowed.includes(field)) {
    return res.status(400).json({ error: 'Invalid field' });
  }

  try {
    const query = `UPDATE patient SET ${field} = ? WHERE email = ?`;
    await db.execute(query, [value, email]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating patient:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/doctor', async (req, res) => {
  try {
    const doctorEmail = getEmail(req);
    const today = new Date().toISOString().split('T')[0]; // e.g., "2025-05-22"

    // First get the logged-in doctor's ID using their email
    const [doctorRows] = await db.execute(
      'SELECT id FROM doc WHERE email = ?',
      [doctorEmail]
    );

    if (doctorRows.length === 0) {
      return res.status(404).send('Doctor not found');
    }

    const doctorId = doctorRows[0].id;

    // Now get today's appointments for this doctor
    const [appointments] = await db.execute(`
      SELECT booking.on_time, patient.full_name AS patient_name
      FROM booking
      JOIN patient ON booking.patient_id = patient.id
      WHERE booking.doc_id = ? AND booking.on_date = ?
      ORDER BY booking.on_time
    `, [doctorId, today]);

    res.render('./pages/doctor', {
      email: doctorEmail,
      appointments: appointments
    });

  } catch (err) {
    console.error('Error loading doctor dashboard:', err);
    res.status(500).send('Server error');
  }
});


app.get('/schedule', (req, res) => {
    res.render('./pages/schedule', {"email": getEmail(req), submitted: false}); 
});

app.post('/submit_absence', async (req, res) => {
  const { from_date, to_date } = req.body;
  const email = getEmail(req);

  try {
    // Get doctor ID
    const [doctorRows] = await db.execute('SELECT id FROM doc WHERE email = ?', [email]);
    if (!doctorRows.length) return res.status(404).send('Doctor not found');
    const doctorId = doctorRows[0].id;

    // Insert into absence table
    await db.execute(
      'INSERT INTO absence (doc_id, from_date, to_date) VALUES (?, ?, ?)',
      [doctorId, from_date, to_date]
    );

    res.render('./pages/schedule', { submitted: true });

  } catch (err) {
    console.error('Error submitting absence:', err);
    res.status(500).send('Error saving absence');
  }
});


app.get('/doctor_profile', async (req, res) => {
  try {
    const email = getEmail(req); // this gets the logged-in doctor's email

    const [rows] = await db.execute('SELECT * FROM doc WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).send('Doctor not found');
    }

    const doctor = rows[0];

    res.render('./pages/doctor_profile', { doctor });

  } catch (err) {
    console.error('Error loading doctor profile:', err);
    res.status(500).send('Server Error');
  }
});

app.post('/update_doctor', async (req, res) => {
  const email = getEmail(req);
  const { field, value } = req.body;

  const allowed = ['full_name', 'telephone', 'location', 'speciality', 'password'];
  if (!allowed.includes(field)) {
    return res.status(400).json({ error: 'Invalid field' });
  }

  const query = `UPDATE doc SET ${field} = ? WHERE email = ?`;
  await db.execute(query, [value, email]);

  res.json({ success: true });
});

app.get('/about', (req,res) => {
    res.render('./pages/about');
});

app.get('/services', (req,res) => {
    res.render('./pages/services');
})