const express = require("express");
const userRouter = express.Router();
// const protectRoute=require('./authHelper');
const {getUser,getAllUser,updateUser,deleteUser}=require('../controller/userController');
const{signup,login,isAuthorised,protectRoute,forgetpassword,resetpassword}=require('../controller/authController');

// user ke options 
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)

userRouter
.route('/forgetpassword')
.post(forgetpassword)

userRouter
.route('/resetpassword/:token')
.post(resetpassword)

//profile page 
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

// admin specific func
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllUser)




module.exports=userRouter;