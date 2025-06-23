const mongoose=require('mongoose');
const dailyExpSchema=mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    date:{type:Date, required:true},
    food:{type:Number, default:0},
    travel:{type:Number, default:0},
    entertainment:{type:Number, default:0},
    shopping:{type:Number, default:0},
    others:{type:Number, default:0},
    notes:{type:String},
    total:{type:Number},
    created:{type:Date, default:Date.now}
});
dailyExpSchema.pre('save', function(next) {
  this.total =
    (this.food || 0) +
    (this.travel || 0) +
    (this.entertainment || 0) +
    (this.shopping || 0) +
    (this.others || 0);
  next();
});
module.exports = mongoose.model('DailyExp', dailyExpSchema);
