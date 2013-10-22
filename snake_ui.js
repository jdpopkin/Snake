(function(root) {

  var Snakes = root.Snakes = (root.Snakes || {});


  var View = Snakes.View = function($el) {
    this.$el = $el;
    this.apple_counter = 0;
  };

  View.prototype.start = function() {
    this.board = new Snakes.Board();

    for (var i = 0; i < this.board.spaces.length; i++) {
      var newRow = $('<div></div>');

      newRow.addClass('row');

      for (var j = 0; j < this.board.spaces.length; j++) {
        var newSquare = $('<div></div>');
        newSquare.addClass('square');
        newSquare.addClass('empty');
        newRow.append(newSquare);
      }

      this.$el.append(newRow);
    }

    var segments = this.board.snake.segments;
    this.drawSnake(segments);

    var that = this;
    $(document).on("keydown", function(event) {
      //console.log(event.keyCode);


      // 87 = w, 65 = a, 68 = d, 83 = s

      switch(event.keyCode) {
        case 87:
          that.board.snake.turn("N");
          break;
        case 65:
          that.board.snake.turn("W");
          break;
        case 68:
          that.board.snake.turn("E");
          break;
        case 83:
          that.board.snake.turn("S");
          break;
        default:
        break;
      }
    });

    this.intervalID = setInterval(this.step.bind(this), 500)



  }





  View.prototype.drawSnake = function() {
    var segments = this.board.snake.segments;

    for (var i = 0; i < this.board.snake.segments.length; i++) {
      var thisX = segments[i].x;
      var thisY = segments[i].y;

      // find corresponding div
      var row =  $('.row').get(thisY);
      var square = $(row).children().get(thisX);

      // set it to snake class
      $(square).addClass("snake");
      $(square).removeClass("empty");
    }
  }

  View.prototype.drawApples = function() {
    var apples = this.board.apple_array;

    for (var i = 0; i < apples.length; i++) {
      var thisX = apples[i][0];
      var thisY = apples[i][1];

      // find corresponding div
      var row =  $('.row').get(thisY);
      var square = $(row).children().get(thisX);

      // set it to snake class
      $(square).addClass("apple");
      $(square).removeClass("empty");
    }
  }

  View.prototype.clearBoard = function() {
    for (var i = 0; i < this.board.spaces.length; i++) {
      for (var j = 0; j < this.board.spaces.length; j++) {
        var row =  $('.row').get(i);
        var square = $(row).children().get(j);

        $(square).addClass("empty");
        $(square).removeClass("snake");
        $(square).removeClass("apple");
      }
    }
  }

  View.prototype.step = function() {

    this.apple_counter += 1;

    if (this.apple_counter === 5){
      this.board.generate_apple();
      this.apple_counter = 0;
    }

    // advance the snake
    if (this.board.snake.dead) {
      clearInterval(this.intervalID);
      return;
    }
    // this.board.snake.move();
    this.board.update();

    this.clearBoard();
    this.drawSnake();
    this.drawApples();
  }

})(this);

  $(document).ready( function() {

    var div = $('div').first();
    view = new Snakes.View(div);
    view.start();

  })