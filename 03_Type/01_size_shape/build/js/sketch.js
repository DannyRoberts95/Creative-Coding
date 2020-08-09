let font = `helvetica`;
let letter = `X`;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  textFont(font);
  textAlign(CENTER, CENTER);
}

function mouseMoved() {
  clear();
  fill(0);
  textSize((mouseX - width / 2) * 5);
  text(letter, width / 2, mouseY);
}

function mouseDragged() {
  //the fill is mapped to the mouseX, as the mouse X increases the brightness of the fill increses too.
  fill(map(mouseX, width / 2, width, 255, 0));
  textSize((mouseX - width / 2) * 5 + 1);
  text(letter, width / 2, mouseY);
}

// save the canvas using the CTRL key
function keyReleased() {
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), "png");
}

//change the current letter by pressing the key
function keyTyped() {
  letter = key;
}
function keyPressed() {
  //save canvas as a PNG
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
}
