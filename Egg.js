function Egg(xpos,ypos,dna) {    
    // + Methods
    // o- lay()
    // o- position()
    // o- activate()
    // o- hatch()
  
    this.x = xpos;
    this.y = ypos;
    this.h = eggWidth;
    this.w = eggWidth*1.3;
    this.genes = dna; 
    
    
    this.render = function() {
      stroke(200);
      fill(255);
      ellipse(this.x, this.y, this.h, this.w)
    }

    // Return list of food 
    this.getEgg = function() {
      console.log ("enter getEgg");
      return this.egg;
    }
  
  
  }
  
  