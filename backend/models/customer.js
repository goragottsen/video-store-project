const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  address: { type: String },
  city: { type: String },
  phone: { type: String },
  status: { type: String }
});

module.exports = mongoose.model('Customer', customerSchema);
