const express=require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
module.exports=router;