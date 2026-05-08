const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  dosage:    { type: String, required: true },
  frequency: { type: String, required: true },
  startDate: { type: Date,   required: true },
  endDate:   { type: Date },
  notes:     { type: String }
}, { timestamps: true });

export default mongoose.model('Medicine', medicineSchema);