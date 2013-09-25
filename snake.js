(function(root) {

  var Snakes = root.Snakes = (root.Snakes || {});

  var Snake = Snakes.Snake = function(length, location) {
     this.dir = 'N';
     this.segments = [];
     this.score = 0;

     for (var i = 0; i < length; i++) {
       var thisX = location[0];
       var thisY = location[1] + i;
       thisCoord = new Coord(thisX, thisY);
       this.segments.push(thisCoord);
     }
     // add starting location and size somewhere?
  };

  Snake.prototype.move = function() {
    switch(this.dir)
    {
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

    // warning: magic numbers
    newX = (newX + 10) % 10;
    newY = (newY + 10) % 10;

    // check for collision?
    for (var i = 0; i < this.segments.length; i++) {
      if (this.segments[i].x === newX && this.segments[i].y === newY) {
        // clearInterval(nIntervId); // warning: doesn't work. this.dead = true?
        this.dead = true;
        alert("You died </3\nYour score: " + this.score);
      }
    }

    for (var i = 0; i < this.apple_array.length; i++) {
      if (this.apple_array[i][0] === newX && this.apple_array[i][1] === newY) {
        this.grow = true;
        this.score += 10;
        this.apple_array.splice(i, 1);
      }
    }

    var newCoord = new Coord(newX, newY);
    this.segments.unshift(newCoord);

    if (!this.grow) {
      this.segments.pop();
    }
    this.grow = false;
  }

  Snake.prototype.turn = function(newDir) {
    this.dir = newDir;
  }

  var Coord = Snakes.Coord = function(x,y){
    this.x = x
    this.y = y
  }

  Coord.prototype.add = function(x, y) {
    this.x += x;
    this.y += y;
  }

  Coord.prototype.getCoord = function(){
    return [this.x, this.y];
  }

})(this);

//module.exports = this.Snakes;