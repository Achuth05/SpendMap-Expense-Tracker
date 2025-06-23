const mongoose=require('mongoose');
const nonRegularSchema=mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId, ref:'User', required: true},
    insurance:{type:Number, default:0},
    schoolFee:{type:Number, default:0},
    repair:{type:Number, default:0},
    date:{type:Date, required: true},
    notes:{type:String}
});
module.exports=mongoose.model('NonRegularExp', nonRegularSchema);