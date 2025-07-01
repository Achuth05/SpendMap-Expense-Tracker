const mongoose=require('mongoose');
const nonRegularSchema=mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId, ref:'User', required: true},
    insurance:{type:Number, default:0},
    schoolFee:{type:Number, default:0},
    repair:{type:Number, default:0},
    total:{type:Number},
    date:{type:Date, required: true},
    notes:{type:String}
});
nonRegularSchema.pre('save', function(next) {
  this.total =
    (this.insurance || 0) +
    (this.schoolFee || 0) +
    (this.repair || 0);
    next();
});
module.exports=mongoose.model('NonRegularExp', nonRegularSchema);