const mongoose=require('mongoose');
const db_link='mongodb+srv://admin:xnDx4jlj5mmzjiVE@cluster0.3irmz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
  // console.log(db);
  console.log('user db connected');
})
.catch(function(err){
  console.log(err);
});

const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:[true, 'review is required']
    },
    rating:{
        type:Number,
        min:1,
        max:10,
        required:[true,'rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'review must belong to a user']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true,'review must belong to a plan']
    }
});
//find findById, findOne
reviewSchema.pre(/^find/, function (next) {
    this.populate({
      path: "user",
      select: "name profileImage"
    }).populate("plan");
    next();
  });

const reviewModel=mongoose.model('reviewModel',reviewSchema);

module.exports=reviewModel;