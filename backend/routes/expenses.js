const express=require('express');
const router=express.Router();
const auth = require('../middleware/auth');
const daily=require('../models/DailyExp');
const monthly=require('../models/MonthlyBill');
const nonRegular=require('../models/NonRegular');
//daily expense route
router.post('/daily', auth, async(req,res)=>{
    try{
        const dailyData=req.body;
        dailyData.userId=req.user.id;
        if (!dailyData.date) {
            return res.status(400).json({ msg: 'Date is required' });
        }
        const saved=await daily.create(dailyData);
        console.log("Received", saved);
        res.status(200).json({msg:'Added'});
    }
    catch(error){
        res.status(400).json({msg:'Failed to add'});
    }
    
});
//monthly expense route
router.post('/monthly', auth, async(req,res)=>{
    try{
        const monthlyData=req.body;
        monthlyData.userId=req.user.id;
        if (!monthlyData.month) {
            return res.status(400).json({ msg: 'Month required' });
        }
        const saved=await monthly.create(monthlyData);
        console.log("Received", saved);
        res.status(200).json({msg:'Added'});
    }
    catch(error){
        res.status(400).json({msg:'Failed to add'});
    }  
});
//occasional expense route
router.post('/occasional', auth, async(req,res)=>{
    try{
        const nonRegularData=req.body;
        nonRegularData.userId=req.user.id;
        if (!nonRegularData.date) {
            return res.status(400).json({ msg: 'Date is required' });
        }
        const saved=await nonRegular.create(nonRegularData);
        console.log("Received", saved);
        res.status(200).json({msg:'Added'});
    }
    catch(error){
        res.status(400).json({msg:'Failed to add'});
    }
})
module.exports=router;
