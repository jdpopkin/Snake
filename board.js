//this.Snakes = require('./snake.js');

(function(root) {

  var Snakes = root.Snakes = (root.Snakes || {});


  var Board = Snakes.Board = function() {
    this.size = 10;
    this.apple_array = [];
    this.spaces = [];
    for (var i = 0; i< this.size; i++) {
      var row = [];
      for (var j = 0; j< this.size; j++){
        row.push('.');
      }
      this.spaces.push(row);
    }

    this.snake = new Snakes.Snake(3, [5,5]);
    this.snake.apple_array = this.apple_array;

    for (var i = 0; i < this.snake.segments.length; i++) {
      var segment = this.snake.segments[i];
      this.spaces[segment.y][segment.x] = 'S';
    };
  }

  Board.prototype.update = function() {
    this.snake.move();
  }

  Board.prototype.generate_apple = function(){
    var appleX = Math.floor(Math.random() * 10);
    var appleY = Math.floor(Math.random() * 10);
    this.apple_array.push([appleX, appleY]);

  }

  Board.prototype.render = function(){
    // update spaces
    for (var i = 0; i < this.spaces.length; i++) {
      for (var j = 0; j < this.spaces[i].length; j++) {
        this.spaces[i][j] = ".";
      }
    }

    for (var i = 0; i < this.snake.segments.length; i++) {
      var segment = this.snake.segments[i];
      this.spaces[segment.y][segment.x] = 'S';
    };

    for (var i = 0; i < this.spaces.length; i++){
      console.log(this.spaces[i].join(''));
    }
  };

})(this);

// var board = new this.Snakes.Board();
// board.snake.move("N");
// board.snake.move("N");
// board.render();