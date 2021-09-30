const express = require("express");
const userRouter = express.Router();
// const protectRoute=require('./authHelper');
const {getUser,getAllUser,updateUser,deleteUser}=require('../controller/userController');
const{signup,login,protectRoute,isAuthorised,resetpassword,forgetpassword}=require('../controller/authController');
// user ke options 
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

//profile page 
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

userRouter
.route('/signup')
.post(signup);

userRouter
.route('/login')
.post(login)


userRouter
.route('/forgetpassword')
.post(forgetpassword)


userRouter
.route('/resetpassword/:token')
.post(resetpassword)

//admin specific func
app.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUser)




module.exports=userRouter;