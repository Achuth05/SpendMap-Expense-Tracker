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
        if (!dailyData.userId || !dailyData.date) {
            return res.status(400).json({ msg: 'userId and date are required' });
        }
        await daily.create(dailyData);
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
        if (!monthlyData.userId || !monthlyData.date) {
            return res.status(400).json({ msg: 'userId and date are required' });
        }
        await monthly.create(monthlyData);
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
        if (!nonRegularData.userId || !nonRegularData.date) {
            return res.status(400).json({ msg: 'userId and date are required' });
        }
        await nonRegular.create(nonRegularData);
        res.status(200).json({msg:'Added'});
    }
    catch(error){
        res.status(400).json({msg:'Failed to add'});
    }
})
module.exports=router;
