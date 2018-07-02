var connection = require('./bd')

exports.verHistorial=function(pet,resp){
    var idM = pet.params.idM
    var idP = pet.params.idP

    if(idM==undefined || idP==undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM Medico WHERE id = ?', [idM],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM Paciente p WHERE id=?',[idP],function (err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0) {
                                connection.query('SELECT * FROM Historial_Clinico h INNER JOIN Paciente p ON h.id = p.id',function (err2, results3) {
                                    if(err2) {
                                        resp.status(500).send({message: "Error en el servidor"})
                                    } else {
                                        if(results3.length > 0) {
                                            resp.status(200).send(results3[0]) 
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