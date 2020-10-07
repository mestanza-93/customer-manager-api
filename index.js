/* USER */
var constants = require('./constants');
var userFunctions = require(constants.BASE_PATH + "/models/user");

exports.createUserTest = (request, response) => {

  userFunctions.createUserTest(request, response);

};

exports.getAllUsers = (request, response) => {

  userFunctions.getAllUsers(request, response);
  
};