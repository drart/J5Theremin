var five = require("johnny-five");
var osc = require("osc");
var WebSocket = require('ws');
var express = require('express');

///////////////////////////////////////
// Express webserver SETUP
///////////////////////////////////////
var app = express();
app.use( "/", express.static(__dirname) );
app.listen(8000);


///////////////////////////////////////
// Johnny-Five.js SETUP
///////////////////////////////////////
var board = new five.Board();
board.on("ready", function() {

  var proximity = new five.Proximity({
    controller: "GP2Y0A21YK",
    pin: "A0"
  });
  proximity.on("data", function() {
    if (oscIsReady){
    console.log("  cm  : ", this.cm);
    oscPort.send({
        address: "/proximity/1",
        args: [
            {
                type: "f",
                value: this.cm
            }
        ]
        })
    } 
  });


  var prox2  = new five.Proximity({
    controller: "GP2Y0A21YK",
    pin: "A1"
  });
  prox2.on("data", function() {
    //console.log("  cm  : ", this.cm);
    if (oscIsReady){
    oscPort.send({
        address: "/proximity/2",
        args: [
            {
                type: "f",
                value: this.cm
            }
        ]
        }, "127.0.0.1", 7400)
    } 
  });

  var prox3 = new five.Proximity({
    controller: "GP2Y0A21YK",
    pin: "A2"
  });
  prox3.on("data", function() {
    //console.log("  cm  : ", this.cm);
    if (oscIsReady){
    oscPort.send({
        address: "/proximity/3",
        args: [
            {
                type: "f",
                value: this.cm
            }
        ]
        }, "127.0.0.1", 7400)
    } 
  });

  var prox4 = new five.Proximity({
    controller: "GP2Y0A21YK",
    pin: "A3"
  });
  prox4.on("data", function() {
    //console.log("  cm  : ", this.cm);
    if (oscIsReady){
    oscPort.send({
        address: "/proximity/4",
        args: [
            {
                type: "f",
                value: this.cm
            }
        ]
        }, "127.0.0.1", 7400)
    } 
  });

});

///////////////////////////////////////
// OSC.js SETUP
///////////////////////////////////////

var wss = new WebSocket.Server({ port: 8081 });
var oscPort = undefined;
var oscIsReady = false;

wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    oscPort = new osc.WebSocketPort({
        socket: socket
    });


	oscPort.open();
	oscIsReady = true;
});
