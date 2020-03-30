/**************Changes needed in this file*********************/




//------------------------------------------------------------------
//
// This namespace holds the game model.
//
//------------------------------------------------------------------
Game.model = (function(components, graphics, input) {
	'use strict';

	var score,
		elapsedCountdown = 3000,
		internalUpdate,
		internalRender,
		keyboard = input.Keyboard(),
		//particleSystem = ParticleSystem(graphics),
		textGameOver = {
			font: '128px Arial, sans-serif',
			fill: 'rgba(100, 0, 255, 1)',
			stroke: 'rgba(0, 0, 0, 1)',
			text: 'Game Over'
		};

	//------------------------------------------------------------------
	//
	// Create default settings for mageObjects
	//
	//------------------------------------------------------------------
	function initializeGameObjects() {
		// paddle = components.Paddle({
		// 	color: 'rgba(0, 0, 255, 1)',
		// 	view: { width: 800, height: 600 },
		// 	moveRate: 350 / 1000	// pixels per millisecond
		// });

		// ball = components.Ball({
		// 	color: 'rgba(255, 0, 0, 1)',
		// 	view: { width: 800, height: 600 },
		// 	direction : { x: 0.5, y: -0.5},
		// 	moveRate: 300 / 1000 // pixels per millisecond
		// });

		keyboard.registerCommand(KeyEvent.DOM_VK_LEFT, object.moveLeft);
		keyboard.registerCommand(KeyEvent.DOM_VK_RIGHT, object.moveRight);
	}

	//------------------------------------------------------------------
	//
	// Prepares a newly initialized game model, ready for the start of
	// the game.
	//
	//------------------------------------------------------------------
	function initialize() {
		//
		// Prepare the game over rendering position
		var textWidth = graphics.measureTextWidth(textGameOver),
			textHeight = graphics.measureTextHeight(textGameOver);
		textGameOver.position = { x: 800 / 2 - textWidth / 2, y: 600 / 2 - textHeight };

		initializeGameObjects();

		score = {
			total: 0,
			position: {x: 10, y: 10 },
			font: '32px Arial, sans-serif',
			fill: 'rgba(0, 0, 0, 1)',
			text: ''
		};

		//
		// Start in the countdown state
		elapsedCountdown = 3000;
		internalUpdate = updateCountdown;
		internalRender = renderCountdown;
	}

	//------------------------------------------------------------------
	//
	// Draw how many paddles remain
	//
	//------------------------------------------------------------------
	// function renderPaddlesRemaining() {
	// 	var item,
	// 		left = 800 - ((paddle.width + 10) * 3);

	// 	for (var item = 0; item < paddlesRemaining; item += 1) {
	// 		graphics.drawRectangle({
	// 			x: left,
	// 			y: components.Constants.PaddleOffset,
	// 			width: paddle.width,
	// 			height: components.Constants.PaddleHeight,
	// 			fill: 'rgba(0, 0, 255, 1)',
	// 			stroke: 'rgba(0, 0, 0, 1)'
	// 		});

	// 		left += (paddle.width + 10);
	// 	}
	// }

	//------------------------------------------------------------------
	//
	// Draw the current score
	//
	//------------------------------------------------------------------
	function renderScore() {
		score.text = 'Score: ' + score.total;
		graphics.drawText(score);
	}

	//------------------------------------------------------------------
	//
	// Update the state of the game while in countdown
	//
	//------------------------------------------------------------------
	function updateCountdown(elapsedTime) {
		elapsedCountdown -= elapsedTime;
		object.update(elapsedTime);

		//
		// Once the countdown timer is down, switch to the playing state
		if (elapsedCountdown <= 0) {
			internalUpdate = updatePlaying;
			internalRender = renderPlaying;
		}
	}

	//------------------------------------------------------------------
	//
	// Render the state of the game while in countdown
	//
	//------------------------------------------------------------------
	function renderCountdown() {
		var number = Math.ceil(elapsedCountdown / 1000),
			countDown = {
				font: '128px Arial, sans-serif',
				fill: 'rgba(0, 0, 255, 1)',
				stroke: 'rgba(0, 0, 0, 1)',
				text: number.toString()
			},
			textWidth = graphics.measureTextWidth(countDown),
			textHeight = graphics.measureTextHeight(countDown);

		countDown.position = { x: 800 / 2 - textWidth / 2, y: 600 / 2 - textHeight };

		renderPlaying();
		//
		// Draw the countdown numbers
		graphics.drawText(countDown);
	}

	//------------------------------------------------------------------
	//
	// Let the play know the game is over.
	//
	//------------------------------------------------------------------
	function renderGameOver() {
		renderPlaying();
		graphics.drawText(textGameOver);
	}

	//------------------------------------------------------------------
	//
	// Handle any keyboard input
	//
	//------------------------------------------------------------------
	function processInput(elapsedTime) {
		keyboard.update(elapsedTime);
	}

	// //------------------------------------------------------------------
	// //
	// // Perform an update on the ball.  Check if it fell through the bottom,
	// // and start a new one or game over based upon that change.
	// //
	// //------------------------------------------------------------------
	// function updateBall(elapsedTime) {
	// 	if (ball.update(elapsedTime)) {
	// 		//
	// 		// This means the ball fell through the bottom, reduce number
	// 		// of paddles remaining, reposition the paddle & ball and change states.
	// 		paddlesRemaining -= 1;
	// 		elapsedCountdown = 3000;
	// 		initializePaddleAndBall();
	// 		if (paddlesRemaining === 0) {
	// 			//
	// 			// Update the high scores
	// 			Game.HighScores.add(score.total);
	// 			internalUpdate = function() {};
	// 			internalRender = renderGameOver;
	// 		} else {
	// 			internalUpdate = updateCountdown;
	// 			internalRender = renderCountdown;
	// 		}
	// 	}
	// }

	//------------------------------------------------------------------
	//
	// Update the state of the game while playing
	//
	//------------------------------------------------------------------
	// function updatePlaying(elapsedTime) {
	// 	var bricksHit = [],
	// 		brick;

	// 	paddle.update(elapsedTime);
	// 	updateBall(elapsedTime);
	// 	bricks.update(elapsedTime);
	// 	//particleSystem.update(elapsedTime);

	// 	//
	// 	// Check to see if the ball and paddle collided with each other
	// 	if (paddle.intersectBall(ball)) {
	// 		ball.reflectY(paddle);
	// 	}
	// 	//
	// 	// Check to see if we have a brick-ball collision
	// 	bricksHit = bricks.intersectBall(ball);
	// 	if (bricksHit.length > 0) {
	// 		ball.reflectY();

	// 		//
	// 		// Initiate particle effects for each brick hit
	// 		// for (brick = 0; brick < bricksHit.length; brick += 1) {
	// 		// 	particleSystem.createEffect( {
	// 		// 		left: bricksHit[brick].left,
	// 		// 		right: bricksHit[brick].right,
	// 		// 		top: bricksHit[brick].top,
	// 		// 		bottom: bricksHit[brick].bottom,
	// 		// 	});
	// 		// }
	// 		//
	// 		// Update score based upon the bricks hit
	// 		for (brick = 0; brick < bricksHit.length; brick += 1) {
	// 			score.total += bricksHit[brick].score;
	// 		}
	// 	}
	// }

	//------------------------------------------------------------------
	//
	// Render the state of the game while playing
	//
	//------------------------------------------------------------------
	function renderPlaying() {
		// bricks.render(graphics);
		// paddle.render(graphics);
		// ball.render(graphics);

		renderPaddlesRemaining();
		renderScore();

		//
		// Render this last so it draws over everything
		//particleSystem.render();
	}

	//------------------------------------------------------------------
	//
	// Update the state of the game model based upon the passage of time.
	//
	//------------------------------------------------------------------
	function update(elapsedTime) {
		internalUpdate(elapsedTime);
	}

	//------------------------------------------------------------------
	//
	// Render the current state of the game model.
	//
	//------------------------------------------------------------------
	function render() {
		internalRender();
	}

	return {
		initialize: initialize,
		processInput: processInput,
		update: update,
		render: render
	};
}(Game.components, Game.graphics, Game.input));
