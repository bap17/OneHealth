var connection = require('./bd')
var service = require('../services/services')
var crypto = require('crypto')

// PBKDF2ITERATIONS sets the amount of iterations used by the PBKDF2 hashing algorithm
PBKDF2ITERATIONS = 15000
// SALTBYTES sets the amount of bytes for the salt used in the PBKDF2 / scrypt hashing algorithm
SALTBYTES = 64
// HASHBYTES sets the amount of bytes for the hash output from the PBKDF2 / scrypt hashing algorithm
HASHBYTES = 64
crypto.DEFAULT_ENCODING = 'base64'

//Registrar un usuario
exports.emailSignup = function(pet, resp) {
    var email = pet.body.email
    var nombre = pet.body.username
    var pass = pet.body.password


    if(nombre==undefined || pass==undefined) {
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else if(!service.isValidEmail(email)){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM Usuario WHERE nombre = ?', [nombre], function(err, results) {
            if(err) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    resp.status(409).send({message: "Ya hay un usuario con el mismo nombre de usuario"})
                } else {
                    var salt = crypto.randomBytes(SALTBYTES).toString('base64')
                    crypto.pbkdf2(pass, salt, PBKDF2ITERATIONS, HASHBYTES, 'sha512', (err, derivedKey) => {
                        if (err) throw err
                        connection.query('INSERT INTO Usuario (username, email, password,salt) VALUES(?,?,?,?)', [nombre,email,derivedKey,salt], function(err2, result) {
                            if(err2) {
                                resp.status(500).send({message: "Error en el servidor"})
                            } else {
                                resp.status(201).send({message:"El usuario se ha registrado correctamente"})
                            }
                        })
                    })
                }
            }
        })
    }   
}

//Loguear un usuario
exports.emailLogin = function(pet, resp) {
    var user = pet.body.username
    var pass = pet.body.password

    if(user==undefined || pass==undefined) {  
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM usuario WHERE username = ?', [user],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    crypto.pbkdf2(pass, results[0].salt, PBKDF2ITERATIONS, HASHBYTES, 'sha512', (err, derivedKey) => {
                        if (err) throw err
                        if(derivedKey == results[0].password) {
                            var token = service.createToken(results[0])                        
                            resp.status(200).send({token: token, user: results[0]})                  
                        } else {
                            resp.status(401).send({message: "Contraseña incorrecta"})
                        } 
                    })
                } else {
                    resp.status(401).send({message: "El usuario no existe"})
                }
            }
        })
    }
        
}

