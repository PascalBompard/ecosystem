// adds text readout on the screen

function hud(txt){
    push();
      rectMode(CORNER);
      textAlign (CENTER,BASELINE);
      textSize(11);
      noStroke();
      fill(240);
      rect(20, height-70, 200, 50)
      fill(50);
      text(txt, 120, height - 40 );
    pop() ;
}
