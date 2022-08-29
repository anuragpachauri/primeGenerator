const primeGenerator = require('./primeGenerator');
const express = require('express');
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const url = 'mongodb+srv://user:Password123@cluster0.mwkqki5.mongodb.net/?retryWrites=true&w=majority';


const port = ('3000');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
mongoose.connect(url, {useNewUrlParser: true, 
  useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Schema = mongoose.Schema;


const PrimeGeneratorSchema = new Schema({
  Number1: Number,
  Number2: Number,
  Primes: Object
});

const PrimeGenerator = mongoose.model('PrimeGenerator', PrimeGeneratorSchema);



app.get('/', (req, res) => {
    res.render('pages/index')
  });



    app.post("/",function(req,res){
      var Number1=req.body.Number1;
      var Number2=req.body.Number2;
      const primeNumbers=primeGenerator.primeGenerator(Number1,Number2);
      res.send(primeNumbers);
      var NewOne = new PrimeGenerator({ Number1: Number1, Number2: Number2, Primes: primeNumbers  });
      NewOne.save(function (err, book) {
        if (err) return console.error(err);
        console.log(" Saved.");
      });
  });



app.listen(port, () => {
  console.log(`App listening at port ${port}`)
});