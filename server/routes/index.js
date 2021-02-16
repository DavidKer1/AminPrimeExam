const express = require('express');
const router = express.Router()
const usersController = require('../controllers/usersController');
module.exports = function(){
  router.post('/register', usersController.registerUser);

  return router
}