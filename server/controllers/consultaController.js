var connection = require('./bd')
var fs = require('fs')
var service = require('../services/services')

exports.nuevaConsulta=function(pet,resp){
    var id = pet.params.id
    var sip = pet.body.sip
    var fecha = pet.body.fecha
    var motivo = pet.body.motivo
    var enf = pet.body.enfermedad
    var diag = pet.body.diagnostico
    var trat = pet.body.tratamiento

    if(id==undefined || sip==undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM Medico m INNER JOIN Usuario u ON m.id = u.id WHERE m.id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM Paciente p INNER JOIN Historial_Clinico c ON p.id=c.id WHERE p.sip=?',[sip],function (err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0) {
                                var fechaC = service.encrypt({text:fecha,clave:results[0].clave})
                                var motivoC = service.encrypt({text:motivo,clave:results[0].clave})
                                var enfC = service.encrypt({text:enf,clave:results[0].clave})
                                var diagC = service.encrypt({text:diag,clave:results[0].clave})
                                var tratC = service.encrypt({text:trat,clave:results[0].clave})
                                connection.query('INSERT INTO Consulta (historial,fecha,motivo,enfermedad_actual,diagnostico,tratamiento) VALUES(?,?,?,?,?,?)',[results2[0].id,fechaC,motivoC,enfC,diagC,tratC],function (err2, results3) {
                                    if(err2) {
                                        resp.status(500).send({message: err2})
                                    } else {
                                        resp.status(201).send({message:"La consulta se ha creado correctamente"})
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