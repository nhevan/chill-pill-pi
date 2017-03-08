var schedule = require('node-schedule');

function setOffBeforeBreakfastAlarm(){
	setOffAlarm();
	console.log('Alarm to take medicines BEFORE breakfast');
}

function setOffAlarm(){
	console.log('buzzzzzzzzzzzz.....iiiinnnnggg......');
}

module.exports = {
  	setupAlarms: function (){
		console.log('preparing for alarm ...');

		var before_breakfast = '0 40 21 * * *'; //everyday at 8:30am
		schedule.scheduleJob(before_breakfast, setOffBeforeBreakfastAlarm);	

		console.log('ticking for alarm');
	}
};