var connection = require('./bd')
var service = require('../services/services')
var crypto = require('crypto')
var randomstring = require("randomstring");

exports.crearCita=function (pet,resp){
    var id = pet.params.id
    var fecha = pet.body.fecha
    var hora = pet.body.hora
    var medico = pet.body.medico
    var sip = pet.body.paciente
    var tipo = pet.body.tipo


    if(fecha==undefined || hora==undefined || medico==undefined || sip==undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM paciente WHERE sip = ?', [sip], function(err, result) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            //var iv = crypto.randomBytes(8);
                            //var iv = randomstring.generate(5)
                            //var codigo = randomstring.generate(5)
                            var fechaC = service.encrypt({text:fecha,clave:results[0].clave})
                            var horaC = service.encrypt({text:hora,clave:results[0].clave})
                            //var codigo = service.encrypt({text:iv,clave:results[0].clave})
                            var codigo = randomstring.generate(5)
                            //var codigoC = service.encrypt({text:codigo,clave:results[0].clave})
                            
                            connection.query('INSERT INTO cita (fecha, hora, paciente,medico,origen,tipo, codigo) VALUES(?,?,?,?,?,?,?)', [fechaC,horaC,result[0].id,medico,results[0].clave,tipo,codigo], function(err2, result2) {

                                if(err2) {
                                    resp.status(500).send({message: err2})
                                } else {
                                    resp.status(201).send({message:"La cita se ha registrado correctamente", codigo: codigo})
                                }
                            })
                        }
                    })
                } else {
                    resp.status(404).send({message: "No se ha encontrado al usuario"})
                }
            }
        })
    }
}

exports.obtenerCitasMedico=function (pet,resp){
    var id = pet.params.id

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los parámetros es inválido o vacío"})
    }else{
        connection.query('SELECT nombre,clave,validado FROM medico m INNER JOIN usuario u ON m.id = u.id WHERE m.id = ?', [id],function (error, results) {

            if(error) {
                resp.status(500).send({message: error})
            } else {
                if(results.length > 0 && results[0].validado) {

                    connection.query('SELECT * FROM cita WHERE medico = ?', [id], function(err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            
                            var citas = new Array()
                            results2.forEach(cita => {
                                var resul
                                resul={
                                    "id": cita.id,
                                    "fecha": service.decrypt({text:cita.fecha,clave:cita.origen}),
                                    "hora": service.decrypt({text:cita.hora,clave:cita.origen}),
                                    "paciente": cita.paciente,
                                    "medico": cita.medico
                                }
                                citas.push(resul)
                                
                                
                            })
                            resp.status(200).send({citas:citas})
                        }
                    })
                } else {
                    resp.status(403).send({message: "No tienes autorizacion para ésta función"})
                }
            }
        })
    }
}

exports.obtenerCitasPaciente=function (pet,resp){
    var id = pet.params.id

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los parámetros es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {

                    connection.query('SELECT * FROM cita WHERE paciente = ?', [id], function(err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            var citas = new Array()
                            results2.forEach(cita => {
                                var resul={
                                    "id": cita.id,
                                    "fecha": service.decrypt({text:cita.fecha,clave:cita.origen}),
                                    "hora": service.decrypt({text:cita.hora,clave:cita.origen}),
                                    "paciente": cita.paciente,
                                    "medico": cita.medico
                                }
                                citas.push(resul)
                            })
                            resp.status(200).send({citas:citas})
                        }
                    })
                } else {
                    resp.status(404).send({message: "No se ha encontrado al usuario"})
                }
            }
        })
    }
}

exports.obtenerCitasMedicoVideo=function (pet,resp){
    var id = pet.params.id

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los parámetros es inválido o vacío"})
    }else{

        connection.query('SELECT clave,validado FROM medico m INNER JOIN usuario u ON m.id = u.id WHERE m.id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: error})
            } else {
                if(results.length > 0 && results[0].validado) {
                    connection.query('SELECT * FROM cita WHERE medico = ? AND tipo = 1', [id], function(err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0){
                                var citas = new Array()
                                results2.forEach(cita => {
                                    var resul={
                                        "id": cita.id,
                                        "fecha": service.decrypt({text:cita.fecha,clave:cita.origen}),
                                        "hora": service.decrypt({text:cita.hora,clave:cita.origen}),
                                        "paciente": cita.paciente,
                                        "medico": cita.medico
                                    }
                                    citas.push(resul)
                                })
                                resp.status(200).send({citas:citas})                                
                            }else{
                                resp.status(401).send({message: "No tienes citas"})
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

exports.obtenerCitasMedicoPresencial=function (pet,resp){
    var id = pet.params.id

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los parámetros es inválido o vacío"})
    }else{
        connection.query('SELECT clave,validado FROM medico m INNER JOIN usuario u ON m.id = u.id WHERE m.id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: error})
            } else {
                if(results.length > 0 && results[0].validado) {
                    connection.query('SELECT * FROM cita WHERE medico = ? AND tipo = 0', [id], function(err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0){
                                var citas = new Array()
                                results2.forEach(cita => {
                                    var resul={
                                        "id": cita.id,
                                        "fecha": service.decrypt({text:cita.fecha,clave:cita.origen}),
                                        "hora": service.decrypt({text:cita.hora,clave:cita.origen}),
                                        "paciente": cita.paciente,
                                        "medico": cita.medico
                                    }
                                    citas.push(resul)
                                })
                                resp.status(200).send({citas:citas})
                                
                                
                            }else{
                                resp.status(401).send({message: "No tienes citas"})
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

exports.obtenerCitasPacienteVideo=function (pet,resp){
    var id = pet.params.id

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los parámetros es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM cita WHERE paciente = ? AND tipo = 1', [id], function(err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0){
                                var citas = new Array()
                                results2.forEach(cita => {
                                    var resul={
                                        "id": cita.id,
                                        "fecha": service.decrypt({text:cita.fecha,clave:cita.origen}),
                                        "hora": service.decrypt({text:cita.hora,clave:cita.origen}),
                                        "paciente": cita.paciente,
                                        "medico": cita.medico
                                    }
                                    citas.push(resul)
                                })
                                resp.status(200).send({citas:citas})
                                
                                
                            }else{
                                resp.status(401).send({message: "No tienes citas"})
                            } 
                        }
                    })
                } else {
                    resp.status(404).send({message: "No se ha encontrado al usuario"})
                }
            }
        })
    }
}

exports.obtenerCitasPacientePresencial=function (pet,resp){
    var id = pet.params.id

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los parámetros es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM cita WHERE paciente = ? AND tipo = 0', [id], function(err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0){
                                var citas = new Array()
                                results2.forEach(cita => {
                                    var resul={
                                        "id": cita.id,
                                        "fecha": service.decrypt({text:cita.fecha,clave:cita.origen}),
                                        "hora": service.decrypt({text:cita.hora,clave:cita.origen}),
                                        "paciente": cita.paciente,
                                        "medico": cita.medico
                                    }
                                    citas.push(resul)
                                })
                                resp.status(200).send({citas:citas})
                                
                                
                            }else{
                                resp.status(401).send({message: "No tienes citas"})
                            }
                        }
                    })
                } else {
                    resp.status(404).send({message: "No se ha encontrado al usuario"})
                }
            }
        })
    }
}

exports.borrarCita=function (pet,resp){
    var id = pet.params.id
    var cita = pet.params.idCita

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los parámetros es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM cita WHERE id = ?', [cita], function(err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0){
                                if(results2[0].medico==id){
                                    connection.query('SELECT * FROM medico WHERE id = ?', [id],function (error2, results3) {
                                        if(error2) {
                                            resp.status(500).send({message: "Error en el servidor"})
                                        } else {
                                            if(results3.length > 0 && results3[0].validado) {
                                                connection.query('DELETE FROM cita WHERE id=?',[cita],function (err2, results4) {
                                                    if(err2) {
                                                        resp.status(500).send({message: err2})
                                                    } else {
                                                        resp.status(200).send({message: "Cita borrada", results4})
                                                        
                                                    }
                                                })
                                            } else {
                                                resp.status(403).send({message: "No tienes autorizacion para ésta función"})
                                            }
                                        }
                                    })
                                }else if(results2[0].paciente==id){
                                    connection.query('DELETE FROM cita WHERE id=?',[cita],function (err2, results4) {
                                        if(err2) {
                                            resp.status(500).send({message: err2})
                                        } else {
                                            resp.status(200).send({message: "Cita borrada"})
                                            
                                        }
                                    })
                                }else{
                                    resp.status(403).send({message: "No puedes borrar esta cita"})
                                }
                            }else{
                                resp.status(404).send({message: "No se ha encontrado la cita"})
                            }
                            
                        }
                    })
                } else {
                    resp.status(404).send({message: "No se ha encontrado al usuario"})
                }
            }
        })
    }
}

exports.editarCita=function (pet,resp){
    var id = pet.params.id
    var cita = pet.params.idCita
    var fecha = pet.body.fecha
    var hora = pet.body.hora

    if(id==undefined || (fecha==undefined && hora==undefined)){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM cita WHERE id = ?', [cita], function(err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0){
                                if(results2[0].medico==id){
                                    connection.query('SELECT * FROM medico WHERE id = ?', [id],function (error2, results3) {
                                        if(error2) {
                                            resp.status(500).send({message: "Error en el servidor"})
                                        } else {
                                            if(results3.length > 0 && results3[0].validado) {
                                                var fechaC = service.encrypt({text:fecha,clave:results[0].clave})
                                                var horaC = service.encrypt({text:hora,clave:results[0].clave})
                                                connection.query('UPDATE cita SET fecha = ?, hora=?, origen=? WHERE id=?',[fechaC,horaC,results[0].clave,cita],function (err2, results4) {
                                                    if(err2) {
                                                        resp.status(500).send({message: err2})
                                                    } else {
                                                        resp.status(200).send({message: "Cita actualizada", results4})
                                                        
                                                    }
                                                })
                                            } else {
                                                resp.status(403).send({message: "No tienes autorizacion para ésta función"})
                                            }
                                        }
                                    })
                                }else if(results2[0].paciente==id){
                                    var fechaC = service.encrypt({text:fecha,clave:results[0].clave})
                                    var horaC = service.encrypt({text:hora,clave:results[0].clave})
                                    connection.query('UPDATE cita SET fecha = ?, hora=?, origen=? WHERE id=?',[fechaC,horaC,results[0].clave,cita],function (err2, results4) {
                                        if(err2) {
                                            resp.status(500).send({message: err2})
                                        } else {
                                            resp.status(200).send({message: "Cita actualizada"}) 
                                        }
                                    })
                                }else{
                                    resp.status(403).send({message: "No puedes actualizar esta cita"})
                                }
                            }else{
                                resp.status(404).send({message: "No se ha encontrado la cita"})
                            }
                            
                        }
                    })
                } else {
                    resp.status(404).send({message: "No se ha encontrado al usuario"})
                }
            }
        })
    }
}