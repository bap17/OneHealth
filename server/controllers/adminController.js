var connection = require('./bd')
var service = require('../services/services')

exports.validarMedico=function(pet,resp){
    var id = pet.params.id
    var idMed = pet.body.medico

    if(idMed==undefined || id==undefined ) {
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM administrador WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT * FROM medico WHERE id = ?', [idMed], function(err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length >0){
                                connection.query('UPDATE medico SET validado = ? WHERE id = ?', [1,idMed], function(err2, results3) {
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

exports.nuevoHistorial=function(pet,resp){
    var id = pet.params.id
    var idPac = pet.body.paciente
    var nombre = pet.body.nombre
    var nif = pet.body.nif
    var edad = pet.body.edad
    var sexo = pet.body.sexo
    var nacion = pet.body.nacionalidad
    var estado = pet.body.estado
    var ocupacion = pet.body.ocupacion
    var origen = pet.body.origen
    var domicilio = pet.body.domicilio
    var alergias = pet.body.alergias
    var peso = pet.body.peso
    var altura = pet.body.altura
    var antecedentes = pet.body.antecedentes
    

    if(idPac==undefined || id==undefined ) {
        resp.status(400).send({message: "Alguno de los campos es inválido o vacío"})
    }else{
        connection.query('SELECT * FROM administrador WHERE id = ?', [id],function (error, results) {
            if(error) {
                resp.status(500).send({message: "Error en el servidor"})
            } else {
                if(results.length > 0) {
                    connection.query('SELECT clave FROM usuario WHERE id = ?', [idPac], function(err, results2) {
                        if(err) {
                            resp.status(500).send({message: "Error en el servidor"})
                        } else {
                            if(results2.length >0){
                                var nombreC = service.encrypt({text:nombre,clave:results2[0].clave})
                                var nifC = service.encrypt({text:nif,clave:results2[0].clave})
                                var edadC = service.encrypt({text:edad,clave:results2[0].clave})
                                var sexoC = service.encrypt({text:sexo,clave:results2[0].clave})
                                var nacionC = service.encrypt({text: nacion,clave:results2[0].clave})
                                var estadoC = service.encrypt({text:estado,clave:results2[0].clave})
                                var ocupacionC = service.encrypt({text:ocupacion,clave:results2[0].clave})
                                var origenC = service.encrypt({text:origen,clave:results2[0].clave})
                                var domicilioC = service.encrypt({text:domicilio,clave:results2[0].clave})
                                var alergiasC = service.encrypt({text: alergias,clave:results2[0].clave})
                                var pesoC = service.encrypt({text:peso,clave:results2[0].clave})
                                var alturaC = service.encrypt({text:altura,clave:results2[0].clave})
                                var antecedentesC = service.encrypt({text: antecedentes,clave:results2[0].clave})

                                connection.query('INSERT INTO historial_clinico (id,nombre,nif,edad,sexo,nacionalidad,estado_civil,ocupacion,lugar_origen,domicilio,alergias,peso,altura,antecedentes ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                                [idPac,nombreC,nifC,edadC,sexoC,nacionC,estadoC,ocupacionC,origenC,domicilioC,alergiasC,pesoC,alturaC,antecedentesC],function (err2, results3) {
                                    if(err2) {
                                        resp.status(500).send({message: err2})
                                    } else {
                                        resp.status(201).send({message:"El historial se ha creado correctamente"})
                                    }
                                })
                            }else{
                                resp.status(404).send({message: "No existe el usuario"})
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