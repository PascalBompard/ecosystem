function Food(x, y) {
    this.x = x;
    this.y = y;
    this.w = foodWidth;
    
    this.render = function() {
      noStroke();
      fill(180);
      ellipse(this.x, this.y, this.w)
    }

    // Return list of food 
    this.getFood = function() {
      return this.food;
    }
  }
   