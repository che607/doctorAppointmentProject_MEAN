const mongoose = require('mongoose');

const {Schema} = mongoose;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    min: [Date.now(), "Appointment date/time cannot be blank and must be made for current date or for a future date. There cannot be more than 3 appointments scheduled on the same date."],
  },
  time: {
    type: Date,
    min: ["1970-01-01T12:00:00.000Z", "Must be scheduled after 8:00 am."],
    max: ["1970-01-01T21:00:00.000Z", "Must be scheduled before 5:00 am."],
  },
  complain: {
    type: String,
    required: [true, "Please enter a complaint."],
    minlength: [10, "Complaint must be at least 10 characters."],
    trim: true,
  },
  user: {
    type: String,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
