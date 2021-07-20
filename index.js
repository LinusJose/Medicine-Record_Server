const express = require('express');
const app = express();
 const session = require('express-session'); 
 const dataService = require('./services/data.services') ;
 const cors = require('cors');
 app.use(express.json());
app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
})); 

app.use(cors({
 
   origin:'http://localhost:4200',  
   credentials:true  
 }))

app.get('/',(req,res)=>{
    res.send("THIS IS A GET METHOD")
})


//POST - register
app.post('/register',(req,res)=>{
     console.log(req.body)
     dataService.register(req.body.email,req.body.username,req.body.password)
     .then(result=>{
         res.status(result.statusCode).json(result)
     })
    });
 //POST - login
    app.post('/login',(req,res)=>{
      console.log(req.body)
    dataService.login(req,req.body.email,req.body.password)
    .then(result=>{
      res.status(result.statusCode).json(result)
    })
     });

      //POST - adddata
    app.post('/addData',(req,res)=>{
        console.log(req.body)
      dataService.addData(req,req.body.email,req.body.medicine,req.body.quantity)
      .then(result=>{
        res.status(result.statusCode).json(result)
      })
       });

     

app.listen(8080,()=>{
    console.log("server started at port : 8080");
})