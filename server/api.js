var express = require('express')
var fs = require ('fs')
var https= require ('https')
var path = require ('path')
var logger = require('morgan')
var bp = require('body-parser')
var rutas = require ('./routes/routes')
var cors = require('cors')

var kurento = require('./controllers/kurentoController')


//io.set('origins', "https://localhost:8443")
//var ws = require('ws');

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
  socket.on('message', function(msg){
    console.log('message: ' + msg);
  });
});


/*
 wss = new ws.Server({
        server :server1,
        path : '/one2one'
    });





   
    //console.log("este es el ws server :")
    //console.log(wss)


	wss.on('connection', function(ws) {

        console.log("he entrado al connection")

        var sessionId = nextUniqueId();
        console.log('Connection received with sessionId ' + sessionId);

        ws.on('error', function(error) {
            console.log('Connection ' + sessionId + ' error');
           // stop(sessionId);
        });

        ws.on('close', function() {
            console.log('Connection ' + sessionId + ' closed');
            //stop(sessionId);
            //userRegistry.unregister(sessionId);
        });

        ws.on('message', function(_message) {
        	console.log("he entrado al message!!!!")
            var message = JSON.parse(_message);
            console.log('Connection ' + sessionId + ' received message ', message);

            switch (message.id) {
            case 'register':
                kurento.register(sessionId, message.name, ws);

                break;
            default:
                ws.send(JSON.stringify({
                    id : 'error',
                    message : 'Invalid message ' + message
                }));
                break;
            }

        });
    });


*/
exports.getServer = function() {return server}







