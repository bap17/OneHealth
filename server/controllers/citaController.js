var connection = require('./bd')
var service = require('../services/services')

exports.crearCita=function (pet,resp){
    var id = pet.params.id
    var fecha = pet.body.fecha
    var hora = pet.body.hora
    var medico = pet.body.medico//verificar si es necesario
    var sip = pet.body.paciente


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
                            service.cifrar({fecha,id})
                            connection.query('INSERT INTO cita (fecha, hora, paciente,medico) VALUES(?,?,?,?)', [fecha,hora,result[0].id,medico], function(err2, result2) {
                                if(err2) {
                                    resp.status(500).send({message: "Error en el servidor1"})
                                } else {
                                    resp.status(201).send({message:"La cita se ha registrado correctamente"})
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
        connection.query('SELECT * FROM medico WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0 && results[0].validado) {
                    connection.query('SELECT * FROM cita WHERE medico = ?', [id], function(err, citas) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            resp.status(200).send({citas})
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
                    connection.query('SELECT * FROM cita WHERE paciente = ?', [id], function(err, citas) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            resp.status(200).send({citas})//TODO: que no aparezca la fecha completa
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
                                                connection.query('DELETE FROM Cita WHERE id=?',[cita],function (err2, results4) {
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
                                    connection.query('DELETE FROM Cita WHERE id=?',[cita],function (err2, results4) {
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
                                                connection.query('UPDATE Cita SET fecha = ?, hora=? WHERE id=?',[fecha,hora,cita],function (err2, results4) {
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
                                    connection.query('UPDATE Cita SET fecha = ?, hora=? WHERE id=?',[fecha,hora,cita],function (err2, results4) {
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