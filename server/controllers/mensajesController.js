var connection = require('./bd')
var service = require('../services/services')

exports.nuevoMensaje=function(pet,resp){
    var id = pet.params.id
    var mensaje = pet.body.mensaje
    var desti = pet.body.destinatario
    var asunto = pet.body.asunto

    if(id==undefined || mensaje==undefined || desti == undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM usuario WHERE username=?',[desti],function (err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0) {
                                var mensajeC = service.encrypt({text:mensaje,clave:results[0].clave})
                                var asuntoC = service.encrypt({text:asunto,clave:results[0].clave})
                                connection.query('INSERT INTO mensaje (origen,destino,asunto,texto,clave_origen,nombre_origen,nombre_destino) VALUES(?,?,?,?,?,?,?)',[id,results2[0].id,asuntoC,mensajeC,results[0].clave,results[0].username,results2[0].username],function (err2, results3) {
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
                    resp.status(404).send({message: "No se ha encontrado el usuario"})
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
        connection.query('SELECT * FROM usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM mensaje WHERE destino=?',[id],function (err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0) {
                                var mensajes = new Array()
                                results2.forEach(mensaje => {
                                    var resul={
                                        "usuario": mensaje.nombre_origen,
                                        "asunto": service.decrypt({text:mensaje.asunto,clave:mensaje.clave_origen}),
                                        "texto":service.decrypt({text:mensaje.texto,clave:mensaje.clave_origen}),
                                        "tipo": "recibido"  
                                    }
                                    mensajes.push(resul)
                                })
                                resp.status(200).send({mensajes})
                                
                                /*for(var i=0; i< results2.length;i++){
                                    descifrar(results2[i], function(resp1){
                                        mensajes.push(resp1)
                                        console.log(mensajes)
                                        
                                    })     
                                    
                                } 
                                resp.status(200).send({mensajes})*/                                 
                            } else {
                                resp.status(404).send({message: "No tienes mensajes"})
                            }
                        }
                    })
                } else {
                    resp.status(200).send({message: "No se ha encontrado el usuario"})
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
        connection.query('SELECT * FROM usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM mensaje WHERE origen=?',[id],function (err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0) {
                                var mensajes = new Array()
                                results2.forEach(mensaje => {
                                    var resul={
                                        "id": mensaje.id,
                                        "usuario": mensaje.nombre_destino,
                                        "asunto": service.decrypt({text:mensaje.asunto,clave:mensaje.clave_origen}),
                                        "texto":service.decrypt({text:mensaje.texto,clave:results[0].clave}),
                                        "tipo": "enviado" 
                                    }
                                    mensajes.push(resul)
                                })
                                resp.status(200).send({mensajes:mensajes})
                            } else {
                                resp.status(200).send({message: "No tienes mensajes enviados"})
                            }
                        }
                    })
                } else {
                    resp.status(404).send({message: "No se ha encontrado el usuario"})
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
        connection.query('SELECT * FROM usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('DELETE FROM mensaje WHERE id=?',[idMen],function (err, results2) {//TODO: comprobar que sea el origen
                        if(err) {
                            resp.status(500).send({message: err})
                        } else {
                            resp.status(200).send({message: "Mensaje borrado", results2})
                            
                        }
                    })
                } else {
                    resp.status(404).send({message: "No se ha encontrado el usuario"})
                }
            }
        })
    }
}


/*function descifrar(mensaje,callback){
    //var mensajes = new Array()
    

    connection.query('SELECT * FROM usuario WHERE id = ?',[mensaje.origen],function (err2, results3) {
        if(err2) {
            resp.status(500).send({message: "Error en el servidor"})
        } else {
            var resul={
                "texto":service.decrypt({text:mensaje.texto,clave:results3[0].clave}) 
            }
            //mensajes.push(resul)
            console.log("descifrar"+resul)
            callback(resul)
        }
    })      
}*/