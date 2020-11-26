// =================
//     PORT
// =================

process.env.PORT = process.env.PORT || 3000;

// =================
//     ENTORNO
// =================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =================
//     caducidad
// =================

process.env.CADUCIDAD_TOKEN =  60 * 60 * 24 * 30;

// =================
//     seed auth
// =================

process.env.SEED_AUTH = process.env.SEED_AUTH || 'este-es-el-seed-desarrollo';



// =================
//     DB
// =================

let urlDB;

if(process.env.NODE_ENV === 'dev')
{
    urlDB = 'mongodb://127.0.0.1:27017/cafe';
}else{
    urlDB = process.env.MONGO_URI;
}

process.env.URL_DB = urlDB;



