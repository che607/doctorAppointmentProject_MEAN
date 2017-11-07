const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a username"],
    minlength: [2, "Username must be at least 2 characters"],
    trim: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
