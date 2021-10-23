//mongoDB
const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
const db_link='mongodb+srv://admin:xnDx4jlj5mmzjiVE@cluster0.3irmz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
  // console.log(db);
  console.log('user db connected');
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
    unique:true,
    validate:function(){
      return emailValidator.validate(this.email);
    }
  },
  password:{
    type:String,
    required:true,
    minLength:8
  },
  confirmPassword:{
    type:String,
    required:true,
    minLength:8,
    validate:function(){
      return this.confirmPassword==this.password
    }
  },
  role:{
    type:String,
    enum:['admin','user','restaurantowner','deliveryboy'],
    default:'user'
  },
  profileImage:{
    type:String,
    default:'../Images/UserIcon.png'
  },
  resetToken:String
});
//pre post hooks 
//after save event occurs in db
// userSchema.post('save',function(doc){
//   console.log('after saving in db',doc);
// });

// //beofre save event occurs in db
// userSchema.pre('save',function(){
//   console.log('before saving in db',this);
// });

//remove - explore on own


userSchema.pre('save',function(){
  this.confirmPassword=undefined;
});

// userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
// })

userSchema.methods.createResetToken=function(){
  //creating unique token using npm i crypto
  const resetToken=crypto.randomBytes(32).toString("hex");
  this.resetToken=resetToken;
  return resetToken;
}

userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
  this.password=password;
  this.confirmPassword=confirmPassword;
  this.resetToken=undefined;
}



// model
const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;

// (async function createUser(){