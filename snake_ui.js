(function(root) {

  var Snakes = root.Snakes = (root.Snakes || {});


  var View = Snakes.View = function($el) {
    this.$el = $el;
    this.apple_counter = 0;
  };

  View.prototype.restart = function() {
    this.board = new Snakes.Board();
    clearInterval(this.intervalID);
    this.intervalID = setInterval(this.step.bind(this), 500)
  }

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
      var keyPressed = aliasKeys(event.keyCode);

      // 87 = w, 65 = a, 68 = d, 83 = s, 82 = r
      switch(keyPressed) {
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
        case 82:
          if (that.board.snake.dead) {
            that.restart();
          }
          break;
        default:
        break;
      }
    });

    this.intervalID = setInterval(this.step.bind(this), 500)

  }

  // Alias arrow keys to WASD. 38 = up, 37 = left, 39 = right, 40 = down
  var aliasKeys = function(keyCode) {
    switch(keyCode) {
    case 38:
      var keyPressed = 87;
      break;
    case 37:
      var keyPressed = 65;
      break;
    case 39:
      var keyPressed = 68;
      break;
    case 40:
      var keyPressed = 83
      break;
    default:
      var keyPressed = keyCode;
      break;
    }
    return keyPressed;
  }



  View.prototype.drawCoords = function(coordsArray, cssClass) {
    for (var i = 0; i < coordsArray.length; i++) {
      var thisX = coordsArray[i].x;
      var thisY = coordsArray[i].y;

      // find corresponding div
      var row =  $('.row').get(thisY);
      var square = $(row).children().get(thisX);

      // set it to desired class unless it has snake class
      if (!$(square).hasClass("snake")) {
        $(square).addClass(cssClass);
        $(square).removeClass("empty");
      }
    }
  }

  View.prototype.drawSnake = function() {
    this.drawCoords(this.board.snake.segments, "snake");
  }

  View.prototype.drawApples = function() {
    this.drawCoords(this.board.apple_array, "apple");
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

    // advance the snake. stop the game if the snake is dead.
    if (this.board.snake.dead) {
      clearInterval(this.intervalID);
      return;
    }
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