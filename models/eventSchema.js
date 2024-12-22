const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true},
  time: { type: String, required: true},
  venue: { type: String, required: true},
  capacity: { type: Number, required: true},
  organizer: { type: String, required: true},
  tags: { type: [String] , required: true},
  createdAt: { type: Date, default: Date.now },
});

const event = mongoose.model('Event', eventSchema);
module.exports = event;
