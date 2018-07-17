var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth')
var midd = require('../security/middleware')
var medico = require('../controllers/medicoController')
var historial = require('../controllers/historialController')
var usuario = require('../controllers/usuarioController')
var consulta = require('../controllers/consultaController')
var mensaje = require('../controllers/mensajesController')
var cita = require('../controllers/citaController')
var webrtc = require('../controllers/webrtcController')
var kurento = require('../controllers/kurentoController')


router.get('/',function (pet,resp){
    resp.status(200).send({message: 'Bienvenido'})
})

/**
 * Autentificacion
 */
router.post('/registro', auth.emailSignup)
router.post('/login', auth.emailLogin)
router.post('/login/codigo', auth.checkCode)

/**
 * Medico
 */
router.get('/medico/:id/pacientes',midd.isAuth,medico.listarPacientes)
router.get('/medico/:idM/historial/:sip',midd.isAuth,historial.verHistorial)
router.post('/medico/:id/historial/consulta',midd.isAuth,consulta.nuevaConsulta)
router.get('/medico/:id/citas', midd.isAuth, cita.obtenerCitasMedico)

/**
 * Usuario generico
 */
router.post('/usuario/:id/cita', midd.isAuth, cita.crearCita)
router.get('/usuario/:id/citas', midd.isAuth, cita.obtenerCitasPaciente)
router.put('/usuario/:id/cita/:idCita', midd.isAuth, cita.editarCita)
router.delete('/usuario/:id/cita/:idCita', midd.isAuth, cita.borrarCita)
router.put('/usuario/:id', midd.isAuth,usuario.updateUsuario)
router.put('/usuario/:id/password', midd.isAuth,usuario.updatePassword)
router.post('/usuario/:id/mensaje', midd.isAuth, mensaje.nuevoMensaje)
router.get('/usuario/:id/mensaje', midd.isAuth, mensaje.verMensajesRecibidos)
router.delete('/usuario/:id/mensaje/:idMen', midd.isAuth, mensaje.borrarMensaje)

/**
 * WebRTC
 */
router.get('/webrtc/medico/:espe',webrtc.buscarMedico)
router.get('/webrtc/paciente/:nombre',webrtc.buscarPaciente)

/**
 * Kurento
 */

router.get('/kurento',kurento.verServer)

module.exports = router