const app=require('./app')
require('dotenv').config({path:'./config.env'})

app.listen(process.env.PORT,()=>{
  console.log(`${process.env.PORT} port sizni tingladi !`)
})