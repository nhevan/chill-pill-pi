var gpio = require('rpi-gpio');
var async = require('async');

var is_lid_closed = true;
var was_lid_opened = false;
var total_alarm_period = 10000;

gpio.on('change', function(channel, value) {
		if(value != is_lid_closed){
			if(is_lid_closed){
				console.log("lid was opened");
				was_lid_opened = true;
				gpio.write(33, false, function(err) {
			        if (err) throw err;
			        console.log('Alarm turned off.');
			    });
			}else{
				console.log("lid was closed, turning off leds");
				gpio.destroy(function() {
		            console.log('Closed pins, now exit');
		        });
			}
			is_lid_closed = value;
		}
	});


module.exports = {
  	alertPatient: function (data){
		async.parallel([
		    function(callback) {
			    console.log("setting up pin 7");
			    gpio.setup(7, gpio.DIR_OUT, callback)
		    },
		    function(callback) {
			    console.log("setting up pin 12");
			    gpio.setup(12, gpio.DIR_OUT, callback)
		    },
		    function(callback) {
			    console.log("setting up pin 13");
			    gpio.setup(13, gpio.DIR_OUT, callback)
		    },
		    function(callback) {
			    console.log("setting up pin 15");
			    gpio.setup(15, gpio.DIR_OUT, callback)
		    },
		    function(callback) {
			    console.log("setting up pin 16");
		        gpio.setup(16, gpio.DIR_OUT, callback)
		    },
		    function(callback) {
			    console.log("setting up pin 18");
			    gpio.setup(18, gpio.DIR_OUT, callback)
		    },
		    function(callback) {
			    console.log("setting up pin 22");
			    gpio.setup(22, gpio.DIR_OUT, callback)
		    },
		    function(callback) {
			    console.log("setting up pin 31");
			    gpio.setup(31, gpio.DIR_OUT, callback)
		    },
		    function(callback) {
			    console.log("setting up pin 32");
			    gpio.setup(32, gpio.DIR_OUT, callback)
		    },
		    function(callback) {
			    console.log("setting up pin 33");
			    gpio.setup(33, gpio.DIR_OUT, callback)
		    },
		], function(err, results) {
		    console.log('Pins set up');
		    turnOn(data);
		});
	},
	buzz: function(){
		gpio.setup(33, gpio.DIR_OUT, function(){
			gpio.write(33, true, function(){
				setTimeout(function() {
					gpio.write(33, false, function(){});
				}, 3000);
			});
		});
		checkLEDs();
	}
};

function turnPinOn($pin){
	gpio.setup($pin, gpio.DIR_OUT, function(){
		gpio.write($pin, true, function(){});
	});
}

function turnPinOff($pin){
	gpio.write($pin, false, function(){});
}

function checkLEDs(){
	turnPinOn(7);
	turnPinOn(12);
	turnPinOn(13);
	turnPinOn(15);
	turnPinOn(16);
	turnPinOn(18);
	turnPinOn(22);
	turnPinOn(31);
	turnPinOn(32);

	setTimeout(function(){
		turnPinOff(7);
		turnPinOff(12);
		turnPinOff(13);
		turnPinOff(15);
		turnPinOff(16);
		turnPinOff(18);
		turnPinOff(22);
		turnPinOff(31);
		turnPinOff(32);
	}, 3000);
}

function turnOn(data){
	async.series([
        function(callback) {
            instantWrite(7, data['cell1'], callback);
        },
        function(callback) {
            instantWrite(12, data['cell2'], callback);
        },
        function(callback) {
            instantWrite(13, data['cell3'], callback);
        },
        function(callback) {
            instantWrite(15, data['cell4'], callback);
        },
        function(callback) {
            instantWrite(16, data['cell5'], callback);
        },
        function(callback) {
            instantWrite(18, data['cell6'], callback);
        },
        function(callback) {
            instantWrite(22, data['cell7'], callback);
        },
        function(callback) {
            instantWrite(31, data['cell8'], callback);
        },
        function(callback) {
            instantWrite(32, data['cell9'], callback);
        },
        function(callback) {
            instantWrite(33, true, callback);
        },
		function(callback){
			instantWrite(29, true, callback);
			startListingtoLid();
		}
    ], function(err, results) {
        console.log('Writes complete, pause then unexport pins');
        
        turnOff();
    });
}

function startListingtoLid(){
	console.log("turning on lid listener");
	
	gpio.setup(11, gpio.DIR_IN, gpio.EDGE_BOTH);
}

function turnOff(){
	console.log("turning off ...");
	
	setTimeout(function() {
		if(!was_lid_opened){
			console.log("send notification to Emergency contact about a missed dose.");
		}else{
			console.log("No need to send notification to Emergency contact.");
			was_lid_opened = false;
		}
        // gpio.destroy(function() {
        //     console.log('Closed pins, now exit');
        // });
        gpio.write(33, false, function(){});
    }, total_alarm_period);
}

function instantWrite(pin, value, callback) {
    console.log(`pin ${pin} is set to ${value}`);
    gpio.write(pin, value, callback);
}