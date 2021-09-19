const express = require("express");

const app = express();
//middleware func-> post, front-> json 
app.use(express.json());
app.listen(3000);

let users=[
    {
        'id':1,
        'name':"Abhishek"
    },
    {
        'id':2,
        'name':"Jasbir"
    },
    {
        'id':3,
        'name':"Kartik"
    }
];

app.get('/user',(req,res)=>{
    res.send(users);
})

app.post('/user',(req,res)=>{
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    });
});

// update -> patch
app.patch('/user',(req,res)=>{
    console.log('req.body-> ',req.body);
    //update data in users obj
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key];
    }
    res.json({
        message:"data updated successfully"
    })
});
//to delete a data 
app.delete('/user',(req,res)=>{
    users={};
    res.json({
        message:"data has been deleted"
    });
});

//params

app.get('/user/:id',(req,res)=>{
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }
    }
    res.json({
        message:"req received",
        data:obj
    });
});

