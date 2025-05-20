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
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'doctor',
});
let Schedule = require('./models/schedule');
let password = 'athinalatifi51';
mongoose.connect('mongodb+srv://'+password+':'+password+'@cluster0.1rslh5n.mongodb.net/'+ 'doctor')

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
            email: doctor.email
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

app.get('/profile', (req, res) => {
    res.render('./pages/profile', {"email": getEmail(req)}); 
});

app.get('/doctor', async (req, res) => {
    const data = await Schedule.find();
    console.log(data)
    res.render('./pages/doctor', {"email": getEmail(req)}); 
});

app.get('/schedule', (req, res) => {
    res.render('./pages/schedule', {"email": getEmail(req)}); 
});

app.get('/doctor_profile', (req, res) => { 
    res.render('./pages/doctor_profile', {"email": getEmail(req)}); 
});

/*
1. npm install express-session
2. app.use(session({[secretKey]}))
3. after login add req.session.userId = user.id !CHANGE IT ACCORDINGLY
4. check line 158 and add user's id from the session to create booking record in the database 
*/