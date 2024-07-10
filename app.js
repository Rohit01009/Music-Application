import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
const app=express();
const port= 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/mini-project");

const loginSchema={
    email: String,
    password: String,
    gender: String,
    country: String
};
const songSchema={
    title:String
};

const requestSchema={
    name:String,
    number:Number,
    rating:Number,
    request:String
};

const Song = mongoose.model("Song",songSchema);
const Req = mongoose.model("Req",requestSchema);
const login = mongoose.model("login",loginSchema);
const acc1 = new login({
    email: "anuj@gmail.com",
    password: "anuj",
    gender: "male",
    country: "India"
});
const acc2 = new login({
    email: "abhishekj@gmail.com",
    password: "abhishek",
    gender: "male",
    country: "India"
});
const login_data= [acc1,acc2];
const song_data = [
    { title: 'kyo kisi ko' },
    { title: 'chaleya' },
    { title: 'baatein yeh kabhi na' },
    { title: 'get ready to fight' },
    { title: 'desi kalastar' },
    { title: 'mai agar kahoon' },
    { title: 'mi amor' },
    { title: 'lovedose' },
    { title: 'faltu' },
    { title: 'dope shope' },
    { title: 'kya loge tum' },
    { title: 'tinku jiya' },
    { title: '3 peg' },
];

app.get('/', (req, res) => {
    login.find().then((data) => {
      if (data.length === 0) {
        login.insertMany(login_data)
          .then(() => {
            console.log('Yaaaaaaahhhhhhhhhhhhhhhhh!');
          })
          .catch((err) => {
            console.log(err);
          });
  
        Song.insertMany(song_data)
          .then(() => {
            console.log('Yaaaahhhhhhhhoooooooooooo!');
          })
          .catch((err) => {
            console.log(err);
          });
      }
      res.render('login');
    });
});

app.post('/login', (req,res)=>{
    const newId= new login({
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        country: req.body.country
    })
    newId.save();
    console.log("+1");
    res.redirect('/');
});

app.post('/welcome',async function(req,res){
    try{
        const user= await login.findOne({ email: req.body.email});
    if(user){
        const result= req.body.password === user.password;
        const error = "INVALID!!";
        if(result){
            res.render('welcome');
        }else{
            res.render('login'); 
        }
    }else{
        res.render('login'); 
    }
    }catch(error){
        console.log("Error in:",error);
    }
});

app.post('/request', (req,res)=>{
    const newreq= new Req({
        name: req.body.name,
        number: req.body.number,
        rating: req.body.rating,
        request: req.body.request
    })
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'a88656342@gmail.com',
          pass: 'lsew czzj pyos wbjn',
        },
      });
    
      const mailOptions = {
        from: 'a88656342@gmail.com',
        to: 'anuj.choudhary.2711@gmail.com',
        subject: 'Request from PAA Musics',
        html: `<p>Name: ${req.body.name}</p><p>Number: ${req.body.number}</p><p>Rating: ${req.body.rating}</p><p>Request: ${req.body.request}</p>`,
      };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
      
    });
    
    newreq.save();
    console.log("r++");
    res.redirect('/home');
});

app.post('/home', (req,res)=>{
    res.render('home');
});

app.get('/registration', (req,res)=>{
    res.render('registration');
});

app.get('/home', (req,res)=>{
    res.render('home');
});

app.get('/request', (req,res)=>{
    res.render('request');
});

app.get('/logout', (req,res)=>{
    res.redirect('/');
});

app.get('/saved', (req,res)=>{
    res.render('saved');
});

app.post('/search', async (req,res)=>{
    const { search } =req.body;
    const song = await Song.findOne({ title: search });

    if(song) {
        res.render('saved');
    }else{
        res.redirect(`https://www.youtube.com/results?search_query=${search}`);
    }
});

app.get('/mood', (req,res)=>{
    res.render('mood');
});

app.listen(port, ()=>{
    console.log(`NigerDayooooooooo:${port}`);
});