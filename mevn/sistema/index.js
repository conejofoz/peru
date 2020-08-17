const express = require('express')
const app=express();

const PORT = 4000
app.set('port',process.env.PORT || 3000)
app.listen(app.get('port'),()=>{
    console.log('Server on port ' + app.get('port'))
})