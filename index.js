const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

dotenv.config({path:'./config.env'});

app.use('/api', require('./routes/marsupilami'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err){
        console.log('erreur')
    }
    else{
        console.log('connection reussite');
    }
});

app.use(express.static(__dirname + '/public')); 

app.listen(8000);