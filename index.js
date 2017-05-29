var express = require("express");
var pi3_pusher = require('./pusherFunctions');
// var alarms = require('./alarms');

var app = express();

pi3_pusher.startListeningToPusher();
// alarms.setupAlarms();


