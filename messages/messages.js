var mongoose = require('mongoose');

var messages = mongoose.Schema({
  text:{
    type: String,
    required: true
  },
  time:{
    type: Date,
    default: Date.now
  }
});

var messages = module.exports = mongoose.model('Messages', messageSchema);