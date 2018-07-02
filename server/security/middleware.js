var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../services/config');

exports.isAuth = function(pet, resp, next) {
  if(!pet.headers.authorization) {
    return resp.status(403).send({message: "No tienes autorización"});
  }
  
  var token = pet.headers.authorization  //me quedo con el token

  try{
    var payload=jwt.decode(token, config.TOKEN_SECRET)

    if(payload.exp <= moment().unix()) {
      return resp.status(401).send({message: "El token ha expirado"})
   }

   pet.user=payload.sub
   next()


  }catch(err){
    return resp.status(400).send({message: 'Token no valido'})
    
  }
}