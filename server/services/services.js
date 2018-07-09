var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');
var nodemailer = require('nodemailer')
var crypto = require('crypto')

exports.createToken = function(user) {
  var payload = {
    sub: user.id,
    iat: moment().unix(), //cuando se ha creado el token
    exp: moment().add(15, "days").unix() //cuando expira
  }
  return jwt.encode(payload, config.TOKEN_SECRET)
}

//Funcion para validar el email
exports.isValidEmail =function (email) { 
  return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/.test(email); 
}

//Funcion para enviar el correo con el codigo
exports.enviarEmail=function(pet) {
    var resultado
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'integracionmtis@gmail.com', // generated ethereal user
          pass: 'usabilidad2018' // generated ethereal password
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"OneHealth💙" <integracionmtis@gmail.com', // sender address
      to: pet.email, // list of receivers
      subject: 'Confirmación', // Subject line
      html: 'El código de confirmación es <b>'+pet.codigo + '</b>' // html body
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error)
          resultado= false
      }else{
          resultado= true
          console.log(resultado)
      }
  })
  console.log("final "+resultado)//TODO: ver como devolver false
  return resultado
}

exports.cifrar =function(pet){
    var key = "6A80FD8D38D579D1090F6CDB62C729311781E4BA31CD7D804BD7BF5AEC3BFC2D"
    var iv = Buffer.concat([crypto.randomBytes(12), Buffer.alloc(4, 0)])
    var cipher = crypto.createCipheriv("aes-256-ctr", key, iv)
    var ctext = iv.toString('hex') + cipher.update(pet.text,'utf8','hex') +  cipher.final('hex')
    console.log(ctext)
}