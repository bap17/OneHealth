

var path = require('path');
var ws = require('ws');
var minimist = require('minimist');
var url = require('url');
var kurento = require('kurento-client');
var api = require('../api.js');

var server;
var wss;
var kurentoClient = null;

var pipelines = {};
var candidatesQueue = {};
var idCounter = 0;

var userRegistry = new UserRegistry();

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

// Represents registrar of users
function UserRegistry() {
    this.usersById = {};
    this.usersByName = {};
}

UserSession.prototype.sendMessage = function(message) {
    this.ws.send(JSON.stringify(message));
}

UserRegistry.prototype.register = function(user) {
    this.usersById[user.id] = user;
    this.usersByName[user.name] = user;
}

exports.unregister = function(id) {
    UserRegistry.prototype.unregister = function(id) {
        var user = this.getById(id);
        if (user) delete this.usersById[id]
        if (user && this.getByName(user.name)) delete this.usersByName[user.name];
    }
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



exports.register = function(id, name, ws, callback) {

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

        var response = {id: 'registerResponse', response: 'accepted'}
        api.sendMessages('messageC', response)


    } catch(exception) {
        onError(exception);
    }
}

/***************************/
/**********Socket***********/
/***************************/


exports.stop = function(sessionId) {
    if (!pipelines[sessionId]) {
        return;
    }

    var pipeline = pipelines[sessionId];
    delete pipelines[sessionId];
    pipeline.release();
    var stopperUser = userRegistry.getById(sessionId);
    var stoppedUser = userRegistry.getByName(stopperUser.peer);
    stopperUser.peer = null;

    if (stoppedUser) {
        stoppedUser.peer = null;
        delete pipelines[stoppedUser.id];
        var message = {
            id: 'stopCommunication',
            message: 'remote user hanged out'
        }
        stoppedUser.sendMessage(message)
    }

    clearCandidatesQueue(sessionId);
}






