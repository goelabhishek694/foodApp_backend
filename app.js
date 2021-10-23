const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors()) ;
app.use(express.static('public/build'));

const cookieParser=require('cookie-parser');
//middleware func-> post, front-> json
app.use(express.json()); //global middleware 
const port=process.env.PORT || 5000;
app.listen(port,function(){
    console.log(`server listening on port ${port}`); 
});
app.use(cookieParser());


//mini app
const userRouter = require('./Routers/userRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
const bookingRouter=require('./Routers/bookingRouter');
//base route , router to use
app.use("/user", userRouter);
app.use("/plans", planRouter);
app.use("/review", reviewRouter);
app.use('/booking',bookingRouter);
// app.use("/auth", authRouter);




