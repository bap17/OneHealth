var connection = require('./bd')

exports.listarPacientes=function (pet,resp){
    var id = pet.params.id

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM medico WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT nombre, apellidos, sip, email, username FROM paciente p INNER JOIN usuario u ON p.id = u.id',function (err, results2) {
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

exports.listarMedicos=function (pet,resp){
    var id = pet.params.id

    if(id==undefined){
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM usuario WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT nombre, apellidos, p.id FROM medico p INNER JOIN usuario u ON p.id = u.id',function (err, results2) {
                        if(err) {
                            resp.status(500).send({message: err})
                        } else {
                            if(results2.length > 0) {
                                resp.status(200).send({medicos:results2}) 
                            } else {
                                resp.status(404).send({message: "No se han encontrado medicos"})
                            }
                        }
                    })
                } else {
                    resp.status(404).send({message: "No se ha encontrado el usuario"})
                }
            }
        })
    }
}

exports.listarEspecialidades=function (pet,resp){
  
 
    connection.query('SELECT DISTINCT nombre FROM especialidad',function (err, results2) {
        if(err) {
            resp.status(500).send({message: err})
        } else {
            if(results2.length > 0) {
                resp.status(200).send({especialidades:results2}) 
            } else {
                resp.status(404).send({message: "No se han encontrado especialidades"})
            }
        }
    })
            
        
    
    
}