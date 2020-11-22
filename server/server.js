// requere
require('./config/config');
const express =  require('express');
const app = express();

// midleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/usuario',(req,res) =>{
    res.json('get Usuario');
})
app.post('/usuario',(req,res) =>{
    let body = req.body;

    if(body.nombre === undefined)
    {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es requerido'
        }); 
    }else{
        res.json({
          persona: body
        });
    }
})
app.put('/usuario',(req,res) =>{
    res.json('puth Usario');
})
app.delete('/usuario/:id',(req,res) =>{
    let id =  req.params.id
    res.json({
        id
    })
})

app.listen(process.env.PORT, () => console.log('Escuchando puerto: ',process.env.PORT));