const express=require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto=require('crypto');
const nodemailer=require('nodemailer');
const User=require('../models/User');
const auth=require('../middleware/auth');
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

router.get('/profile', auth, async(req, res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    }
    catch(error){
        console.error("Error fetching profile", error);
        res.status(400).send("Profile fetch failed");
    }
});

router.post('/change-password', auth, async(req, res)=>{
    try{
        const user=await User.findById(req.user.id);
        const same=await bcrypt.compare(req.body.oldPassword, user.pwd);
        if(!same){
            return res.status(401).json({msg:"Old password is incorrect"});
        }
        const salt=await bcrypt.genSalt(10);
        user.pwd=await bcrypt.hash(req.body.newPassword ,salt);
        await user.save();
        return res.status(200).json({msg:"Password changed"});
    }
    catch(err){
        console.error("Error occured", err);
        res.status(400).json({msg:"Failed to change password"});
    }
});

router.put('/edit-profile', auth, async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        const{name, email}=req.body;
        if(name) user.username=name;
        if(email) user.email=email;
        await user.save();
        res.status(200).json({msg:"Profile updated", user});
    }
    catch(err){
        res.status(500).json({msg:"Failed to update"});
        console.error("Failed to update profile", err);
    }
});

router.post('/forgot-password', async(req, res)=>{
    const {email}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({msg:"User not found"});
    }
    const token=crypto.randomBytes(32).toString('hex');
    user.resetToken=token;
    user.resetTokenExpiry=Date.now()+3600000;
    await user.save();
    const resetLink=`https://localhost:3000/reset-password/${token}`;
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.SM_EMAIL,
            pass:process.env.SM_PWD,
        }
    });
    const opt={
        from:'SpendMap Support',
        to:user.email,
        sub:"Password reset",
        html:`<p>Click <a href="${resetLink}"> here to reset your password. This link is valid for 1 hour.</p>`,
    };
    transporter.sendMail(opt, (err)=>{
        if(err){
            console.log(err);
            return res.status(400).json({msg:"Email not sent"});
        }
        res.status(200).json({msg:"Mail sent"});
    });
});
module.exports=router;