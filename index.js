var express = require("express");
var pi3_pusher = require('./pusherFunctions');
var alarms = require('./alarms');

var app = express();

startListeningToPusher();
alarms.setupAlarms();

function startListeningToPusher(){
	var pusher = pi3_pusher.preparePusher();
	pi3_pusher.subscribeToChannel(pusher);
}
