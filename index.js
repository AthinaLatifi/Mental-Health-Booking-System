const express = require('express');
const bodyParser =require('body-parser');
const app = express();
const http = require('http');
const mysql = require('mysql2');
const { default: mongoose } = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.static('views'));
app.use(bodyParser.json())
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

server.listen(_Port, () => {
    console.log("Server is running on http://localhost:"+_Port);
});


app.get('/', (req, res) => {
    res.render('./pages/main');    
});

app.get('/login', (req, res) => {
    res.render('./pages/login');    
});



app.get('/home', (req, res) => {
    res.render('./pages/home'); 
});

var answers;

app.get('/book', async (req, res) => {
    //
    let docs = [];
    const schedules = await Schedule.find();
    // console.log("Test: "+answers)
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
            docs = docs.concat(rows)
        } catch (error) {
            console.error(error)
        }
    }
    console.log(docs);
    // console.log('Group1: '+ group1Counter)
    // console.log('Group2: '+ group2Counter)
    // console.log('Group3: '+ group3Counter)
    // console.log('Group4: '+ group4Counter)
    res.render('./pages/book', {'doctors':docs, 'schedules':schedules});    
});

app.get('/book_doctor/', (req, res) =>{
    res.redirect('/book_time/?appointmentDoctor='+req.query.appointmentDoctor) ;
});
app.get('/book_time/' , (req,res) => {
    res.render('./pages/time');
});

app.get('/test', (req, res) => {
    res.render('./pages/test'); 
});

app.post('/test', (req,res) => {
    answers = req.body.answers;
    res.render('./pages/test');
})

app.get('/profile', (req, res) => {
    res.render('./pages/profile'); 
});

app.get('/doctor', async (req, res) => {
    const data = await Schedule.find();
    console.log(data)
    res.render('./pages/doctor'); 
});

app.get('/schedule', (req, res) => {
    res.render('./pages/schedule'); 
});

app.get('/doctor_profile', (req, res) => {
    res.render('./pages/doctor_profile'); 
});