const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  // console.log('getUser called');
  let id = req.id;
  console.log(id);
  console.log(req.id);
  let user = await userModel.findById(id);
  if (user) {
    return res.json(user);
  } else {
    return res.json({
      message: "user not found",
    });
  }
};

module.exports.updateUser = async function updateUser(req, res) {
  console.log("req.body-> ", req.body);
  //update data in users obj
  try {
    let id = req.params.id;
    console.log(id);
    let user = await userModel.findById(id);
    console.log(user);
    let dataToBeUpdated = req.body;
    if (user) {
      console.log('inside user');
      const keys = [];
      for (let key in dataToBeUpdated) {
        console.log(key);
        keys.push(key);
      }

      for (let i = 0; i < keys.length; i++) {
        console.log(keys[i]);
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      console.log(user);
      user.confirmPassword=user.password;
      const updatedData = await user.save();
      console.log(updatedData);
      res.json({
        message: "data updated successfully",
        data: updatedData,
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  // users = {};
  try{
  let id=req.params.id;
  let user = await userModel.findByIdAndDelete(id);
  if(!user){
    res.json({
      message:'user not found'
    })
  }
  res.json({
    message: "data has been deleted",
    data: user,
  });
}
catch(err){
  res.json({
    message:err.message
  });
}
};

module.exports.getAllUser = async function getAllUser(req, res) {
  try{
  let users=await userModel.find();
  if(users){
    res.json({
      message:'users retrieved',
      data:users
    });
  }
}
catch(err){
  res.json({message:err.message})
}
};


module.exports.updateProfileImage=function updateProfileImage(req,res){
  res.json({
    message:'file uploaded succesfully'
  });
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
