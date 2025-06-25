const mongoose = require('mongoose');
const monthlySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: {
    type: String,
    enum: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  electricity: { type: Number, default: 0 },
  water: { type: Number, default: 0 },
  rent: { type: Number, default: 0 },
  others: { type: Number, default: 0 },
  notes:{type:String},
  total: { type: Number },
  created: { type: Date, default: Date.now }
});

monthlySchema.pre('save', function (next) {
  this.total =
    (this.electricity || 0) +
    (this.water || 0) +
    (this.rent || 0) +
    (this.others || 0);
  next();
});

module.exports = mongoose.model('MonthlyExp', monthlySchema);
