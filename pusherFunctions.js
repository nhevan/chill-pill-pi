var Pusher = require('pusher-js/node');
var triggers = require('./triggers');

var channel_name = 'my-channel';
var event_name = 'my-event';
var pusher_app_key = 'c6c89850cbcdfffb572e';

var pin = 7;
var delay = 500;
var count = 0;
var max   = 3;

function processIncomingPush(data){
	console.log("Received new updates from server ...");
	console.log(data);

	if(data['type'] == 'sync'){
		console.log('synching ...');
		triggers.setupTriggers(data['cron_formatted_schedule']);
	}

	if(data['type'] == 'Current Dose'){
		console.log('incoming dose alert ...');
	}

	pin = data['cell'];
}

function preparePusher(){
	console.log('preparing pusher ...');
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

module.exports = {
	startListeningToPusher: function (){
		var pusher = preparePusher();
		subscribeToChannel(pusher);
	}
};