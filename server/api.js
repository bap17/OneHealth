var express = require('express')
var fs = require ('fs')
var https= require ('https')
var path = require ('path')
var logger = require('morgan')
var bp = require('body-parser')
var rutas = require ('./routes/routes')

var app = express()
app.use(bp.json())
app.use(logger('dev'))
app.use(rutas)
var server = null





var httpsOptions ={
    cert:fs.readFileSync(path.join(__dirname,'security','server.crt')),
    key: fs.readFileSync(path.join(__dirname,'security','server.key'))
}

server = https.createServer(httpsOptions, app).listen(3000, function(){
    console.log("Servidor arrancado")
})

function getServer() {
	return server;
}


module.exports.getServer = getServer;
module.exports.variableName = "variableValue";