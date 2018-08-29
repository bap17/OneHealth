var connection = require('./bd')
var fs = require('fs')
var service = require('../services/services')

exports.nuevaConsulta=function(pet,resp){
    var id = pet.params.id
    var sip = pet.body.sip
    var fecha = (new Date()).toISOString().substring(0, 10)
    var motivo = pet.body.motivo
    var enf = pet.body.enfermedad
    var diag = pet.body.diagnostico
    var trat = pet.body.tratamiento

    if(id==undefined || sip==undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM medico m INNER JOIN usuario u ON m.id = u.id WHERE m.id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM paciente p INNER JOIN historial_clinico c ON p.id=c.id WHERE p.sip=?',[sip],function (err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0) {
                                var fechaC = service.encrypt({text:fecha,clave:results[0].clave})
                                var motivoC = service.encrypt({text:motivo,clave:results[0].clave})
                                var enfC = service.encrypt({text:enf,clave:results[0].clave})
                                var diagC = service.encrypt({text:diag,clave:results[0].clave})
                                var tratC = service.encrypt({text:trat,clave:results[0].clave})
                                connection.query('INSERT INTO consulta (historial,fecha,motivo,enfermedad_actual,diagnostico,tratamiento,clave_origen) VALUES(?,?,?,?,?,?,?)',[results2[0].id,fechaC,motivoC,enfC,diagC,tratC,results[0].clave],function (err2, results3) {
                                    if(err2) {
                                        resp.status(500).send({message: err2})
                                    } else {
                                        console.log(results3)
                                        var res = {
                                            message: "La consulta se ha creado correctamente",
                                            id: results3.insertId
                                        }
                                        resp.status(201).send(res)
                                    }
                                })
                            } else {
                                resp.status(404).send({message: "No se ha encontrado el historial del paciente"})
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