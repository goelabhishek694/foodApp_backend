const express = require("express");
const authRouter=express.Router();
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken');
const {JWT_KEY}=require('../secrets');

module.exports.signup=async function signup(req,res){
    let dataObj=req.body;
    let user=await userModel.create(dataObj);
    // console.log('backend',user);
    res.json({
      message:"user signed up",
      data:user
    });
  }

  module.exports.login=async function login(req,res){
    try{
        let data=req.body;
        if(data.email){
            let user=await userModel.findOne({email:data.email});
            if(user){
                //bcrypt -> compare 
                if(user.password==data.password){
                    let uid=user['_id']; //uid
                    let token=jwt.sign({payload:uid},JWT_KEY);
                    res.cookie('login',token,{httpOnly:true});
                    // res.cookie('isLoggedIn',true);
                    return res.json({
                        message:'User has logged in',
                        userDetails:data
                    });
                }
                else{
                    return res.json({
                        message:'wrong credentials'
                    }) 
                }
            }
            else{
                return res.json({
                    message:'User not found'
                })
            }
        }
        else{
            return res.json({
                message:'Empty field found'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }

}

module.exports.protectRoute=async function protectRoute(req,res,next){
    try{
        let token;
        if(req.cookies.login){
            token=req.cookies.login;
        }
        if(token){
            const payload=jwt.verify(token,JWT_KEY);
            if(payload){
                const user=await userModel.findById(payload.id);
                req.role=user.role;
                req.id=user.id;
                next();
            }
            else{
                res.json({
                    message:'token is modified, please login again'
                });
            }
        }
        else{
            res.json({
                message:'please login'
            });
        }
    }
    catch(err){
        // request coming from browser or not 
        let clientType=req.get('User-Agent');
        if(clientType.includes('Mozilla')==true){
            return res.redirect('/login')
        }
        else{
            res.json({
                message:err.message
            })
        }
    }
}

module.exports.isAuthorised=function isAuthorised(roles){
    //roles is an array 
    return function(req,res,next){
        if(roles.includes(req.role)==true){
            next();
        }
        else{
            res.json({
                message:'user not allowed'
            })
        }
    }
}

module.exports.forgetpassword=async function forgetpassword(req,res){
    let{email}=req.body;
    try{
        const user=await userModel.findOne({email:email});
        if(user){
            const resetToken=user.createResetToken();
            await user.save({validateBeforeSave:false});
            let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

            //send mail to user to reset password link
        }
        else{
            res.json({
                message:'user not found'
            });
        }
    }
    catch(err){
        res.json({
            message:err.message,
            status:'cannot reset pasword'
        });
    }
}

module.exports.resetPassword=async function resetPassword(req,res){
    try{
        const token=req.params.token;
        const{password,confirmPassword}=req.body;
        const user=await userModel.findOne({resetToken:token});
        if(user){
            //resets passsowrd in db 
            user.resetPasswordHandler(password,confirmPassword);
            await user.save();
            res.status(200).json({
                message:'user password has been reset, please login again'
            });
        }
        else{
            res.status(200).json({
                message:'not valid token'
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:'some error occured'
        });
    }
}