const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  specialty:  { type: String, required: true },
  date:       { type: Date,   required: true },
  time:       { type: String, required: true },
  location:   { type: String },
  status:     { type: String, enum: ['upcoming','completed','cancelled'], default: 'upcoming' },
  notes:      { type: String }
}, { timestamps: true });

export default  mongoose.model('Appointment', appointmentSchema);