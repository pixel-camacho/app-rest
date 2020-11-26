// require
const express = require('express');
const bcrypt  = require('bcrypt');
const _       = require('underscore');

const app     = express();

const Usuario = require('../models/usuario');
const {verificaToken, verificarRol} = require('../middlewares/autentificacion');

app.get('/usuario',verificaToken,(req,res) =>{

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite =  req.query.limit || 5;
    limite = Number(limite);
    
    Usuario.find({estado: true},'nombre email  role estado google img')
           .limit(limite)
           .skip(desde)
           .exec( (err,usuarios) =>{
               if(err){
                   res.status(400).json({
                       ok:false,
                       err
                   })
               }
        Usuario.countDocuments({estado: true},(err,conteo) =>{
            res.json({
                ok: true,
                usuarios,
                conteo
            })   
        })
           })
})

app.post('/usuario', [verificaToken,verificarRol] ,(req,res) =>{

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

app.put('/usuario/:id',[verificaToken,verificarRol] ,(req,res)=>{

    let id   = req.params.id;
    let body = _.pick(req.body,['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id ,body , {new:  true, runValidators: true}, (err, usuarioDB) =>{
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

app.delete('/usuario/:id', [verificaToken,verificarRol],(req,res) =>{
    
    let id     =  req.params.id
    let estado = {
        estado:  false
    }

    Usuario.findByIdAndUpdate(id,estado,{new: true} ,(err,remove) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            usuario:remove
        })
    })
    
        // Usuario.findByIdAndRemove(id,(err,remove) =>{
        //     if(err){
        //         res.status(400).json({
        //             ok: false,
        //             err
        //         })
        //     }

        //     if(!remove){
        //         return res.status(400).json({
        //             ok: false,
        //             err: {
        //                 message: 'Usuario no encontrado'
        //             }
        //         })
        //     }

        // res.json({
        //     ok:true,
        //     usuario: remove
        // })

        // })

})


module.exports =  app;