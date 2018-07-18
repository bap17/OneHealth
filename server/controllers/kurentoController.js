

var path = require('path');
var ws = require('ws');
var minimist = require('minimist');
var url = require('url');
var kurento = require('kurento-client');
var api = require('../api.js');

var server;
var wss;
var kurentoClient = null;
var userRegistry = new UserRegistry();
var pipelines = {};
var candidatesQueue = {};
var idCounter = 0;

function nextUniqueId() {
    idCounter++;
    return idCounter.toString();
}



// Represents caller and callee sessions
function UserSession(id, name, ws) {
    this.id = id;
    this.name = name;
    this.ws = ws;
    this.peer = null;
    this.sdpOffer = null;
}

UserSession.prototype.sendMessage = function(message) {
    this.ws.send(JSON.stringify(message));
}

// Represents registrar of users
function UserRegistry() {
    this.usersById = {};
    this.usersByName = {};
}

UserRegistry.prototype.register = function(user) {
    this.usersById[user.id] = user;
    this.usersByName[user.name] = user;
}

UserRegistry.prototype.unregister = function(id) {
    var user = this.getById(id);
    if (user) delete this.usersById[id]
    if (user && this.getByName(user.name)) delete this.usersByName[user.name];
}

UserRegistry.prototype.getById = function(id) {
    return this.usersById[id];
}

UserRegistry.prototype.getByName = function(name) {
    return this.usersByName[name];
}

UserRegistry.prototype.removeById = function(id) {
    var userSession = this.usersById[id];
    if (!userSession) return;
    delete this.usersById[id];
    delete this.usersByName[userSession.name];
}



/*
    console.log("hola he entrado")

     console.log("hola he entrado")

    wss = new ws.Server({
        server : api.getServer(),
        path : '/one2one'
    });


     res.status(200)
     res.send("hola")




   
    //console.log("este es el ws server :")
    //console.log(wss)


	wss.on('connection', function(ws) {

        console.log("he entrado al connection")

        var sessionId = nextUniqueId();
        console.log('Connection received with sessionId ' + sessionId);

        ws.on('error', function(error) {
            console.log('Connection ' + sessionId + ' error');
            stop(sessionId);
        });

        ws.on('close', function() {
            console.log('Connection ' + sessionId + ' closed');
            stop(sessionId);
            userRegistry.unregister(sessionId);
        });

        ws.on('message', function(_message) {
            var message = JSON.parse(_message);
            console.log('Connection ' + sessionId + ' received message ', message);

            switch (message.id) {
            case 'register':
                register(sessionId, message.name, ws);

                break;

            case 'call':
                call(sessionId, message.to, message.from, message.sdpOffer);
                break;

            case 'incomingCallResponse':
                incomingCallResponse(sessionId, message.from, message.callResponse, message.sdpOffer, ws);
                break;

            case 'stop':
                stop(sessionId);
                break;

            case 'onIceCandidate':
                onIceCandidate(sessionId, message.candidate);
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




exports.register = function(id, name, ws, callback) {

    console.log("estoy en registro")
    function onError(error) {
        ws.send(JSON.stringify({id:'registerResponse', response : 'rejected ', message: error}));
    }

    if (!name) {
        return onError("empty user name");
    }

    if (userRegistry.getByName(name)) {
        return onError("User " + name + " is already registered");
    }

    userRegistry.register(new UserSession(id, name, ws));
    try {
        console.log("estoy en la funcion de registro")
        ws.send(JSON.stringify({id: 'registerResponse', response: 'accepted'}));

    } catch(exception) {
        onError(exception);
    }
}






