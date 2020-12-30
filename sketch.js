/* Ecosystem Description
-----------------------

 % Creature class
 -----------------------
 + Description
 - moves at random
 - genetic level of attraction to food
 ≠ health declines over time, eventually leading to death
 ≠ low health leads to slower movement
 ≠ eating food improves health
 ≠ females lay eggs (random low probability)
 - low health leads fewer eggs
 - males above a threshold level of health can fertilise eggs

 % Egg class
 -----------------------
 + Description
 ≠ gets laid by a healthy female
 - laid in a batch/clutch
 - waits for health male to fertilise
 - eggs last only a short while without being fertilised. perhaps they shrivel up and blow  away
 - if fertilised they will hatchd after a predeterminded period of time

 % Food class
 -----------------------
*/

// Initialise 

var hudText; // text to display on screen
var creatures = [];
var maxCreatures = 60;
var totalCreatures = 0;
var eggs = [];
var totalEggs = 0;
var food=0;
var foodWidth;
var eggWidth;
var numCreatures = 25;
var health = 900;
var millisecond;
var txt1='';
var txt2='';
var txt3='';
var extinctionMoment=0;

// TODO: Set up some attractive colors

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  foodWidth = width/6;
  eggWidth = width/100;
  
  
  // Create initial batch of creatures, setting gender
  for (let i = 0; i < numCreatures; i++) {
    h = random(1,2);
    s = random(1,2);
    creatures[i] = new Creature(random(width),random(height),h,s,1);
    totalCreatures++;
  }

  food = new Food(width/2,height/2);
}

function draw() {
  background(220);

  food.render();
  for (e of eggs) {
    e.render();
  }
  
  for (let i = 0; i < creatures.length; i++) {
    if (creatures[i].health < 100) { //if health is low, 
      creatures.splice(i,1); // then remove from array      
    } else {
      creatures[i].run();
      creatures[i].eat();
      if (creatures[i].gender== "f" && creatures[i].health > 600 && random(1200) < 2) {
        creatures[i].layEgg();
      } else if (creatures[i].gender== "m" && creatures[i].health > 300){
        creatures[i].spawn();
      }
    } 
  }
  let txt1 = creatures.length +" creatures alive";
  let txt2 = eggs.length +" unfertilised eggs";
  millisecond = millis();
  if (creatures.length > 0) {
    txt1 = creatures.length +" creatures alive";
    txt2 = eggs.length +" unfertilised eggs";
    txt3 = round(millisecond/1000) + " seconds runtime";
  } else {
    extinctionMoment = millis();
    txt1 = "Extinction occurred at " + round((extinctionMoment/1000)/60) + " minutes,\n" 
    + "with " + totalCreatures + " creatures created,\n and " + totalEggs +" eggs laid" ;
    txt2 = "";
    txt3 = "";
    reStart(3000);
    // noLoop();
  }
  

  //text to show health levels
  push();
        textAlign (LEFT,BASELINE);
        textSize(11);
        noStroke();
        fill(50);
        text(txt1, 10, 20 );
        text(txt2, 10, 33 );
        text(txt3, 10, 46 );
  pop() ;

  

}

function reStart(time){
  if(frameCount % 500 === 0) {
    creatures = [];
    totalCreatures = 0;
    eggs = [];
    totalEggs = 0;  
    txt1='';
    txt2='';
    txt3='';
    let currentFrame = frameCount;

    for (let i = 0; i < numCreatures; i++) {
      h = random(1,2);
      s = random(1,2);
      creatures[i] = new Creature(random(width),random(height),h,s,1);
      totalCreatures++;
  }
}

}


