const express=require('express')
const app=express()
const appError=require('./utility/appError')
const appErrorController=require('./controller/appError')
const schoolRout=require('./router/school')
const classRout=require('./router/class')

app.use(express.json())

app.use('/api/v1/school',schoolRout)
app.use('/api/v1/class',classRout)

app.all("*", function (req, res, next) {
  next(new appError("Bunday page mavjud emas", 404));
});

app.use(appErrorController);

module.exports=app