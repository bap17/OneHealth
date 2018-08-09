var connection = require('./bd')
var service = require('../services/services')

exports.nuevoMensaje=function(pet,resp){
    var id = pet.params.id
    var mensaje = pet.body.mensaje
    var desti = pet.body.destinatario

    if(id==undefined || mensaje==undefined || desti == undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM Usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM Usuario WHERE username=?',[desti],function (err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0) {
                                var mensajeC = service.encrypt({text:mensaje,clave:results[0].clave})
                                connection.query('INSERT INTO Mensaje (origen,destino,texto) VALUES(?,?,?)',[id,results2[0].id,mensajeC],function (err2, results3) {
                                    if(err2) {
                                        resp.status(500).send({message: err2})
                                    } else {
                                        resp.status(201).send({message:"Mensaje enviado"})
                                    }
                                })
                            } else {
                                resp.status(404).send({message: "No se ha encontrado el destinatario"})
                            }
                        }
                    })
                } else {
                    resp.status(403).send({message: "No tienes autorizacion para ésta función"})
                }
            }
        })
    }
}

exports.verMensajesRecibidos=function(pet,resp){
    var id = pet.params.id

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM Usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM Mensaje WHERE destino=?',[id],function (err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0) {
                                //var mensajes = new Array()
                                
                                    descifrar(results2,function(resul){
                                        //mensajes.push(resul)
                                        console.log("3"+resul)
                                        resp.status(200).send({mensajes:resul})
                                    })
                                
                                
                            } else {
                                resp.status(404).send({message: "No tienes mensajes"})
                            }
                        }
                    })
                } else {
                    resp.status(403).send({message: "No tienes autorizacion para ésta función"})
                }
            }
        })
    }
}

exports.verMensajesEnviados=function(pet,resp){
    var id = pet.params.id

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM Usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT texto FROM Mensaje WHERE origen=?',[id],function (err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0) {
                                var mensajes = new Array()
                                results2.forEach(mensaje => {
                                    var resul={
                                        "texto":service.decrypt({text:mensaje.texto,clave:results[0].clave}) 
                                    }
                                    mensajes.push(resul)
                                })
                                resp.status(200).send({mensajes:mensajes})
                            } else {
                                resp.status(404).send({message: "No tienes mensajes enviados"})
                            }
                        }
                    })
                } else {
                    resp.status(403).send({message: "No tienes autorizacion para ésta función"})
                }
            }
        })
    }
}

exports.borrarMensaje=function(pet,resp){
    var id = pet.params.id
    var idMen = pet.params.idMen

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM Usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('DELETE FROM Mensaje WHERE id=?',[idMen],function (err, results2) {//TODO: comprobar que sea el origen
                        if(err) {
                            resp.status(500).send({message: err})
                        } else {
                            resp.status(200).send({message: "Mensaje borrado", results2})
                            
                        }
                    })
                } else {
                    resp.status(403).send({message: "No tienes autorizacion para ésta función"})
                }
            }
        })
    }
}

var descifrar =function(results2,callback){
    var mensajes = new Array()
    results2.forEach(mensaje => {
        connection.query('SELECT * FROM Usuario WHERE id = ?',[mensaje.origen],function (err2, results3) {
            if(err2) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                var resul={
                    "texto":service.decrypt({text:mensaje.texto,clave:results3[0].clave}) 
                }
                mensajes.push(resul)
                console.log(mensajes)
            }
        }) 
    })   
    console.log("2"+mensajes)
    callback(mensajes)
    
}