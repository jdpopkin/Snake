(function(root) {

  var Snakes = root.Snakes = (root.Snakes || {});

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