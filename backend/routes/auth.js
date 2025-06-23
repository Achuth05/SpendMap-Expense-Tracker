const express=require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User=require('../models/User');
router.post('/register',async (req,res)=>{
    try{
        console.log("Register body:",req.body);
        const existing= await User.findOne({email:req.body.email});
        if(existing){
            return res.status(400).json({msg:'User already exists'});
        }
        
        const data=req.body;
        const salt=await bcrypt.genSalt(10);
        data.pwd=await bcrypt.hash(data.pwd ,salt);
        console.log(req.body);
        const user=await User.create(data);
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'1h'}, (err,token)=>{
            if(err) throw err;
            res.status(200).json({token, user: { id: user.id, email: user.email, username: user.username }});
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:'Server error'});
    }
        
});


router.post('/login', async (req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({msg:'Incorrect email or password'});
        }
        const same=await bcrypt.compare(req.body.pwd,  user.pwd);
        if(!same){
            return res.status(400).json({msg:'Invalid credentials'})
        }
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'1h'}, (err,token)=>{
            if(err) throw err;
            res.status(200).json({token,user: { id: user.id, email: user.email, username: user.username }});
        });

    }
    catch(error){
        res.status(500).json({msg:'Server error'});
    }
});
module.exports=router;