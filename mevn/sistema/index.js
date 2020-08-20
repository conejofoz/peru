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

app.set('port',process.env.PORT || 3000)
app.listen(app.get('port'),()=>{
    console.log('Server on port ' + app.get('port'))
    //descobrir a pasta public
    //console.log("pasta" + __dirname + '\\public')
    console.log(path.join(__dirname, 'public'))
})