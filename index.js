
const primeGenerator = require('./primeGenerator');
const express = require('express');
var bodyParser=require("body-parser");
const port = ('3000');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.render('pages/index')
  });



    app.post("/",function(req,res){
      var Number1=req.body.Number1;
      var Number2=req.body.Number2;
      console.log(Number1);
      console.log(Number2);
      primeGenerator.primeGenerator(Number1,Number2);
      res.render('pages/result');

  });



app.listen(port, () => {
  console.log(`App listening at port ${port}`)
});