// requere
require('./config/config');
const express  = require('express');
const mongoose = require('mongoose');
const app = express();

// midleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes globales
app.use(require('./routes/index'));

mongoose.connect(process.env.URL_DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) =>{
    if(err) throw err;
    console.log('Base de datos ONLINE!')
});

app.listen(process.env.PORT, () => console.log('Escuchando puerto: ',process.env.PORT));