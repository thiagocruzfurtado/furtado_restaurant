const mongoose = require('../db');

// defines the reservation entity with all attributes
const ReservationSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  childrens: {
    type: Number,
    required: true,
  },
  specialNotes: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // type mongo object id
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// creates the model to manipulate the data
const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;