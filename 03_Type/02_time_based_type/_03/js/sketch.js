

let textTyped = ` `;
let fontSizes = [textTyped.length];

let minFontSize = 15;
let maxFontSize = 800;
let newFontSize = 0;

//var to store the milisecond a key is pressed
let pMillis = 0;
//how long it will take for the font to grow as large as possible
let maxTimeDelta = 5000.0;

let spacing = 2;
let tracking = 0;
let font = `helvetica`;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont(font);
  textAlign(LEFT);

  for (var i = 0; i < textTyped.length; i++) {
    fontSizes[i] = minFontSize;
  }
}

function draw() {
  background(255);
  fill(0)

  spacing = map(mouseY, 0, height, 0, 120);
  translate(0, 200 + spacing);

  var x = 0;
  var y = 0;
  var fontSize = 0;

  for (var i = 0; i < textTyped.length; i++) {
    fontSize = fontSizes[i];
    textFont(font, fontSize);
    var letter = textTyped.charAt(i);
    var letterWidth = textWidth(letter) + tracking;

    if (x + letterWidth > width) {
      x = 0;
      y += spacing;
    }

    text(letter, x, y);
    x += letterWidth;
  }

  //Store the amount of miliseconds since the last key was pressed
  var timeDelta = millis() - pMillis;
  //keep track of the font size that will be assigned to the next letter typed
  newFontSize = map(timeDelta, 0, maxTimeDelta, minFontSize, maxFontSize);
  //make fontSize equal to the newFontSize or the maxFontSize depending on which is smaller
  newFontSize = min(newFontSize, maxFontSize);

  //fill the rect so it can be seen on screen intermitantly
  fill(200, 30, 40);
  if (int(frameCount / 25) % 2 == 0) fill(255);
  // scale the width and height with the newFontSize variable
  rect(x, y, newFontSize / 2, newFontSize / 20);

}//END OF DRAW


// when a key is pressed... (CTRL, SHIFT & ALT are ignored)
function keyTyped() {
  if (keyCode >= 32) {
    //the last key pressed by the user is added to the textTyped array
    textTyped += key;
    //the current value for the newFontSize var is added to the fontSizes array
    fontSizes.push(newFontSize);
  }
  // reset the timer
  pMillis = millis();
}
