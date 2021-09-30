const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  // console.log('getUser called');
  let id = req.params.id;
  let user = await userModel.findById(id);
  if (user) {
    return res.json(users);
  } else {
    return res.json({
      message: "user not found",
    });
  }
};

// module.exports.postUser=function postUser(req, res) {
//     console.log(req.body);
//     users = req.body;
//     res.json({
//       message: "data received successfully",
//       user: req.body,
//     });
//   }

module.exports.updateUser = async function updateUser(req, res) {
  // console.log("req.body-> ", req.body);
  //update data in users obj
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }

      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      const updatedData = await user.save();
      res.json({
        message: "data updated successfully",
        data: user,
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
  res.send("user id received");
};

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
