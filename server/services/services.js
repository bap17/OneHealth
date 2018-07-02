var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(), //cuando se ha creado el token
    exp: moment().add(15, "days").unix() //cuando expira
  }
  return jwt.encode(payload, config.TOKEN_SECRET)
}

//Funcion para validar el email
exports.isValidEmail =function (email) { 
  return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/.test(email); 
}