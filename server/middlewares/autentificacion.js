const jwt =  require('jsonwebtoken');


let verificaToken = (req,res,next) =>{
    
    let token = req.get('token');
    
    jwt.verify(token,process.env.SEED_AUTH, (err,decoded) =>{
        if(err){
            return res.status(401).json({
                ok: false,
                err:{
                    message: 'Token no valido'
                }
            })
        }
     req.usuario = decoded.usuario;
     next();
    })
};

let verificarRol = (req,res,next) =>{

    let usuario =  req.usuario;

    if(usuario.role === 'ADMIN_ROLE'){
        next();
    }else{
        res.status(401).json({
            ok: false,
            err:{
                message: 'Este usuario no es un Administrador'
            }
        })
    }
}

module.exports = {
    verificaToken,
    verificarRol
};