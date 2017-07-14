var schedule = require('node-schedule');
var Pusher = require('pusher-js/node');
var axios = require('axios');

function callServerForCurrentDoses(){
	console.log('Sending request to server for current dose info');
	axios.get('http://chill.dev/api/get-current-dose')
	  .then(function (response) {
	    
	  })
	  .catch(function (error) {
	    console.log(error);
	  });

	console.log('Current dose request sent to server.');
}

function setOffAlarm(){
	console.log('buzzzzzzzzzzzz.....iiiinnnnggg......');
}

module.exports = {
  	setupTriggers: function (cron_format){
		console.log('preparing triggers ...');

		var before_breakfast = cron_format; //everyday at 8:30am

		schedule.scheduleJob(before_breakfast, callServerForCurrentDoses);	

		console.log('all triggers set.');
	}
};