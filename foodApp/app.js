const express = require("express");
const app = express();
const mongoose=require('mongoose');
//middleware func-> post, front-> json
app.use(express.json()); //global middleware 
app.listen(3000);

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
const userRouter = express.Router();
const authRouter=express.Router();
//base route , router to use
app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
  .route("/")
  .get(getUsers) //path specific middleware
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp);

async function getUsers(req, res) {
  // console.log(req.query);
  // let allUsers=await userModel.find();
  let user=await userModel.findOne({name:'Abhishek'});
  res.json({message:'list of all users',
  data:allUsers});
}

function postUser(req, res) {
  console.log(req.body);
  users = req.body;
  res.json({
    message: "data received successfully",
    user: req.body,
  });
}

async function updateUser(req, res) {
  console.log("req.body-> ", req.body);
  //update data in users obj
  let dataToBeUpdated = req.body;
  let user= await userModel.findOneAndUpdate({email:'abc@gmail.com'},dataToBeUpdated);
  // for (key in dataToBeUpdated) {
  //   users[key] = dataToBeUpdated[key];
  // }
  res.json({
    message: "data updated successfully",
    data:user
  });
}

async function deleteUser(req, res) {
  // users = {};
  let dataToBeDeleted=req.body;
  let user=await userModel.findOneAndDelete(dataToBeDeleted);
  res.json({
    message: "data has been deleted",
    data:user
  });
}

function getUserById(req, res) {
  console.log(req.params.username);
    console.log(req.params);
    res.send("user id received");
}

function middleware1(req,res,next){
  console.log('middleware1 encountered');
  next();
}

function middleware2(req,res){
  console.log('middleware2 encountered');
  // next();
  console.log("middleware 2 ended req/res cycle");
  res.sendFile('/public/index.html',{root:__dirname});
}

function getSignUp(req,res,next){
  console.log('getSignUp called');
  next();
  // res.sendFile('/public/index.html',{root:__dirname});
}

async function postSignUp(req,res){
  let dataObj=req.body;
  let user=await userModel.create(dataObj);
  console.log('backend',user);
  res.json({
    message:"user signed up",
    data:user
  });
}


//mongoDB

const db_link='mongodb+srv://admin:xnDx4jlj5mmzjiVE@cluster0.3irmz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
  // console.log(db);
  console.log('db connected');
})
.catch(function(err){
  console.log(err);
});

const userSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minLength:8
  },
  confirmPassword:{
    type:String,
    required:true,
    minLength:8
  }
});

// model
const userModel=mongoose.model('userModel',userSchema);

// (async function createUser(){
//   let user={
//     name:'Jasbir',
//     email:'abcd@gmail.com',
//     password:'12345678',
//     confirmPassword:'12345678'
//   };
//   let data= await userModel.create(user);
//   console.log(data);
// })();