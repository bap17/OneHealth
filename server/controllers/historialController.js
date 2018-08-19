var connection = require('./bd')

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
                                connection.query('SELECT * FROM historial_clinico h INNER JOIN Paciente p ON h.id = p.id WHERE h.id=?',[results2[0].id],function (err2, results3) {
                                    if(err2) {
                                        resp.status(500).send({message: err2})
                                    } else {
                                        if(results3.length > 0) {
                                            connection.query('SELECT * FROM consulta WHERE historial=?',[results3[0].id],function (err3, results4) {
                                                if(err3) {
                                                    resp.status(500).send({message: "Error en el servidor"})
                                                } else {
                                                    if(results4.length > 0) {
                                                        var consultas ={
                                                            "consultas": results4
                                                        }
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
                    resp.status(403).send({message: "No tienes autorizacion para ésta función"})
                }
            }
        })
    }
}