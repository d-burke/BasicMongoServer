//Dependencies
var express = require('express');
var router = express.Router();



//Routes
router.get('/messages', function(request, response){
  response.send('api are wroks yarg, please!');
})

//Return router
module.exports = router;