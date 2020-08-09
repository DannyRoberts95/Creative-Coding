//storing the selected font in the font variable
let font = `sans-serif`;
//setting the starting letter as A.
let letter = `A`;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);
  fill(0)

  //set the font to the font variable
  textFont(font);
  // align the text to the center both horizontally and vertically
  textAlign(CENTER, CENTER);
}

// when the mouse is moved...
function mouseMoved(){
  //clear the canvas
  clear();
  //set the text size based on the mouse X value, minus half the width and scaled by 5.
  textSize((mouseX-width/2)*5);
  //place the curent letter in the center of the X axis and the mouseY
  text(letter, width/2, mouseY);
}

// does the smae as mouseMoved only the canvas is not cleared each frame.
function mouseDragged(){
  textSize((mouseX-width/2)*5+1);
  text(letter, width/2, mouseY);
}
