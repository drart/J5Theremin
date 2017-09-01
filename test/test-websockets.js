var osc = require("osc");
var WebSocket = require("ws");

var wss = new WebSocket.Server({
        port: 8081
});

wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    var socketPort = new osc.WebSocketPort({
        socket: socket
    });
    socketPort.send({
        address: "/carrier/lsls",
        args: [{
            type: "f",
            value: 100.38101
        }]
    });
});
