var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');
var nodemailer = require('nodemailer')
var crypto = require('crypto')
var connection = require('../controllers/bd')

const IV_LENGTH = 16; // For AES, this is always 16

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
      from: '"OneHealth💙❤" <integracionmtis@gmail.com', // sender address
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

exports.encrypt=function (input) {
	try {
		var iv = crypto.randomBytes(16);
        //console.info('iv',iv);
        var num
        var data
        if(typeof input.text == 'number'){
            num = input.text.toString()
            data = new Buffer(num).toString('binary');
        }else{
            data = new Buffer(input.text).toString('binary');
        }
		
		//console.info('data',data);
		
		key = new Buffer(input.clave);
		//console.info(key);
		var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

		var nodev = process.version.match(/^v(\d+)\.(\d+)/);

		var encrypted;

		if( nodev[1] === '0' && parseInt(nodev[2]) < 10) {
			encrypted = cipher.update(data, 'binary') + cipher.final('binary');
		} else {
			encrypted =  cipher.update(data, 'utf8', 'binary') +  cipher.final('binary');
		}

		var encoded = new Buffer(iv, 'binary').toString('hex') + new Buffer(encrypted, 'binary').toString('hex');

		return encoded;
	} catch (ex) {
	  console.error(ex);
	}
}
exports.decrypt=function (encoded) { 	
	var combined = new Buffer(encoded.text, 'hex');		

	key = new Buffer(encoded.clave);

	var iv = new Buffer(16);
	
	combined.copy(iv, 0, 0, 16);
	edata = combined.slice(16).toString('binary');

	// Decipher encrypted data
	var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

	var nodev = process.version.match(/^v(\d+)\.(\d+)/);

	var decrypted, plaintext;
	if( nodev[1] === '0' && parseInt(nodev[2]) < 10) {  
		decrypted = decipher.update(edata, 'binary') + decipher.final('binary');    
		plaintext = new Buffer(decrypted, 'binary').toString('utf8');
	} else {
		plaintext = (decipher.update(edata, 'binary', 'utf8') + decipher.final('utf8'));
	}
	return plaintext;
}