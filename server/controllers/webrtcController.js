//webrtcController.js
var mysql = require('mysql')
var connection = require('./bd')


//Buscar un médico 
exports.buscarMedico = function(req, res) {
   var obj = req.params
    var especialidad = obj.espe
    console.log(especialidad)

    if( especialidad != null) {
        connection.query('SELECT * FROM medico as me right join usuario as us on us.id = me.id where me.especialidad = ?', [especialidad], function(err, results) {
            if(err) {
                res.status(500)
                res.send({error: "Hay un error al buscar los medicos"})
                console.log("Hay un error al buscar los medicos")
            } else {
                if(results.length > 0) {
                    var medicos = new Array()
                                               
                    for(var i = 0;  i < results.length; i++) {                                        
                        var medico = {
                            "usuario" : results[i].nombre,
                            "apellidos": results[i].apellidos
                        }
                        medicos.push(medico)
                    }
                                   
                    res.status(200)                       
                    res.send(medicos)       
                } else {
                    res.status(404)
                    res.send({error: "No hay medicos en esa especialidad"})
                }
            }
        })
    } else {
        res.status(400)
        res.send({error: "Alguno de los campos es invalido"})
    }
}

//Buscar un paciente
exports.buscarPaciente = function(req, res) {
    var obj = req.params
    var nombre = obj.nombre
    console.log(nombre)

    if( nombre != null && nombre != "") {
        connection.query('SELECT * FROM paciente as pa right join usuario as us on us.id = pa.id where us.nombre like ?', ['%'+nombre+'%'], function(err, results) {
            if(err) {
                res.status(500)
                res.send({error: "Hay un error al buscar los pacientes"})
                console.log("Hay un error al buscar los pacientes")
            } else {
                if(results.length > 0) {
                    var pacientes = new Array()
                                               
                    for(var i = 0;  i < results.length; i++) {                                        
                        var paciente = {
                            "usuario" : results[i].nombre,
                            "apellidos": results[i].apellidos
                        }
                        pacientes.push(paciente)
                    }
                                   
                    res.status(200)                       
                    res.send(pacientes) 

                    /////////////////////////////       
                } else {
                    res.status(404)
                    res.send({error: "No hay pacientes con ese nombre"})
                }
            }
        })
    } else {
        res.status(400)
        res.send({error: "Alguno de los campos es invalido"})
    }
}

