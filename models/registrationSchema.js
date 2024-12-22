const mongoose = require("mongoose");

const RegistrationsSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true},
  department: { type: String, required: true},
  year: { type: Number, required: true},
  eventId: {type: String, required: true},
});

const Registrations = mongoose.model('Registration', RegistrationsSchema);
module.exports = Registrations;
