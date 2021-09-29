const userModel=require('../models/userModel');

module.exports.getUsers=async function getUsers(req,res){
    // console.log('getUser called');
    let users=await userModel.find();
    if(users){
        return res.json(users); 
    }
    else{
        return res.json({
            message:'users not found'
        });
    }
}

module.exports.postUser=function postUser(req, res) {
    console.log(req.body);
    users = req.body;
    res.json({
      message: "data received successfully",
      user: req.body,
    });
  }
  
  module.exports.updateUser=async function updateUser(req, res) {
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
  
  module.exports.deleteUser=async function deleteUser(req, res) {
    // users = {};
    let dataToBeDeleted=req.body;
    let user=await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
      message: "data has been deleted",
      data:user
    });
  }
  
  module.exports.getUserById=function getUserById(req, res) {
    console.log(req.params.username);
      console.log(req.params);
      res.send("user id received");
  }

//   function setCookies(req,res){
//     // res.setHeader('Set-Cookie','isLoggedIn=true');
//     res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure:true, httpOnly:true});
//     res.cookie('isPrimeMember',true);
//     res.send('cookies has been set ');
//   }
  
//   function getCookies(req,res){
//     let cookies=req.cookies.isLoggedIn;
//     console.log(cookies);
//     res.send('cookies received');
//   }
