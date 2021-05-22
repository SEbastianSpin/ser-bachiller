//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcryptjs');
const salt=bcrypt.genSaltSync(10);
const request = require('request');
const https = require('https');
require('dotenv').config();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));


const conn2 = mongoose.createConnection(process.env.DB_mongo1, {
  useNewUrlParser: true,
   useUnifiedTopology: true
});


const conn1 = mongoose.createConnection(process.env.DB_mongo2, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

conn2.on('error', console.error.bind(console, 'connection error:'));
conn2.once('open', function() {
  console.log("Connected to users");
});

conn1.on('error', console.error.bind(console, 'connection error:'));
conn1.once('open', function() {
  console.log("Connected to questions");
});

const AnswerSchema = new mongoose.Schema({
  answer: String,
  correct: Boolean
});

const QuestionSchema = new mongoose.Schema({
  materia:String,
  campo: String,
  subcampo: String,
  dificulatad: {
    type: Number,
    min: [1, 'dificulatad es un numero entre 0 y 3'],
    max: 3
  },
  question: String,
  answers: {
    type: [AnswerSchema],
    default: undefined
  },
  hint:{
    type:String,
    default: undefined}
});
var Question = conn2.model("GameQuestion", QuestionSchema);


const { Schema } = mongoose;


  const UserSchema = new Schema({
    email:  String, // String is shorthand for {type: String}
    password: String,
    city: String,
    region:String,
    name:String,
    lastname:String

  });
//  UserSchema.plugin(encrypt, { secret:process.env.SECRET, encryptedFields: ['password'] });
  //userSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey, encryptedFields: ['age'] });
  const User = conn1.model('User', UserSchema);

//
app.get("/", function(req, res) {
 Question.find({}, function(err, questions) {
   res.render("home", {
     preguntas: questions,
     respuestas: questions
   });
 });
});

app.post("/", function(req,res){

      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser= new User({
        email:req.body.username,
        password:hash

      });

  newUser.save(function(err){
   if(err){
     console.log(err);
   }else{
     console.log(newUser);
   }

  });
});



app.get("/register", function(req, res) {

 res.render("register");

});
app.get("/simulator", function(req, res) {
  Question.find({}, function(err, questions) {
    res.render("simulator", {
      preguntas: questions,
      respuestas: questions
    });
  });

});
app.get("/quien-bachiller", function(req, res) {
  Question.find({}, function(err, questions) {
    res.render("GameQuien", {
      preguntas: questions,
      respuestas: questions
    });
  });

});

app.get("/login", function(req, res) {
 res.render("login");

});

app.get("/send", function(req, res) {
 res.render("send");

});


app.post("/question", function(req, res) {
  const subject= req.body.materia;
  const size= req.body.size;
  console.log(subject);
  console.log(size);

  Question.find({materia:subject}, function(err, questions) {
    console.log(questions);
    res.render("GameQuien", {
      preguntas: questions,
      respuestas: questions
    });
  }).limit( size );

});
app.post("/login", function(req,res){
const userName= req.body.username;
const password= req.body.password;
User.findOne({email:userName},function(err,found){
if(err){
  console.log(err);
}

else if (found) {

  if(  bcrypt.compareSync(password, found.password)){
       res.render("panel");
  }
}


});
});



app.post("/register", function(req, res) {
const hash = bcrypt.hashSync(req.body.password, salt);
    request("https://ipfind.co/?ip=190.152.207.85&auth=914dd9b5-a90c-4dde-877f-9bc263191265", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        location=JSON.parse(body);
        console.log(location.city); // Show the HTML for the Google homepage.
        const newUser= new User({
          email:req.body.username,
                password:hash,
                city:location.city,
               region:location.region,
                name:req.body.realname,
                lastname:req.body.lastname

        });
        newUser.save(function(err){
            if(err){
            console.log(err);
            }else{
            console.log(newUser);
            res.render("panel");
            }

            });
      }
    });


    app.post("/register", function(req, res){
    const hash = bcrypt.hashSync(req.body.password, salt);
        request("https://ipfind.co/?ip=190.152.207.85&auth=914dd9b5-a90c-4dde-877f-9bc263191265", function (error, response, body) {
          if (!error && response.statusCode == 200) {
            location=JSON.parse(body);
            console.log(location.city); // Show the HTML for the Google homepage.
            const newUser= new User({
              email:req.body.username,
                    password:hash,
                    city:location.city,
                   region:location.region,
                    name:req.body.realname,
                    lastname:req.body.lastname

            });
            newUser.save(function(err){
                if(err){
                console.log(err);
                }else{
                console.log(newUser);
                res.render("panel");
                }

                });
          }
        });
      });
});


app.post("/send", function(req, res){


    var order= Math.floor(Math.random() * Math.floor(4));
    var newQ= new Question({
            materia:req.body.materia,
            campo:req.body.campo,
            subcampo:req.body.subcampo,
            dificulatad:req.body.dificulatad,
            question:req.body.question,
            hint:req.body.hint,
            answers: [{
              answer: req.body.right,
                correct: 1
              },
              {
                answer: req.body.answer1,
                correct: 0    },
              {
                answer: req.body.answer2,
                correct: 0
              },
              {
                answer: req.body.answer3,
                correct: 0
              }
            ]

    });

    if(order!==0){
    var tem=newQ.answers[order].answer;
    newQ.answers[order].correct=1;
    newQ.answers[order].answer=newQ.answers[0].answer;
    newQ.answers[0].answer=tem;
    newQ.answers[0].correct=0;

    }
      newQ.save(function(err){
          if(err){
          console.log(err);
          }else{
          res.render("send");
          }

          });





    });



app.listen(process.env.PORT, function() {
  console.log("Server started on port 3000");
});

// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });
