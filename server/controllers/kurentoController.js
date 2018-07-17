

//var path = require('path');
/*var ws = require('ws');
var minimist = require('minimist');
var url = require('url');
var kurento = require('kurento-client');


var argv = minimist(process.argv.slice(2), {
  default: {
      as_uri: "https://localhost:8443/",
      ws_uri: "ws://localhost:8888/kurento"
  }
});*/

// Pasarle la variable de server


var api = require('../api.js');
var sourceFile = require('../api.js');
console.log(sourceFile.variableName);

console.log(api.getServer)

exports.verServer=function(req,res){ 

	console.info(server)
	res.status(201)
}
