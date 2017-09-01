var five = require("johnny-five");
var board = new five.Board();
var osc = require("osc");
var WebSocket = require("ws");

board.on("ready", function() {
  var proximity = new five.Proximity({
    controller: "GP2Y0A21YK",
    pin: "A0"
  });

  proximity.on("data", function() {
    console.log("  cm  : ", this.cm);
    if (udpIsReady){
        wss.send({
            address: "/carrier/frequency",
            args: [
                {
                    type: "f",
                    value: this.cm
                }
            ]
        });
    } 
  });

 /*
  proximity.on("change", function() {
    console.log("The obstruction has moved.");
  });
*/
});

var wss = new WebSocket.Server({
        port: 8081
});

wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    var socketPort = new osc.WebSocketPort({
        socket: socket
    });
    udpIsReady = true;
});
