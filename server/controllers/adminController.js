var connection = require('./bd')

exports.validarMedico=function(pet,resp){
    var id = pet.params.id
    var idMed = pet.body.medico

    if(idMed==undefined || id==undefined ) {
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM Administrador WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM Medico WHERE id = ?', [idMed], function(err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length >0){
                                connection.query('UPDATE Medico SET validado = ? WHERE id = ?', [1,idMed], function(err2, results3) {
                                    if(err2) {
                                        resp.status(500).send({message: "Error en el servidor"})
                                    } else {
                                        resp.status(200).send({message: "Medico validado"})
                                    }
                                })
                            }else{
                                resp.status(404).send({message: "No existe el medico"})
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