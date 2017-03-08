var express = require("express");
var Pusher = require('pusher-js/node');
var app = express();
var port = 3700;
var channel_name = 'my-channel';
var event_name = 'my-event';
var pusher_app_key = 'c6c89850cbcdfffb572e';

startListeningToPusher();

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
	console.log('ready ...');
	channel.bind(event_name, function(data) {
		processIncomingPush(data);
	});
}

function processIncomingPush(data){
	console.log(data);
}