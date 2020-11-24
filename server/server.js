// requere
require('./config/config');
const express  = require('express');
const mongoose = require('mongoose');
const app = express();

// midleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(require('./routes/usuario'));

mongoose.connect('mongodb://127.0.0.1:27017/cafe',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) =>{
    if(err) throw err;
    console.log('Base de datos ONLINE!')
});

app.listen(process.env.PORT, () => console.log('Escuchando puerto: ',process.env.PORT));