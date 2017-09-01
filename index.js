var five = require("johnny-five");
var board = new five.Board();

var udpIsReady = false;


board.on("ready", function() {
  var proximity = new five.Proximity({
    controller: "GP2Y0A21YK",
    pin: "A0"
  });

  proximity.on("data", function() {
    console.log("  cm  : ", this.cm);
    if (udpIsReady){
    udpPort.send({
        address: "/carrier/frequency",
        args: [
            {
                type: "f",
                value: this.cm
            }
        ]
    }, "127.0.0.1", 7400)

    } 
  });

 /*
  proximity.on("change", function() {
    console.log("The obstruction has moved.");
  });
*/
});



var osc = require("osc");

var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = [];

    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName];
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }

    return ipAddresses;
};

var udpPort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 57121 
});

udpPort.on("error", function (err) {
    console.log(err);
});

udpPort.open();

udpPort.on("ready", function () {
    udpIsReady = true;
    udpPort.send({
        address: "/carrier/frequency",
        args: [
            {
                type: "f",
                value: 440
            }
        ]
    }, "127.0.0.1", 7400);
});
