// ------------------------------------------------------------------
//
// High scores implementation.  Behind the abstraction localStorage is
// used for client-side persistence.
//
// ------------------------------------------------------------------
Midterm.systems.Highscores = (function() {
	'use strict';

	var Constants = {
		get MinScores() { return 5; },
		get StorageNameScores() { return 'Midterm.systems.highScores'; },
		get StorageNameTimes() { return 'Midterm.systems.highTimes'; }

	};

	var scores = [],
		previousScores = localStorage.getItem(Constants.StorageNameScores);

	var times = [],
		previousTimes = localStorage.getItem(Constants.StorageNameTimes);

	if (previousScores !== null) {
		scores = JSON.parse(previousScores);
	}
	if(previousTimes!== null){
		times = JSON.parse(previousTimes);
	}

	// ------------------------------------------------------------------
	//
	// Public method that allows client code to report a new score.  The
	// score may or may not be kept, depending upon whether or not it is
	// one of the top scores.
	//
	// ------------------------------------------------------------------
	function addScore(score) {
		scores.push(score);
		scores.sort(function(a, b) {
			if (a > b) {
				return -1;
			} else if (a < b) {
				return 1;
			}

			return 0;
		});

		//
		// Keep only the best five
		if (scores.length > Constants.MinScores) {
			scores = scores.slice(0, Constants.MinScores);
		}

		localStorage[Constants.StorageNameScores] = JSON.stringify(scores);
	}

	function addTime(time) {
		times.push(time);
		times.sort(function(a, b) {
			if (a > b) {
				return -1;
			} else if (a < b) {
				return 1;
			}

			return 0;
		});

		//
		// Keep only the best five
		if (times.length > Constants.MinScores) {
			times = scores.slice(0, Constants.MinScores);
		}

		localStorage[Constants.StorageNameTimes] = JSON.stringify(times);
	}

	function clear(){
		scores = [];
		times = [];
		localStorage[Constants.StorageNameScores] = JSON.stringify(scores);
		localStorage[Constants.StorageNameTimes] = JSON.stringify(times);

	}

	function getScores() {
		return scores;
	}
	function getTimes() {
		return times;
	}

	let api = {
		addScore: addScore,
		addTime: addTime,
		getScores: getScores,
		getTimes: getTimes,
		clear: clear,
    };

    return api;
}());
