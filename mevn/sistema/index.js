//ECMA5
/* 
const express = require('express')
const morgan = require('morgan')
const cors = require('cors') 
*/
//PARA ECMA6
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import router from './routes' //tem um index.js que importa todas as rotas


/* Conexão com o banco de dados mongoDB */
mongoose.Promise=global.Promise;
const dbUrl = 'mongodb://localhost:27017/dbsistema'
mongoose.connect(dbUrl, {useCreateIndex:true, useNewUrlParser:true})
    .then(mongoose => console.log('Conectado no banco de dados na porta 27017'))
    .catch(err => console.log(err))


const app=express();
app.use(morgan('dev'))
//app.use(cors)
/* 
O cors precisa estar dentro de um middleware, isso o professor não menciona no curso
aprendi com Cesar da Celke
*/
app.use((req,res, next)=>{
    app.use(cors())
    next()
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.use('/api',router)
app.set('port',process.env.PORT || 7000)

app.listen(app.get('port'),()=>{
    console.log('Server on port ' + app.get('port'))
    //descobrir a pasta public
    //console.log("pasta" + __dirname + '\\public')
    console.log(path.join(__dirname, 'public'))
})