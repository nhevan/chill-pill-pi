var express = require("express");
var pi3_pusher = require('./pusherFunctions');
var schedule = require('node-schedule');

var app = express();

startListeningToPusher();
setupAlarms();

function startListeningToPusher(){
	var pusher = pi3_pusher.preparePusher();
	pi3_pusher.subscribeToChannel(pusher);
}

function setupAlarms(){
	console.log('preparing for alarm ...');

	var before_breakfast = '0 40 21 * * *'; //everyday at 8:30am
	schedule.scheduleJob(before_breakfast, setOffBeforeBreakfastAlarm);	

	console.log('ticking for alarm');
}

function setOffBeforeBreakfastAlarm(){
	setOffAlarm();
	console.log('Alarm to take medicines BEFORE breakfast');
}

function setOffAlarm(){
	console.log('buzzzzzzzzzzzz.....iiiinnnnggg......');
}