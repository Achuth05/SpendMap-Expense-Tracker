const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const auth = require('../middleware/auth');
const daily=require('../models/DailyExp');
const monthly=require('../models/MonthlyBill');
router.get('/weekly/:id', auth, async(req,res)=>{
    try{
        const id=req.params.id;
        const {startDate, endDate}=req.query;
        if(!startDate||!endDate){
            return res.status(400).json({msg:"Start and end dates are required"});
        }
        const start=new Date(startDate);
        const end= new Date(endDate);
        end.setHours(23, 59, 59, 999);
        const weeklyExpense= await daily.aggregate([
            {
                $match:{
                userId: mongoose.Types.ObjectId(id),
                date: {$gte:start, $lte:end}
                }
            },
            {
                 $group:{
                    _id:null,
                    totalFood:{$sum:'$food'},
                    totalTravel:{$sum:'$travel'},
                    totalEntertainment:{$sum:'$entertainment'},
                    totalShopping:{$sum:'$shopping'},
                    totalOthers:{$sum:'$others'},
                    totalAmount:{$sum:'$total'}
                }
            }
        ]);

        res.status(200).json({msg:'Weekly report', data:weeklyExpense[0]||{}});

    }
    catch(error){
        res.status(500).send('Server error');    
    }
});
router.get('/monthly/:id/:month/:year', auth, async(req,res)=>{
    try{
        const id=req.params.id;
        const reqMonth=req.params.month;
        const reqYear=parseInt(req.params.year);
        const currentDate=new Date();
        const months = [
           'January', 'February', 'March', 'April', 'May', 'June',
           'July', 'August', 'September', 'October', 'November', 'December'
        ];
        if(currentDate.getMonth()==months.indexOf(reqMonth) && currentDate.getFullYear()==reqYear){
            res.status(400).send('Report not generated');
            return;
        }
        else{
            const monthlyExpense=await monthly.aggregate([
                {
                    $match:{
                        userId:mongoose.Types.ObjectId(id),
                        month:reqMonth,
                        year:reqYear
                    }
                },
                {
                    $group:{
                         _id:null,
                        totalElectricity:{$sum:'$electricity'},
                        totalWater:{$sum:'$water'},
                        totalRent:{$sum:'$rent'},
                        totalOthers:{$sum:'$others'},
                        totalMonthly:{$sum:'$total'}
                    }
                }
            ]);
            res.status(200).json({msg:'Monthly report',data:monthlyExpense[0]||{}});
        }
    }
    catch(error){
        res.status(400).send('Report failed');
    }
 }); 
   
router.get('/compare/:id/:month1/:year1/:month2/:year2', auth, async(req,res)=>{
    try{
        const{id, month1, year1, month2, year2}=req.params;
        const compare=await monthly.aggregate([
            {
                $match:{
                    userId:mongoose.Types.ObjectId(id),
                    $or:[
                        {month:month1, year:parseInt(year1)},
                        {month:month2, year:parseInt(year2)}
                    ]
                }
            },
            {
                $group:{
                    _id:{month:"$month",year:"$year"},
                    totalElectricity:{$sum:'$electricity'},
                    totalWater:{$sum:'$water'},
                    totalRent:{$sum:'$rent'},
                    totalOthers:{$sum:'$others'},
                    totalMonthly:{$sum:'$total'}
                }
            }
        ]);
        if(compare.length<2){
            res.status(400).send("Insufficient data");
            return;
        }
        else{
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            compare.sort((a, b) => {
                const y1 = a._id.year, y2 = b._id.year;
                const m1 = months.indexOf(a._id.month), m2 = months.indexOf(b._id.month);
                if (y1 !== y2) return y1 - y2;
                return m1 - m2;
            });
            const [monthA, monthB] = compare;
            const fields = ['totalElectricity', 'totalWater', 'totalRent', 'totalOthers', 'totalMonthly'];
            const differences={};
            fields.forEach(field=>{
                const value1=monthA[field]||0;
                const value2=monthB[field]||0;
                const diff=Math.abs(value1-value2);
                const greater=value1===value2?'Equal':(value1>value2?monthA._id.month:monthB._id.month);
                differences[field]={
                    [`${monthA._id.month},${monthA._id.year}`]:value1,
                    [`${monthB._id.month},${monthB._id.year}`]:value2,
                    difference:diff,
                    moreIn:greater
                };
            });

            const subFields = ['totalElectricity', 'totalWater', 'totalRent', 'totalOthers'];
            let maxDiff = 0;
            let spike = '';

            
            subFields.forEach(field => {
                const value1 = monthA[field] || 0;
                const value2 = monthB[field] || 0;
                const diff = Math.abs(value1 - value2);

                if (diff > maxDiff) {
                    maxDiff= diff;
                    spike=field.replace('total', '');
                }
            });

            
            res.status(200).json({
                totalComp:{
                    [`${monthA._id.month}, ${monthA._id.year}`]:monthA.totalMonthly,
                    [`${monthB._id.month}, ${monthB._id.year}`]:monthB.totalMonthly,
                    difference:Math.abs(monthA.totalMonthly-monthB.totalMonthly),
                    more:monthA.totalMonthly>monthB.totalMonthly?`${monthA._id.month},${monthA._id.year}`:`${monthB._id.month},${monthB._id.year}`,
                    reason: spike ? `Major difference was in ${spike}` : 'No significant spike'
                },
                individual:differences
            });
        }
        
    }
    catch(error){
        res.status(400).send('Comparison failed');
    }
});
module.exports=router;
