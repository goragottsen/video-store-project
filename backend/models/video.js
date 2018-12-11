const mongoose = require('mongoose');

// Create a blueprint = definition
const videoSchema = mongoose.Schema({
  title: {type: String, required: true },
  runningTime: {type: String, required: true },
  genre: {type: String, required: true },
  rating: {type: String, required: true },
  director: {type: String, required: true },
  status: {type: String, required: true },
  imagePath: {type: String, required: true},
  customerName: {type: String}
});

// Turn the blueprint into a model
module.exports = mongoose.model('Video', videoSchema);
