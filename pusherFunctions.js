var Pusher = require('pusher-js/node');
var gpio = require('rpi-gpio');

var channel_name = 'my-channel';
var event_name = 'my-event';
var pusher_app_key = 'c6c89850cbcdfffb572e';

var pin = 7;
var delay = 2000;
var count = 0;
var max   = 3;

function processIncomingPush(data){
	console.log("Received new updates from server ...");
	console.log(data['cell']);

	pin = data['cell'];
	
	gpio.setup(pin, gpio.DIR_OUT, blink);
}

function blink() {
    if (count >= max) {
        gpio.destroy(function() {
            console.log('Closed pins, now exit');
        });
        return;
    }
 
    setTimeout(function() {
        gpio.write(pin, 1, off);
        count += 1;
    }, delay);
}
function off() {
    setTimeout(function() {
        gpio.write(pin, 0, on);
    }, delay);
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