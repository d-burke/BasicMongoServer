var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
app.use(bodyParser.json());

var autoIncrement = require('mongoose-auto-increment');

// Initialize connection
var dbConnect = mongoose.connect('127.0.0.1', 'message_db');

// Apply autoincrementing feature
autoIncrement.initialize(dbConnect);

var schema = new mongoose.Schema({text: 'string'});
schema.plugin(autoIncrement.plugin, 'Message');
var Message = mongoose.model('Message', schema);


// List all routes when user hits root
app.get('/', function(request, response){
  response.send('<h2>Welcome</h2><br> Available routes:<br>' +
                'GET /messages/        get all messages<br>' +
                'GET /messages/:id     get a single message by ID<br>' +
                'POST /messages/       add a new messages to the database<br>' +
                'PUT /messages/:id     update the text of a message<br>' +
                'DELETE /messages/:id  delete a single message by ID'
                );
});


// Get all messages
app.get('/messages/', function(request, response){
  Message.find(function(err, theMessages){
    if (err){
      console.log('err: ', err);
    }
    response.send(theMessages);
  });
});


// Get one message by ID
app.get('/messages/:id', function(request, response){
  //// find a specific user
  // console.log('request.params: ', request.params);
  var whichOne = request.params.id;
  // console.log('whichOne: ', whichOne);
  Message.find({ '_id': whichOne }, function(err, theMessage){
    response.send(theMessage);
  });
});


// Post message
app.post('/messages', function(request, response){
  var incomingText = request.body.text;
  var aMessage = Message.create({text: incomingText}, function(err, text){
    if (err){
      console.log('err: ', err);
    }
  });
  response.send('saved to database when we get one');
});


// Delete one message
app.delete('/messages/:id', function(request, response){
  // console.log('request.params: ', request.params);
  var whichOne = request.params.id;
  // console.log('whichOne: ', whichOne);
  Message.remove({ '_id': whichOne }, function(err, theMessage){
    response.send(theMessage);
  });
});


// Update one message by ID
app.put('/messages/:id', function(request, response){
  // console.log('request.params: ', request.params);
  var whichOne = request.params.id;
  var updateText = request.body.text;
  // console.log('whichOne: ', whichOne);
  Message.update({ '_id': whichOne }, {'text': updateText}, function(err, theMessage){
    response.send(theMessage);
  });
});


// Server
var server = app.listen(1337, '127.0.0.1', function(){
 console.log('server address / port: ', server.address().address, ' / ', server.address().port);
});
console.log('successful connection on port 1337');
