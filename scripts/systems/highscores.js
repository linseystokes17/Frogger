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
		get StorageName() { return 'Midterm.systems.highScores'; }
	};

	var scores = [],
		previousScores = localStorage.getItem(Constants.StorageName);

	if (previousScores !== null) {
		scores = JSON.parse(previousScores);
	}

	// ------------------------------------------------------------------
	//
	// Public method that allows client code to report a new score.  The
	// score may or may not be kept, depending upon whether or not it is
	// one of the top scores.
	//
	// ------------------------------------------------------------------
	function add(score) {
		scores.push(score);
		scores.sort(function(a, b) {
			if (a < b) {
				return -1;
			} else if (a > b) {
				return 1;
			}

			return 0;
		});

		//
		// Keep only the best five
		if (scores.length > Constants.MinScores) {
			scores = scores.slice(0, Constants.MinScores);
		}

		localStorage[Constants.StorageName] = JSON.stringify(scores);
	}

	function clear(){
		scores = [];
		localStorage[Constants.StorageName] = JSON.stringify(scores);
	}

	function get() {
		return scores;
	}

	let api = {
		add: add,
		get: get,
		clear: clear,
    };

    return api;
}());
