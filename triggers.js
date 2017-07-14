var schedule = require('node-schedule');
var Pusher = require('pusher-js/node');

function callServerForCurrentDoses(){
	setOffAlarm();
	console.log('Alarm to take medicines BEFORE breakfast');
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