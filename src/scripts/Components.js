/**************Most changes needed in this file*********************/







//------------------------------------------------------------------
//
// This namespace holds the different game components from which the
// game model is componsed.
//
//------------------------------------------------------------------
Game.components = (function() {
	'use strict';
	//
	// Various constants; as best as we can do them in ECMAScript 5
	var Constants = {
		get FrogHeight() { return 20; },
		get FrogOffset() { return 5; },
		get FrogWidthPercent() { return 20; },
		get BallSize() { return 15; },
		get BricksOffset() { return 50; },
		get BrickRows() { return 8; },
		get BricksPerRow() { return  14; },
		get BrickHeight() { return 15; },
		get BrickWidthPercent() { return 7; },

		get homeVert(){return 50;}
	};

	//------------------------------------------------------------------
	//
	// Tests to see if two rectangles intersect.  If they do, true is returned,
	// false otherwise.
	// Adapted from: http://stackoverflow.com/questions/2752349/fast-rectangle-to-rectangle-intersection
	//
	//------------------------------------------------------------------
	function intersectRectangles(r1, r2) {
		return !(
			r2.left > r1.right ||
			r2.right < r1.left ||
			r2.top > r1.bottom ||
			r2.bottom < r1.top
		);
	}

	// // ------------------------------------------------------------------
	// //
	// // This represents the model for the game Frog.  It knows how to
	// // move and draw itself upon request.
	// //
	// // 'spec' must include:
	// //		color: rgba
	// //		view: {width, height}
	// //		moveRate: number // pixels per millisecond
	// //
	// // ------------------------------------------------------------------
	function Frog(spec) {
		var that;

		//
		// Prepare the initial properties of the Frog
		spec.fullSize = true;
		spec.center =  {
			x: spec.view.width / 2,
			y: spec.view.height -(Constants.FrogOffset + Constants.FrogHeight / 2)
		};
		spec.width = spec.view.width * (Constants.FrogWidthPercent / 100);

		//
		// Had to wait to define that until we had the spec fully initialized
		that = {
			get left() { return spec.center.x - spec.width / 2 },
			get right() { return spec.center.x + spec.width / 2 },
			get top() { return spec.center.y - Constants.FrogHeight / 2 },
			get bottom() { return spec.center.y + Constants.FrogHeight / 2 },
			get center() { return spec.center },
			get width() { return spec.width }
		};

		that.moveRight = function(elapsedTime) {
			spec.center.x += spec.moveRate * elapsedTime;
			//
			// Don't let it go past the left edge of the screen
			if (spec.center.x > (spec.view.width - spec.width / 2)) {
				spec.center.x = spec.view.width - spec.width / 2;
			}
		}

		that.moveLeft = function(elapsedTime) {
			spec.center.x -= spec.moveRate * elapsedTime;
			//
			// Don't let it go past the left edge of the screen
			if (spec.center.x < spec.width / 2) {
				spec.center.x = spec.width / 2;
			}
		}

		that.intersectBall = function(ball) {
			var intersect = false;
			if (!ball.collided && intersectRectangles(that, ball)) {
				intersect = true;
			}

			ball.collided = intersect;

			return intersect;
		}

		that.update = function(elapsedTime) {
			//
			// Nothing to do for now, maybe later
		}

		that.render = function(graphics) {
			graphics.drawRectangle({
				x: spec.center.x - spec.width / 2,
				y: spec.center.y - Constants.FrogHeight / 2,
				width: spec.width,
				height: Constants.FrogHeight,
				fill: spec.color,
				stroke: 'rgba(255, 0, 0, 1)'
			});
		}

		return that;
	}

	// ------------------------------------------------------------------
	//
	// This represents the model for a game ball.  It knows how to
	// move and draw itself upon request.
	//
	// 'spec' must include:
	//		color: rgba
	//		view: {width, height}
	//		direction: { x, y }
	//		moveRate: number // pixels per millisecond
	//
	// ------------------------------------------------------------------
	function Ball(spec) {
		var collided = false,
			that = {
				get left() { return spec.center.x - Constants.BallSize / 2 },
				get right() { return spec.center.x + Constants.BallSize / 2 },
				get top() { return spec.center.y - Constants.BallSize / 2 },
				get bottom() { return spec.center.y + Constants.BallSize / 2 },
				get collided() { return collided },
				set collided(value) { collided = value; },
				set centerX(value) { spec.center.x = value; }
			};

		//
		// Prepare the initial properties of the ball
		spec.center = {
			x: spec.view.width / 2,
			y: spec.view.height - (Constants.FrogOffset + Constants.FrogHeight + Constants.BallSize)
		};

		that.reflectY = function(Frog) {
			var length;
			spec.direction.y *= -1;
			//
			// Perform the reflection based upon where we hit the Frog
			// Technique based on this: http://seangeo.blogspot.com/2011/03/breakout-week-3-when-balls-collide.html
			if (Frog !== undefined) {
				spec.direction.x = (spec.center.x - Frog.center.x) / (Frog.width / 2);
				//
				// Normalize the direction vector
				length = Math.sqrt(Math.pow(spec.direction.x, 2) + Math.pow(spec.direction.y, 2));
				spec.direction.x /= length;
				spec.direction.y /= length;
			}
		};

		that.update = function(elapsedTime) {
			var missed = false;
			spec.center.x += (spec.direction.x * spec.moveRate * elapsedTime);
			spec.center.y += (spec.direction.y * spec.moveRate * elapsedTime);
			//
			// If we hit an arena boundary, change the ball direction accordingly
			if (that.right > spec.view.width) {
				spec.direction.x *= -1;
			}
			if (that.left < 0) {
				spec.direction.x *= -1;
			}
			if (that.top < 0) {
				spec.direction.y *= -1;
			}
			if (that.bottom > spec.view.height) {
				//
				// Indicate the ball fell through the bottom
				missed = true;
			}

			return missed;
		}

		that.render = function(graphics) {
			graphics.drawRectangle({
				x: spec.center.x - Constants.BallSize / 2,
				y: spec.center.y - Constants.BallSize / 2,
				width: Constants.BallSize,
				height: Constants.BallSize,
				fill: spec.color,
				stroke: 'rgba(0, 0, 0, 1)'
			});
		};

		return that;
	}

	// ------------------------------------------------------------------
	//
	// This represents the model for a single brick.  It knows how to draw
	// itself upon request.
	//
	// 'spec' must include:
	//		color: rgba
	//		position: { left, top }
	//		score: number
	//		view: { width, height }
	//
	// ------------------------------------------------------------------
	function Brick(spec) {
		var alive = true,
			brickWidth = Math.trunc((Constants.BrickWidthPercent / 100) * spec.view.width),
			that = {
				get left() { return spec.position.left },
				get right() { return spec.position.left + brickWidth },
				get top() { return spec.position.top },
				get bottom() { return spec.position.top + Constants.BrickHeight },
				get alive() { return alive },
				get score() { return spec.score }
			};

		that.intersectBall = function(ball) {
			var intersect = false;
			if (alive) {
				if (!ball.collided && intersectRectangles(that, ball)) {
					alive = false;
					intersect = true;
				}
			}

			ball.collided = intersect;

			return intersect;
		}

		that.update = function() {
			//
			// Bricks don't have any updates to do...at least not yet
		};

		that.render = function(graphics) {
			if (alive) {
				graphics.drawRectangle({
					x: that.left,
					y: that.top,
					width: brickWidth,
					height: Constants.BrickHeight,
					fill: spec.color,
					stroke: 'rgba(0, 0, 0, 1)'
				});
			}
		};

		return that;
	}

	// ------------------------------------------------------------------
	//
	// This creates the set of all bricks model.
	//		view: { width, height }
	//
	// ------------------------------------------------------------------
	function Bricks(spec) {
		var that = { },
			bricks = [],
			top = Constants.BricksOffset + Constants.BrickRows * Constants.BrickHeight;

		// ------------------------------------------------------------------
		//
		// Utility function to create a single row of bricks
		//
		// ------------------------------------------------------------------
		function createRow(rowTop, score, color) {
			var leftover = spec.view.width - Constants.BricksPerRow * Math.trunc((Constants.BrickWidthPercent / 100) * spec.view.width),
				left = leftover / 2,
				brick = 0,
				brickRow = bricks.length;

			bricks.push([]);
			for (brick = 0; brick < Constants.BricksPerRow; brick += 1) {
				bricks[brickRow].push(Brick({
					color: color,
					position: {left: left, top: rowTop},
					score: score,
					view: spec.view
				}));
				left = bricks[brickRow][bricks[brickRow].length - 1].right;
			}
		}

		// ------------------------------------------------------------------
		//
		// Checks to see which, if any, bricks were hit by the ball.  Those
		// bricks hit by the ball are returned by the function.
		//
		// ------------------------------------------------------------------
		that.intersectBall = function(ball) {
			var row,
				brick,
				thoseHit = [],
				intersectAll,
				intersectRow;

			//
			// Step 1: See if we can reject all of the bricks first
			intersectAll = intersectRectangles(ball, {
				left: bricks[0][0].left,
				right: bricks[0][bricks[0].length - 1].right,
				top: bricks[bricks.length - 1][0].top,
				bottom: bricks[0][0].bottom });

			if (intersectAll) {
				for (row = 0; row < bricks.length; row += 1) {
					intersectRow = intersectRectangles(ball, {
						left: bricks[row][0].left,
						right: bricks[row][bricks[row].length - 1].right,
						top: bricks[row][0].top,
						bottom: bricks[row][0].bottom });

					//
					// Step 2: See if we can reject this row
					if (intersectRow) {
						for (brick = 0; brick < bricks[row].length; brick += 1) {
							if (bricks[row][brick].intersectBall(ball)) {
								thoseHit.push(bricks[row][brick]);
							}
						}
					}
				}
			}

			return thoseHit;
		}

		that.update = function(elapsedTime) {
			//
			// Nothing to do yet
		}

		that.render = function(graphics) {
			var row,
				brick;

			for (row = 0; row < bricks.length; row += 1) {
				for (brick = 0; brick < bricks[row].length; brick += 1) {
					bricks[row][brick].render(graphics);
				}
			}
		}

		//
		// Create the eight rows of bricks: yellow, orange, blue, and green
		createRow(top, 1, 'rgba(255, 255, 0, 1)');
		createRow(bricks[0][0].top - Constants.BrickHeight, 1, 'rgba(255, 255, 0, 1)');
		createRow(bricks[1][0].top - Constants.BrickHeight, 2, 'rgba(255, 165, 0, 1)');
		createRow(bricks[2][0].top - Constants.BrickHeight, 2, 'rgba(255, 165, 0, 1)');
		createRow(bricks[3][0].top - Constants.BrickHeight, 3, 'rgba(0, 0, 255, 1)');
		createRow(bricks[4][0].top - Constants.BrickHeight, 3, 'rgba(0, 0, 255, 1)');
		createRow(bricks[5][0].top - Constants.BrickHeight, 5, 'rgba(0, 255, 0, 1)');
		createRow(bricks[6][0].top - Constants.BrickHeight, 5, 'rgba(0, 255, 0, 1)');

		return that;
	}

	return {
		Constants: Constants,
		Frog: Frog,
		Ball: Ball,
		Brick: Brick,
		Bricks: Bricks
	};
}());
