require('dotenv').config();
const dbConnect=require('./config/db');
dbConnect();
const express=require('express');
const app=express();
const cors=require('cors');
const auth=require('./routes/auth');
const exp=require('./routes/expenses');
const reports=require('./routes/reports');
const PORT=5000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}));
app.options('*', cors());
app.use(express.json());
app.use('/api/auth',auth);
app.use('/api/expenses',exp);
app.use('/api/reports',reports);
app.get('/',(req,res)=>{
    res.send('Server is running');
});
app.listen(5000, ()=>{
    console.log('Server is running');
});

