var express = require("express");
var Pusher = require('pusher-js/node');
var app = express();
var port = 3700;

var pusher = new Pusher('c6c89850cbcdfffb572e', {
  cluster: 'ap1',
  encrypted: true
});
var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  console.log(data);
});