const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors()) ;
const cookieParser=require('cookie-parser');
//middleware func-> post, front-> json
app.use(express.json()); //global middleware 
app.listen(5000,function(){
    console.log("server listening on port 5000"); 
});
app.use(cookieParser());
// let users = [
//   {
//     id: 1,
//     name: "Abhishek",
//   },
//   {
//     id: 2,
//     name: "Jasbir",
//   },
//   {
//     id: 3,
//     name: "Kartik",
//   },
// ];
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




