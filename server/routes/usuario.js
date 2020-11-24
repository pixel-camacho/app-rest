// require
const express = require('express');
const bcrypt  = require('bcrypt');
const _       = require('underscore');
const app     = express(); 
const Usuario = require('../models/usuario');

app.get('/usuario',(req,res) =>{
    res.json('get Usuario')
})

app.post('/usuario',(req,res) =>{
    let body = req.body;

    let usuario =  new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role:  body.role
    });

    usuario.save((err,usuarioDB) =>{
        if(err){
            return res.status(400).json({
                 ok: false,
                 err
             });
        }
            res.json({
                ok: true,
                usuario: usuarioDB
            });
    })
})

app.put('/usuario/:id',(req,res)=>{

    let id   = req.params.id;
    let body = _.pick(req.body,[
        'nombre',
        'email',
        'img',
        'role',
        'estado'
    ]);

    Usuario.findByIdAndUpdate(id ,body , {new:  true}, (err, usuarioDB) =>{
        if(err) {
          return  res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.delete('/usuario/:id',(req,res) =>{
    let id =  req.params.id
    res.json({
        id
    })
})


module.exports =  app;