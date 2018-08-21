var express = require('express')
var fs = require ('fs')
var https= require ('https')
var path = require ('path')
var logger = require('morgan')
var bp = require('body-parser')
var rutas = require ('./routes/routes')
var cors = require('cors')

var kurento = require('./controllers/kurentoController')



var app = express()
app.use(cors())
app.use(bp.json())
app.use(logger('dev'))
app.use(rutas)

var idCounter = 0;


function nextUniqueId() {
    idCounter++;
    return idCounter.toString();
}



var httpsOptions ={
    cert:fs.readFileSync(path.join(__dirname,'security','server.crt')),
    key: fs.readFileSync(path.join(__dirname,'security','server.key'))
}

var server1 = https.createServer(httpsOptions, app).listen(3000, function(){
    console.log("Servidor arrancado")

})

var io = require('socket.io')(https).listen(server1)
io.set('transports', ['websocket'])



io.on('connection', function(socket){

    var sessionId = nextUniqueId();
    console.log('Connection received with sessionId ' + sessionId);

    io.on('error', function(error) {
        console.log('Connection ' + sessionId + ' error');
        kurento.stop(sessionId);
    });

    io.on('close', function() {
        console.log('Connection ' + sessionId + ' closed');
        kurento.stop(sessionId);
        kurento.unregister(sessionId);
    });
    socket.on('message', function(msg){
        var message = msg
        //console.log('Connection ' + sessionId + ' received message ', message);

        switch (message.id) {
        case 'register':
            kurento.register(sessionId, message.name, io);
            break;
        case 'call':
            kurento.call(sessionId, message.to, message.from, message.sdpOffer, io);
            break;
        case 'onIceCandidate':            
            kurento.onIceCandidate(sessionId, message.candidate);
            break;
        case 'incomingCallResponse':
            console.log("///////////////estoy en incommingCallResponse///////////////////////////")
            kurento.incomingCallResponse(sessionId, message.from, message.callResponse, message.sdpOffer, io);
            break;
        case 'stop':
            kurento.stop(sessionId, io);
            break;
        case 'userToken':
            getToken(message);
            break;
        case 'reponseToken':
            resposeToken(message);
            break;
        default:
           var error = {
                id : 'error',
                message : 'Invalid message ' + message
            }

            console.log(error)
            
            break;
        }
    });
});


exports.sendMessages = function(destino, message) {
    console.log("envio : ")

    console.log(message)
    io.emit(destino, message)

}

function getToken(message) {

    console.log(message)
    var idUser = message.userRemote
    console.log(idUser)

    io.emit('User'+ idUser, message)

}

function resposeToken(message) {

    console.log(message)
    var idUser = message.iniciador
    console.log(idUser)

    io.emit('Response'+ idUser, message)

}

exports.getServer = function() {return server}







