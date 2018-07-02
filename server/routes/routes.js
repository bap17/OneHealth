var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth')
var midd = require('../security/middleware')
var medico = require('../controllers/medicoController')
var historial = require('../controllers/historialController')
var usuario = require('../controllers/usuarioController')
var consulta = require('../controllers/consultaController')
var mensaje = require('../controllers/mensajesController')

router.get('/',function (pet,resp){
    resp.status(200).send({message: 'Bienvenido'})
})

/**
 * Autentificacion
 */
router.post('/registro', auth.emailSignup)
router.post('/login', auth.emailLogin)

/**
 * Medico
 */
router.get('/medico/:id/pacientes',midd.isAuth,medico.listarPacientes)
router.get('/medico/:idM/historial/:idP',midd.isAuth,historial.verHistorial)
router.post('/medico/:id/historial/:idH/consulta',midd.isAuth,consulta.nuevaConsulta)

/**
 * Usuario
 */
router.post('/usuario/:id/cita', midd.isAuth, medico.crearCita)
router.put('/usuario/:id', midd.isAuth,usuario.updateUsuario)
router.put('/usuario/:id/password', midd.isAuth,usuario.updatePassword)
router.post('/usuario/:id/mensaje', midd.isAuth, mensaje.nuevoMensaje)
router.get('/usuario/:id/mensaje', midd.isAuth, mensaje.verMensajesRecibidos)
router.delete('/usuario/:id/mensaje/:idMen', midd.isAuth, mensaje.borrarMensaje)

module.exports = router