(function(root) {

  var Snakes = root.Snakes = (root.Snakes || {});

  var Coord = Snakes.Coord;

  // Initializes Snake game by placing a snake of the given length at the
  // specified location.
  var Snake = Snakes.Snake = function(length, location, boardSize) {
     this.dir = 'N';
     this.segments = [];
     this.score = 0;
     this.boardSize = boardSize;

     // Place each of its segments.
     for (var i = 0; i < length; i++) {
       var thisX = location[0];
       var thisY = location[1] + i;
       thisCoord = new Coord(thisX, thisY);
       this.segments.push(thisCoord);
     }
  };

  // Moves the snake forward one tick in the current direction
  Snake.prototype.move = function() {
    var newCoords = this._getNewCoords();
    var newX = newCoords[0];
    var newY = newCoords[1];

    // Allows for wrapping upon reaching walls.
    newX = (newX + this.boardSize) % this.boardSize;
    newY = (newY + this.boardSize) % this.boardSize;

    this._appleCheck(newX, newY);

    if (!this.grow) {
      this.segments.pop();
    }

    this.grow = false;

    // Save this for last because collision with the tail can be avoided if the
    // tail moves out of the way (that is, if we aren't growing)
    this._collisionCheck(newX, newY);

    // Add the newly calculated segment to the front of the snake
    var newCoord = new Coord(newX, newY);
    this.segments.unshift(newCoord);

    this.lastDir = this.dir;
  }

  // Determines the new position of the snake's head after it moves.
  Snake.prototype._getNewCoords = function() {
    switch(this.dir) {
      // Incrementing moves us downwards.
      case 'N':
        var newX = this.segments[0].x;
        var newY = this.segments[0].y - 1;
        break;

      case 'S':
        var newX = this.segments[0].x;
        var newY = this.segments[0].y + 1;
        break;

      case 'E':
        var newX = this.segments[0].x + 1;
        var newY = this.segments[0].y;
        break;

      case 'W':
        var newX = this.segments[0].x - 1;
        var newY = this.segments[0].y;
        break;

      default:
        break;
    }

    return [newX, newY];
  }

  // check for collision (with segments)
  Snake.prototype._collisionCheck = function(newX, newY) {
    for (var i = 0; i < this.segments.length; i++) {
      if (this.segments[i].x === newX && this.segments[i].y === newY) {
        this.dead = true;
        alert("Game over!\nYour score: " + this.score + "\nPress R to play again!");
        return true;
      }
    }
    return false;
  }

  // Check for collision with each of the apples in the apple array
  Snake.prototype._appleCheck = function(newX, newY) {
    for (var i = 0; i < this.apple_array.length; i++) {
      if (this.apple_array[i].x === newX && this.apple_array[i].y === newY) {
        this.grow = true;
        this.score += 10;
        this.apple_array.splice(i, 1);
      }
    }
  }

  Snake.prototype.turn = function(newDir) {
    // true if the user is attempting to turn in the direction opposite their
    // last move.
    var aboutFace = (this.lastDir === "N" && newDir === "S") ||
                    (this.lastDir === "S" && newDir === "N") ||
                    (this.lastDir === "E" && newDir === "W") ||
                    (this.lastDir === "W" && newDir === "E")

    if (aboutFace) {
      return;
    } else {
      this.dir = newDir;
    }
  }

})(this);

//module.exports = this.Snakes;