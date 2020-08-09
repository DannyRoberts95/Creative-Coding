let textTyped = ` `;
let fontSizes = [textTyped.length];

let minFontSize = 15;
let maxFontSize = 1000;
let newFontSize = 0;

let pMillis = 0;
let maxTimeDelta = 5000.0;

let spacing = 20;
let tracking = 0;
let font = `helvetica`;

function setup() {
  createCanvas(750, 750);
  noCursor();
  textFont(font);
  textAlign(LEFT);

  for (var i = 0; i < textTyped.length; i++) {
    fontSizes[i] = minFontSize;
  }
}

function draw() {
  background(250);
  fill(0)

  spacing = map(mouseY, 0, height, 0, 120);
  translate(0, height/5 + spacing);

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

  var timeDelta = millis() - pMillis;
  newFontSize = map(timeDelta, 0, maxTimeDelta, minFontSize, maxFontSize);
  newFontSize = min(newFontSize, maxFontSize);

  // Hide the blinking cursor
  // fill(200, 30, 40);
  // if (int(frameCount / 25) % 2 == 0) fill(255);
  // rect(x, y, newFontSize / 2, newFontSize / 20);

}//END OF DRAW

//Assign the save canvas function to CTRL so that the canvas can be saved
function keyReleased() {
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    fontSizes.push(newFontSize);
  }
  pMillis = millis();
}
