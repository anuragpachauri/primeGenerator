
const primeGenerator = require('./primeGenerator');   
const express = require('express');
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
// importing the required modules. 

const url = 'mongodb+srv://user:Password123@cluster0.mwkqki5.mongodb.net/?retryWrites=true&w=majority';  //mongoDB connecting URL
const port = ('3000'); // Local host port Number.
const app = express(); 

app.use(bodyParser.urlencoded({ extended: false })); //extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). 
app.set('view engine', 'ejs');  //allow us to render web pages using template files.
mongoose.connect(url, {useNewUrlParser: true, 
  useUnifiedTopology: true}); // connect to mongodb server


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); // logging any error in connecting mongodb
const Schema = mongoose.Schema; 


const PrimeGeneratorSchema = new Schema({
  rangeNumber1: Number,
  rangeNumber2: Number,
  Primes: Object
},{ timestamps: true }); // define structure of Schema

const PrimeGenerator = mongoose.model('PrimeGenerator', PrimeGeneratorSchema); // database



app.get('/', (req, res) => {
    res.render('pages/index')
  }); // rendering the index page using EJS



    app.post("/",function(req,res){
      var Number1=req.body.Number1;
      var Number2=req.body.Number2;// to catch the form data from the index html page and Saving it to the Variables.
      const primeNumbers=primeGenerator.primeGenerator(Number1,Number2); // calling primeGenerator function.
      res.send(primeNumbers);// rendering the result JSON to the User.

      var NewOne = new PrimeGenerator({ rangeNumber1: Number1, rangeNumber2: Number2 ,Primes: primeNumbers  }); // creating JSON String.
      NewOne.save(function (err, book) {
        if (err) return console.error(err);
        console.log(" Saved.");
      }); //Saving data to the mongodb server
  });



app.listen(port, () => {
  console.log(`App listening at port ${port}`)
}); // starting localHost Server for Testing.