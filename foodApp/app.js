const express = require("express");
const app = express();
const cookieParser=require('cookie-parser');
//middleware func-> post, front-> json
app.use(express.json()); //global middleware 
app.listen(3000);
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
//base route , router to use
app.use("/user", userRouter);
app.use("/plans", planRouter);
// app.use("/auth", authRouter);




