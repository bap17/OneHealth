var connection = require('./bd')
var service = require('../services/services')

exports.verHistorial=function(pet,resp){
    var idM = pet.params.idM
    //var idP = pet.params.idP
    var sip = pet.params.sip

    if(idM==undefined || sip==undefined){
        resp.status(400).send({message: "Alguno de los parámetros es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM usuario WHERE id = ?', [idM],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM paciente p WHERE sip=?',[sip],function (err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0) {
                                connection.query('SELECT * FROM historial_clinico h INNER JOIN paciente p ON h.id = p.id WHERE h.id=?',[results2[0].id],function (err2, results3) {
                                    if(err2) {
                                        resp.status(500).send({message: err2})
                                    } else {
                                        if(results3.length > 0) {
                                            connection.query('SELECT * FROM consulta WHERE historial=?',[results3[0].id],function (err3, results4) {
                                                if(err3) {
                                                    resp.status(500).send({message: "Error en el servidor"})
                                                } else {
                                                    if(results4.length > 0) {
                                                        var consultas = new Array()
                                                        results4.forEach(consulta => {
                                                            var resul ={
                                                                "fecha": service.decrypt({text:consulta.fecha,clave:consulta.clave_origen}),
                                                                "motivo": service.decrypt({text:consulta.motivo,clave:consulta.clave_origen}),
                                                                "enfermedad_actual": service.decrypt({text:consulta.enfermedad_actual,clave:consulta.clave_origen}),
                                                                "diagnostico": service.decrypt({text:consulta.diagnostico,clave:consulta.clave_origen}),
                                                                "tratamiento": service.decrypt({text:consulta.tratamiento,clave:consulta.clave_origen}),
                                                            }
                                                            consultas.push(resul)
                                                        })
                                                        
                                                        var resultado ={
                                                            "historial": results3[0],
                                                            "consultas anteriores": consultas
                                                        }
                                                        resp.status(200).send(resultado) 
                                                    } else {
                                                        var resultado ={
                                                            historial: results3[0],
                                                            consultas: "No tiene consultas registradas "
                                                        }
                                                        resp.status(200).send(resultado) 
                                                    }
                                                }
                                            })
                                        } else {
                                            resp.status(404).send({message: "No se ha encontrado el historial del paciente"})
                                        }
                                    }
                                })
                            } else {
                                resp.status(404).send({message: "No se han encontrado pacientes"})
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