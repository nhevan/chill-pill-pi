var Pusher = require('pusher-js/node');

var channel_name = 'my-channel';
var event_name = 'my-event';
var pusher_app_key = 'c6c89850cbcdfffb572e';

function processIncomingPush(data){
	console.log("Received new updates from server ...");
	console.log(data);
}

module.exports = {
  preparePusher: function (){
	console.log('preparing pusher ...');
	var pusher = new Pusher(pusher_app_key, {
		cluster: 'ap1',
		encrypted: true
	});
	return pusher;
},
  subscribeToChannel: function (pusher){
	var channel = pusher.subscribe(channel_name);
	console.log('listening for updates from server ...');
	channel.bind(event_name, function(data) {
		processIncomingPush(data);
	});
}
};