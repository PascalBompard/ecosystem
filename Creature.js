function Creature(x,y,h,s,g) {
    // Props
    this.gender = random(['f','m']);// assigns 
    this.genes = [h,s];
    this.health = health * h; // receive a random amount of health 'at birth'
    this.r = height/50 * s; // Size relative to height of canvas
    this.position = createVector(x, y);
    this.generation = g;
    

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-10,10),random(-10,10));
    this.distanceFood;
    this.distanceEgg = 0;
    
     // Maximum speed
    this.maxSpeed; 
    this.maxforce = 0.01; // Maximum steering force


    // Catch-all run function
    this.run = function() {
        this.reduceHealth();
        this.changePos();
        this.borders();
        this.render();
    }

    // Movement 

    // Update position
    this.changePos = function() {
        this.maxspeed = map (this.health,3000,0,4,0.5); // Max speed based on a mapping of health
        this.acceleration = createVector(random(-0.1,0.1), random(-0.1,0.1));
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
    
    // Render creatures
    this.render = function() {
      noStroke();
      this.transparency = map (this.health,1000,0,255,0);
      if (this.gender == 'f') {
        fill(255, this.transparency);
      } else {
        fill(0, this.transparency);
      };
      ellipse(this.position.x, this.position.y, this.r);
      let txt1 = "G" + this.generation;
     
      push();
            textAlign (LEFT,BASELINE);
            textSize(9);
            noStroke();
            fill(50);
            text(txt1, this.position.x + 20, this.position.y );
      pop();
    }
    
    // Health 
    this.reduceHealth = function() {
        this.health -= random(3);
    }

    this.increaseHealth = function(amount) {
        this.health += amount;
    }

   
  // Eat
    this.eat = function() {
        let tempX = food.x;
        let tempY = food.y;
        let foodLocation = createVector(tempX, tempY)
        let d = p5.Vector.dist(this.position, foodLocation);
        this.distanceFood = d;
        if (d < foodWidth/1.5) {
          this.increaseHealth(10);
        }
      
    }

  // Lay eggs
    this.layEgg = function() {
      eggs.push(new Egg(this.position.x, this.position.y, this.genes));
      totalEggs++;
    }

    // Find eggs to fertilise
  this.spawn = function() {
    //console.log ("enter spawn");
    for (i = eggs.length-1; i >= 0; i--) {
      let eggLocationX = eggs[i].x;
      let eggLocationY = eggs[i].y;
      let eggLocation = createVector(eggLocationX, eggLocationY);
      let d = p5.Vector.dist(this.position, eggLocation);
      this.distanceEgg = d;
      if (creatures.length < maxCreatures && this.distanceEgg < this.r/2) {
        this.fertiliseEgg(eggs[i]);
        eggs.splice(i,1);
      }
    }
  }

  // Fertilise eggs
    this.fertiliseEgg = function(egg) {
      let newGenes = egg.genes;
      let crossover = random([0,1]);
      newGenes.splice(crossover,1,this.genes[crossover]);
      creatures.push(new Creature(this.position.x, this.position.y,newGenes[0],newGenes[1],this.generation + 1));
      totalCreatures++;
    }


    // Wraparound function
    this.borders = function() {
        if (this.position.x < -this.r) this.position.x = width + this.r;
        if (this.position.y < -this.r) this.position.y = height + this.r;
        if (this.position.x > width + this.r) this.position.x = -this.r;
        if (this.position.y > height + this.r) this.position.y = -this.r;
    }
}