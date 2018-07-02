var connection = require('./bd')

exports.listarPacientes=function (pet,resp){
    var id = pet.params.id

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM Medico WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT nombre, apellidos, sip, email FROM Paciente p INNER JOIN Usuario u ON p.id = u.id',function (err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length > 0) {
                                resp.status(200).send({pacientes:results2}) 
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
                    resp.status(403).send({message: "No tienes autorizacion para ésta función"})
                }
            }
        })
    }
}