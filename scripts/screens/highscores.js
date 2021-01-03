Midterm.screens['high-scores'] = (function(game) {
    'use strict';
    
    function initialize() {
        console.log("initializing highscores");
        document.getElementById('id-high-scores-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
    }

    function displayScores() {
		var highScores = Midterm.systems.Highscores.getScores(),
			highScoresHTML = document.getElementById('high-scores-list');

		//
		// Clear whatever was already in the display
		highScoresHTML.innerHTML = '';
		//
		// Grab the previously saved high scores and get them displayed
		highScores.forEach(function (score) {
			highScoresHTML.innerHTML += (score + '<br/>');
		});
    }
    
    function displayTimes() {
		var highTimes = Midterm.systems.Highscores.getTimes(),
			highTimesHTML = document.getElementById('high-times-list');

		//
		// Clear whatever was already in the display
		highTimesHTML.innerHTML = '';
		//
		// Grab the previously saved high scores and get them displayed
		highTimes.forEach(function (time) {
			highTimesHTML.innerHTML += (time + '<br/>');
		});
	}
    
    function run() {
        //
        // I know this is empty, there isn't anything to do.
        displayScores();
        displayTimes();
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(Midterm.game));
