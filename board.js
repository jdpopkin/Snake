//this.Snakes = require('./snake.js');

(function(root) {

  var Snakes = root.Snakes = (root.Snakes || {});

  var Coord = Snakes.Coord;

  var Board = Snakes.Board = function() {
    this.size = 10;
    this.apple_counter = 0;
    this.apple_array = [];
    this.spaces = [];

    for (var i = 0; i < this.size; i++) {
      var row = [];
      for (var j = 0; j < this.size; j++){
        row.push('.');
      }
      this.spaces.push(row);
    }

    this.snake = new Snakes.Snake(3, [5,5], 10);
    this.snake.apple_array = this.apple_array;

    // place snake on internal representation of board
    for (var i = 0; i < this.snake.segments.length; i++) {
      var segment = this.snake.segments[i];
      this.spaces[segment.y][segment.x] = 'S';
    };
  }

  Board.prototype.update = function() {
    this.snake.move();
    this.apple_counter++;

    if (this.apple_counter === 5) {
      this.generate_apple();
    }
  }

  // Generates an apple and places it on the board.
  Board.prototype.generate_apple = function(){
    this.apple_counter = 0;
    if (this.apple_array.length > 2) {
      return;
    }

    var appleX = Math.floor(Math.random() * this.size);
    var appleY = Math.floor(Math.random() * this.size);
    var appleCoord = new Coord(appleX, appleY);
    this.apple_array.push(appleCoord);

  }

  Board.prototype.render = function(){
    // place empty spaces
    for (var i = 0; i < this.spaces.length; i++) {
      for (var j = 0; j < this.spaces[i].length; j++) {
        this.spaces[i][j] = ".";
      }
    }

    // place snake
    for (var i = 0; i < this.snake.segments.length; i++) {
      var segment = this.snake.segments[i];
      this.spaces[segment.y][segment.x] = 'S';
    };

    // print board
    for (var i = 0; i < this.spaces.length; i++){
      console.log(this.spaces[i].join(''));
    }
  };

})(this);