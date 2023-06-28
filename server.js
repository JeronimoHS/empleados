const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

//conexion con base de mongo

mongoose
    //.connect('mongodb://127.0.0.1:27017/empleadosds01sv22')
    .connect('mongodb+srv://jeronimohsti18:Beccaym3@ds01.g7fnw46.mongodb.net/empleadosds01sv22?retryWrites=true&w=majority')
    .then((x)=>{
        console.log(`conectado exitosamente a BD: `)
    })
    .catch((err)=>{
        console.log('error al conectarse',err)
    })


//conf serv web

const empleadoRuta = require ('./routes/empleado.route')
const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
)
app.use(cors())
app.use(express.static(path.join(__dirname,'dist/empleas-mean')))
app.use('/',express.static(path.join(__dirname,'dist/empleas-mean')))
app.use('/api',empleadoRuta)

//habilitar puerto

const port = process.env.PORT || 4000
const server = app.listen(port,()=> {
    console.log('conectado existosamente al puerto')
})

//manejador de err 404
app.use((req,res,next)=>{
    next(createError(404))
})

//manejador de errores
app.use(function(err,req,res,next){
    console.error(err.message)
    if(!err.statusCode) err.statusCode =500
    res.status(err.statusCode).send(err.message)
    
})