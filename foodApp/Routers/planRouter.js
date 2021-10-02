const express = require("express");
const planRouter = express.Router();
const{protectRoute, isAuthorised}=require('../controller/authController');
const{getPlan,getAllPlans,createPlan,updatePlan,deletePlan,top3Plans}=require('../controller/planController');

//all plans leke aayega 
planRouter.route('/allPlans')
.get(getAllPlans)

//own plan -> logged in necessary 
planRouter.use(protectRoute);
planRouter.route('/plan/:id')
.get(getPlan)

// admin nd restaurant owner can only create,update or delte plans 
planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter
.route('/crudPlan')
.post(createPlan);

planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)

planRouter.route('/top3').get(top3Plans)
module.exports=planRouter;