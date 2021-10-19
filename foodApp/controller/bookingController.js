let SK="sk_test_pL1X84CZrOSOYRkyyvKuCwR000a36t5jwK";
const stripe=require('stripe')(SK);
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");

module.exports.createSession=async function createSession(req,res){
    try{
    let userId=req.id;
    let planId=req.params.id;

    const user = await userModel.findById(userId);
    const plan = await planModel.findById(planId);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: user.email,
        client_refernce_id: plan.id,
        line_items: [
          {
            name: plan.name,
            description: plan.description,
            // deploy website 
            amount: plan.price * 100,
            currency: "inr",
            quantity: 1
          }
        ],
        // dev => http
        // production => https 
        success_url: `${req.protocol}://${req.get("host")}/profile`,
        cancel_url: `${req.protocol}://${req.get("host")}/profile`
      })
      res.status(200).json({
        status: "success",
        session
      })
    } catch (err) {
      res.status(500).json({
        err: err.message
      })
    }
}