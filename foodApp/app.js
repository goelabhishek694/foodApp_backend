const express = require("express");

const app = express();
//middleware func-> post, front-> json
app.use(express.json()); //global middleware 
app.listen(3000);

let users = [
  {
    id: 1,
    name: "Abhishek",
  },
  {
    id: 2,
    name: "Jasbir",
  },
  {
    id: 3,
    name: "Kartik",
  },
];
//mini app
const userRouter = express.Router();
const authRouter=express.Router();
//base route , router to use
app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
  .route("/")
  .get(getUser) //path specific middleware
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp);

function getUser(req, res) {
  console.log(req.query);
  res.send(users);
}

function postUser(req, res) {
  console.log(req.body);
  users = req.body;
  res.json({
    message: "data received successfully",
    user: req.body,
  });
}

function updateUser(req, res) {
  console.log("req.body-> ", req.body);
  //update data in users obj
  let dataToBeUpdated = req.body;
  for (key in dataToBeUpdated) {
    users[key] = dataToBeUpdated[key];
  }
  res.json({
    message: "data updated successfully",
  });
}

function deleteUser(req, res) {
  users = {};
  res.json({
    message: "data has been deleted",
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

function postSignUp(req,res){
  let obj=req.body;
  console.log('backend',obj);
  res.json({
    message:"user signed up",
    data:obj
  });
}
