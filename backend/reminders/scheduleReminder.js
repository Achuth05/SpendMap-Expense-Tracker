require('dotenv').config();
const cron=require('node-cron');
const nodemailer=require('nodemailer');
const User=require('../models/User');
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth: {
        user:process.env.SM_EMAIL,
        pass:process.env.SM_PWD,
    },
});

const sendRem=(to, sub, msg)=>{
    const opt={
        from:`"SpendMap Remainder" <${process.env.SM_EMAIL}>`,
        to,
        subject:sub,
        text:msg,
    };
    transporter.sendMail(opt, (err)=>{
        if(err) console.log("Email error: ", err);
        else console.log("Mail sent to:", to);
    });
};

const scheduleRemainder=()=>{
    const loginLink = 'https://yourdomain.com/login';
    cron.schedule('0 10 * * 6', async()=>{
        const users=await User.find();
        users.forEach(user=>{
            sendRem(
                user.email,
                'Weekly Reminder - SpendMap',`Greetings ${user.username},\n`+ `Hope you are doing well.\n`+`This is friendly reminder to log your weekly expenses in SpendMap. Keeping your spending updated helps you stay stable.\n`+`Login here: ${loginLink}\n`+`If you have already done it, great job!\n\n`+`Thank you for using SpendMap`
            );
        })
    });
    cron.schedule('0 10 1 * *', async()=>{
        const users=await User.find();
        users.forEach(user=>{
            sendRem(
                user.email,
                'Monthly Reminder - SpendMap',`Greetings ${user.username},\n`+ `Hope you are doing well.\n`+`Don't forget to log your monthly bills and expenses in SpendMap. Staying consistent helps you stay ahead financially.\n`+`Login here: ${loginLink}\n`+`If you have already done it, great job!\n\n`+`Thank you for using SpendMap`
            );
        })
    });
    cron.schedule('0 10 1 1 *', async()=>{
        const users=await User.find();
        users.forEach(user=>{
            sendRem(
                user.email,
                'Yearly Reminder - SpendMap',`Greetings ${user.username},\n`+ `Hope you are doing well.\n`+`This is your yearly reminder to log any occasional expenses (like insurance or tution fees) in SpendMap. Stay on top with SpendMap.\n`+`Login here: ${loginLink}\n`+`If you have already done it, great job!\n\n`+`Thank you for using SpendMap`
            );
        })
    });
};
module.exports=scheduleRemainder;