let colorsRight = [];
let colorsLeft = [];

let maxTileX = 50;
let maxTileY = 50;

let colors = [];
let tileCountX;
let tileCountY;
let boxWidth;
let boxHeight;

//add in a variable to control the method of interpoltion
var interpolateShortest = true;

function setup() {
  let w = windowWidth;
  let h = windowHeight;

  tileCountX = maxTileX;
  tileCountY = maxTileY;
  boxWidth = w / tileCountX;
  boxHeight = h / tileCountY;

  createCanvas(w, h);
  cursor(CROSS);
  colorMode(HSB);
  noStroke();
  shakeColors();
}

function draw() {
  background(0, 0, 100);
  let mX = constrain(mouseX, 0, width);
  let mY = constrain(mouseY, 0, height);
  colors = [];
  tileCountX = int(map(mX, 0, width, 1, maxTileX));
  tileCountY = int(map(mY, 0, height, 1, maxTileY));
  boxWidth = width / tileCountX;
  boxHeight = height / tileCountY;

  for (let y = 0; y <= tileCountY; y++) {
    let startCol = colorsLeft[y];
    let endCol = colorsRight[y];
    for (let x = 0; x <= tileCountX; x++) {
      let lerpAmount = map(x, 0, tileCountX - 1, 0, 1);
      let interColor;

      //based on that interpolation variable...
      if (interpolateShortest) {
        // switch to rgb color mode
        colorMode(RGB);
        interColor = lerpColor(startCol, endCol, lerpAmount);
        // switch back to HSB
        colorMode(HSB);
      } else {
        interColor = lerpColor(startCol, endCol, lerpAmount);
      }

      fill(interColor);
      let posX = x * boxWidth;
      let posY = y * boxHeight;
      rect(posX, posY, boxWidth, boxHeight);
      colors.push(interColor);
    }
  }
}

function shakeColors() {
  for (let i = 0; i < tileCountY; i++) {
    let col1 = floor(random(0, 100));
    let col2 = floor(random(0, 100));
    let col3 = floor(random(0, 100));
    let randomColor = color(col1, col2, col3);
    colorsLeft[i] = randomColor;
  }
  for (let i = 0; i < tileCountY; i++) {
    let col1 = floor(random(100, 255));
    let col2 = floor(random(100, 255));
    let col3 = floor(random(100, 255));
    let randomColor = color(col1, col2, col3);
    colorsRight[i] = randomColor;
  }
}

function keyPressed() {
  //add in the keypressed functionality to...
  // export color array as an ASE file
  if (key == "c" || key == "C")
    writeFile([gd.ase.encode(colors)], gd.timestamp(), "ase");
  //save canvas as a PNG
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
  //alter the interpolation variable using keyPressed
  if (key == "1") interpolateShortest = true;
  if (key == "2") interpolateShortest = false;
}

// add in mouse interaction to generate a new color palette
function mouseReleased() {
  shakeColors();
}
