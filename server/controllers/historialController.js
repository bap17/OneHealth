var connection = require('./bd')
var service = require('../services/services')

exports.verHistorial=function(pet,resp){
    var idM = pet.params.idM
    //var idP = pet.params.idP
    var sip = pet.params.sip

    if(idM==undefined || sip==undefined || sip==""){
        resp.status(400).send({message: "Alguno de los parámetros es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM medico WHERE id = ?', [idM],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM paciente p INNER JOIN usuario u ON p.id=u.id WHERE sip=?',[sip],function (err, results2) {
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
                                                                "id": consulta.id,
                                                                "fecha": service.decrypt({text:consulta.fecha,clave:consulta.clave_origen}),
                                                                "motivo": service.decrypt({text:consulta.motivo,clave:consulta.clave_origen}),
                                                                "enfermedad_actual": service.decrypt({text:consulta.enfermedad_actual,clave:consulta.clave_origen}),
                                                                "diagnostico": service.decrypt({text:consulta.diagnostico,clave:consulta.clave_origen}),
                                                                "tratamiento": service.decrypt({text:consulta.tratamiento,clave:consulta.clave_origen}),
                                                            }
                                                            consultas.push(resul)
                                                        })
                                                        
                                                        var historial={
                                                            "id": results3[0].id,
                                                            "sip":results3[0].sip,
                                                            "nombre": service.decrypt({text:results3[0].nombre,clave:results2[0].clave}),
                                                            "nif": service.decrypt({text:results3[0].nif,clave:results2[0].clave}),
                                                            "edad": service.decrypt({text:results3[0].edad,clave:results2[0].clave}),
                                                            "sexo": service.decrypt({text:results3[0].sexo,clave:results2[0].clave}),
                                                            "nacionalidad":service.decrypt({text:results3[0].nacionalidad,clave:results2[0].clave}),
                                                            "estado civil": service.decrypt({text:results3[0].estado_civil,clave:results2[0].clave}),
                                                            "ocupacion": service.decrypt({text:results3[0].ocupacion,clave:results2[0].clave}),
                                                            "lugar de origen": service.decrypt({text:results3[0].lugar_origen,clave:results2[0].clave}),
                                                            "domicilio": service.decrypt({text:results3[0].domicilio,clave:results2[0].clave}),
                                                            "alergias": service.decrypt({text:results3[0].alergias,clave:results2[0].clave}),
                                                            "peso": service.decrypt({text:results3[0].peso,clave:results2[0].clave}),
                                                            "altura": service.decrypt({text:results3[0].altura,clave:results2[0].clave}),
                                                            "antecedentes": service.decrypt({text:results3[0].antecedentes,clave:results2[0].clave})
                                                        }
                                                        var resultado ={
                                                            historial,
                                                            "consultas anteriores": consultas
                                                        }
                                                        resp.status(200).send(resultado) 
                                                    } else {
                                                        var historial={
                                                            "id": results3[0].id,
                                                            "sip": results3[0].sip,
                                                            "nombre": service.decrypt({text:results3[0].nombre,clave:results2[0].clave}),
                                                            "nif": service.decrypt({text:results3[0].nif,clave:results2[0].clave}),
                                                            "edad": service.decrypt({text:results3[0].edad,clave:results2[0].clave}),
                                                            "sexo": service.decrypt({text:results3[0].sexo,clave:results2[0].clave}),
                                                            "nacionalidad":service.decrypt({text:results3[0].nacionalidad,clave:results2[0].clave}),
                                                            "estado civil": service.decrypt({text:results3[0].estado_civil,clave:results2[0].clave}),
                                                            "ocupacion": service.decrypt({text:results3[0].ocupacion,clave:results2[0].clave}),
                                                            "lugar de origen": service.decrypt({text:results3[0].lugar_origen,clave:results2[0].clave}),
                                                            "domicilio": service.decrypt({text:results3[0].domicilio,clave:results2[0].clave}),
                                                            "alergias": service.decrypt({text:results3[0].alergias,clave:results2[0].clave}),
                                                            "peso": service.decrypt({text:results3[0].peso,clave:results2[0].clave}),
                                                            "altura": service.decrypt({text:results3[0].altura,clave:results2[0].clave}),
                                                            "antecedentes": service.decrypt({text:results3[0].antecedentes,clave:results2[0].clave})
                                                        }
                                                        var resultado ={
                                                            historial,
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

exports.verHistorialPaciente=function(pet,resp){
    var id = pet.params.id

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los parámetros es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM paciente p INNER JOIN usuario u ON p.id=u.id WHERE p.id=?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM historial_clinico h INNER JOIN paciente p ON h.id = p.id WHERE h.id=?',[id],function (err2, results3) {
                        if(err2) {
                            resp.status(500).send({message: err2})
                        } else {
                            if(results3.length > 0) {
                                var historial={
                                    "id": results3[0].id,
                                    "sip": results3[0].sip,
                                    "nombre": service.decrypt({text:results3[0].nombre,clave:results[0].clave}),
                                    "nif": service.decrypt({text:results3[0].nif,clave:results[0].clave}),
                                    "edad": service.decrypt({text:results3[0].edad,clave:results[0].clave}),
                                    "sexo": service.decrypt({text:results3[0].sexo,clave:results[0].clave}),
                                    "nacionalidad":service.decrypt({text:results3[0].nacionalidad,clave:results[0].clave}),
                                    "estado civil": service.decrypt({text:results3[0].estado_civil,clave:results[0].clave}),
                                    "ocupacion": service.decrypt({text:results3[0].ocupacion,clave:results[0].clave}),
                                    "lugar de origen": service.decrypt({text:results3[0].lugar_origen,clave:results[0].clave}),
                                    "domicilio": service.decrypt({text:results3[0].domicilio,clave:results[0].clave}),
                                    "alergias": service.decrypt({text:results3[0].alergias,clave:results[0].clave}),
                                    "peso": service.decrypt({text:results3[0].peso,clave:results[0].clave}),
                                    "altura": service.decrypt({text:results3[0].altura,clave:results[0].clave}),
                                    "antecedentes": service.decrypt({text:results3[0].antecedentes,clave:results[0].clave})
                                }
                                resp.status(200).send({historial})
                            } else {
                                resp.status(404).send({message: "No se ha encontrado el historial del paciente"})
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