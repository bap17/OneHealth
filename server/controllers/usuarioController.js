var connection = require('./bd')
var crypto = require('crypto')

// PBKDF2ITERATIONS sets the amount of iterations used by the PBKDF2 hashing algorithm
PBKDF2ITERATIONS = 15000
// SALTBYTES sets the amount of bytes for the salt used in the PBKDF2 / scrypt hashing algorithm
SALTBYTES = 64
// HASHBYTES sets the amount of bytes for the hash output from the PBKDF2 / scrypt hashing algorithm
HASHBYTES = 64
crypto.DEFAULT_ENCODING = 'base64'

exports.updateUsuario=function (pet,resp){
    var id = pet.params.id
    var nombre = pet.body.nombre
    var apellidos = pet.body.apellidos

    if(nombre==undefined && apellidos==undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM Usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('UPDATE usuario SET nombre = ?, apellidos = ? WHERE id = ?', [nombre,apellidos,id], function(err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            resp.status(200).send({message: "Usuario actualizado"})
                        }
                    })
                } else {
                    resp.status(403).send({message: "El usuario no existe"})
                }
            }
        })
    }
}

exports.updatePassword=function (pet,resp){
    var id = pet.params.id
    var pass = pet.body.password

    if(pass==undefined ){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM Usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    var salt = crypto.randomBytes(SALTBYTES).toString('base64')
                    crypto.pbkdf2(pass, salt, PBKDF2ITERATIONS, HASHBYTES, 'sha512', (err, derivedKey) => {
                        if (err) throw err
                        connection.query('UPDATE Usuario SET password = ?, salt = ? WHERE id=?', [derivedKey,salt,id], function(err2, result) {
                            if(err2) {
                                resp.status(500).send({message: "Error en el servidor"})
                            } else {
                                resp.status(200).send({message:"Contraseña actualizada"})
                            }
                        })
                    })
                } else {
                    resp.status(403).send({message: "El usuario no existe"})
                }
            }
        })
    }
}