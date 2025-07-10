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
        const userId=req.user.id;
        const {month, year}=req.body;
        const existing=await monthly.findOne({userId, month, year});
        
        if(existing){
            existing.electricity+=req.body.electricity || 0;
            existing.rent+=req.body.rent || 0;
            existing.water+=req.body.water || 0;
            existing.others+=req.body.others || 0;
            await existing.save();
            res.status(200).json({msg:'Added'});
        }
        else{
            const monthlyData=req.body;
            monthlyData.userId=req.user.id;
            if (!monthlyData.month) {
                return res.status(400).json({ msg: 'Month required' });
            }
            const saved=await monthly.create(monthlyData);
            console.log("Received", saved);
            return res.status(200).json({msg:'Added'});
        }
    }
    catch(error){
        res.status(400).json({msg:'Failed to add'});
    }  
});
//occasional expense route
router.post('/occasional', auth, async(req,res)=>{
    try{
        const {date}=req.body;
        const userId=req.user.id;
        const existing=await nonRegular.findOne({userId, date});
        if(existing){
            existing.insurance+=req.body.insurance || 0;
            existing.repair+=req.body.repair || 0;
            existing.schoolFee+=req.body.schoolFee || 0;
            await existing.save();
            res.status(200).json({msg:'Added'});
        }
        else{
            const nonRegularData=req.body;
            nonRegularData.userId=req.user.id;
            if (!nonRegularData.date) {
                return res.status(400).json({ msg: 'Date is required' });
            }
            const saved=await nonRegular.create(nonRegularData);
            console.log("Received", saved);
            res.status(200).json({msg:'Added'});
        }
    }
    catch(error){
        console.error(error);
        res.status(400).json({msg:'Failed to add'});
    }
});
module.exports=router;
