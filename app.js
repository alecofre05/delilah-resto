const expressLib = require("express");
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api.router')
const myApp = expressLib()
const config = require('./config')
const db = require('./models/index')


myApp.use(bodyParser.json())

myApp.use((req, res, next) => {
    console.log('Ruta accedida: ' + req.path)
    next()
})

myApp.use('/api', apiRouter)

db.init()
.then(async () => {
    //Como he logrado conectarme a mi base de datos, entonces ejecuto la funcion sync para CREAR LAS TABLAS en la DB
    await db.sequelize.sync({ force: false}).then(() =>{
        console.log('Sincronizacion correcta con DROP');
    });

    //Como la conexion con DB fue exitosa y pude sincronizar las tablas, entonces inicio mi App
    myApp.listen(config.port, () => {
        console.log(`myApp is running at http://localhost:${config.port}`)   
    });
})
.catch((err) => {
    console.log('No se pudo conectar la DB debido a: ' + err);
})



