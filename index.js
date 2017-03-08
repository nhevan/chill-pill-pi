var express = require("express");
var Pusher = require('pusher-js/node');
var schedule = require('node-schedule');
var app = express();

var channel_name = 'my-channel';
var event_name = 'my-event';
var pusher_app_key = 'c6c89850cbcdfffb572e';

startListeningToPusher();
setupAlarms();

function startListeningToPusher(){
	var pusher = preparePusher();
	subscribeToChannel(pusher);
}

function preparePusher(){
	console.log('preparing ...');
	var pusher = new Pusher(pusher_app_key, {
		cluster: 'ap1',
		encrypted: true
	});
	return pusher;
}

function subscribeToChannel(pusher){
	var channel = pusher.subscribe(channel_name);
	console.log('listening for updates from server ...');
	channel.bind(event_name, function(data) {
		processIncomingPush(data);
	});
}

function processIncomingPush(data){
	console.log(data);
}

function setupAlarms(){
	console.log('preparing for alarm ...');

	var before_breakfast = '0 30 8 * * *'; //everyday at 8:30am
	schedule.scheduleJob(before_breakfast, function(){
	  console.log('8:30pm');
	});	

}
