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

//Codigo de confirmación
var codigo
//Usuario encontrado al hacer login
var usuario

//Registrar un usuario
exports.emailSignup = function(pet, resp) {
    var email = pet.body.email
    var nombre = pet.body.username
    var pass = pet.body.password
    var tipo = pet.body.tipo
    var sip = pet.body.sip
    var esp = pet.body.especialidad


    if(nombre==undefined || pass==undefined || tipo==undefined) {
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else if(sip==undefined && esp==undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else if(!service.isValidEmail(email)){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM usuario WHERE username = ?', [nombre], function(err, results) {
            if(err) {
                resp.status(500).send({message: "Error en el servidor1"})
            } else {
                if(results.length > 0) {
                    resp.status(409).send({message: "Ya hay un usuario con el mismo nombre de usuario"})
                } else {
                    var salt = crypto.randomBytes(SALTBYTES).toString('base64')
                    var key = crypto.randomBytes(24).toString('base64')
                    crypto.pbkdf2(pass, salt, PBKDF2ITERATIONS, HASHBYTES, 'sha512', (err, derivedKey) => {
                        if (err) throw err
                        connection.query('INSERT INTO usuario (username, email, password, salt, clave) VALUES(?,?,?,?,?)', [nombre,email,derivedKey,salt,key], function(err2, result) {
                            if(err2) {
                                resp.status(500).send({message: err2})
                            } else {
                                if(tipo==1){
                                    if(sip==undefined) {
                                        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
                                    }else{
                                        connection.query('INSERT INTO paciente (id,sip) VALUES(?,?)', [result.insertId,sip], function(err3, result2) {
                                            if(err3) {
                                                resp.status(500).send({message: err3})
                                            } else {
                                                resp.status(201).send({message:"El usuario se ha registrado correctamente"})
                                            }
                                        })
                                    }             
                                }else{
                                    if(esp==undefined){
                                        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
                                    }else{
                                        connection.query('INSERT INTO medico (id) VALUES(?)', [result.insertId], function(err3, result2) {
                                            if(err3) {
                                                resp.status(500).send({message: "Error en el servidor4"})
                                            } else {
                                                connection.query('INSERT INTO especialidad (medico,nombre) VALUES(?,?)', [result.insertId,esp], function(err4, result3) {
                                                    if(err4) {
                                                        resp.status(500).send({message: err4})
                                                    } else {
                                                        resp.status(201).send({message:"El usuario se ha registrado correctamente"})
                                                    }
                                                })
                                            }
                                        })
                                    } 
                                }
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
                    var resultado
                    connection.query('SELECT * FROM medico WHERE id = ?', [results[0].id],function (error2, results2) {
                        if(error2) {
                            resp.status(500).send({message: "Error en el servidor"})
                        }else{
                            if(results2.length > 0) {
                                resultado={
                                    "id": results[0].id,
                                    "nombre": results[0].nombre,
                                    "apellidos": results[0].apellidos,
                                    "username": results[0].username,
                                    "email": results[0].email,
                                    "tipo": "medico"
                                }
                            }else{
                                resultado={
                                    "id": results[0].id,
                                    "nombre": results[0].nombre,
                                    "apellidos": results[0].apellidos,
                                    "username": results[0].username,
                                    "email": results[0].email,
                                    "tipo": "paciente"
                                }
                            }
                        }
                    })
                    crypto.pbkdf2(pass, results[0].salt, PBKDF2ITERATIONS, HASHBYTES, 'sha512', (err, derivedKey) => {
                        if (err) throw err
                        if(derivedKey == results[0].password) {
                            usuario = resultado
                            codigo = Math.floor((Math.random() * 9000) + 1000)
                            var code = {
                                email: results[0].email,
                                codigo: codigo
                            }
                            /*if(!service.enviarEmail(code)){
                                resp.status(500).send({message: "No se ha podido enviar el correo de confirmación"})
                            }else{
                                resp.status(200).send({message: "Se ha enviado el correo de confirmación",resultado})
                            }*/
                            service.enviarEmail(code)
                            resp.status(200).send({message: "Se ha enviado el correo de confirmación",resultado})                  
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

//Comprueba que coincida el codigo de confirmacion
exports.checkCode=function(pet,resp){
    var cod = pet.body.codigo

    if(cod==undefined){
        resp.status(400).send({message: "Debes de poner el código de confirmación"})
    }else{
        if(cod==codigo){
            var token = service.createToken(usuario)                        
            resp.status(200).send({message: "Login correcto",token: token, usuario})
        }else{
            resp.status(401).send({message: "Codigo incorrecto"})
        }
    }
}

