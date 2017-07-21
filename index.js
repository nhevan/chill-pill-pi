var express = require("express");
var pi3_pusher = require('./pusherFunctions');
// var alarms = require('./alarms');
 
var app = express();
 
//pi3_pusher.startListeningToPusher();
// alarms.setupAlarms();
 
var gpio = require('rpi-gpio');
var async = require('async');
var is_lid_closed = true;
var was_lid_opened = false;

gpio.on('change', function(channel, value) {
        //console.log('Channel ' + channel + ' value is now ' + value);
        if(value != is_lid_closed){
            if(is_lid_closed){
                console.log("lid was opened");
                was_lid_opened = true;
            }else{
                console.log("lid was closed, turning off leds");
                gpio.destroy(function() {
                    console.log('Closed pins, now exit');
                });
            }
            is_lid_closed = value;
        }
    });
 
async.parallel([
    function(callback) {
        console.log("setting up pin 7");
        gpio.setup(7, gpio.DIR_OUT, callback)
    },
    function(callback) {
        console.log("setting up pin 15");
        gpio.setup(15, gpio.DIR_OUT, callback)
    },
    function(callback) {
        console.log("setting up pin 16");
        gpio.setup(16, gpio.DIR_OUT, callback)
    },
], function(err, results) {
    console.log('Pins set up');
    turnOn();
});

function turnOn(){
    async.series([
        function(callback) {
            instantWrite(7, true, callback);
        },
        function(callback) {
            instantWrite(15, true, callback);
        },
        function(callback) {
            instantWrite(16, true, callback);
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
        }
        gpio.destroy(function() {
            console.log('Closed pins, now exit');
        });
    }, 10000);
}

function instantWrite(pin, value, callback) {
    console.log(`pin ${pin} is set to ${value}`);
    gpio.write(pin, value, callback);
}