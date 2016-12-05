
//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

//MongoDB
mongoose.connect('mongodb://localhost/node_server');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





//???
//var messageSchema = require('..models/messages'); //.js?
var restful = require('node-restful');
var restfulmongoose = restful.mongoose;
var messageSchema = new mongoose.Schema({
  text: String
});
//module.exports = restful.model('messageSchema', messageSchema);

messageSchema.methods(['get', 'put', 'post', 'delete']);
var router = express.Router();
messageSchema.register(router, '/messages')





//Routes
app.get('/', function(request, response){
  response.send('worked');
});
//app.use('/api', require('/routes/api.js'))

//Start server
app.listen(3333);
console.log('API running on port 3333');