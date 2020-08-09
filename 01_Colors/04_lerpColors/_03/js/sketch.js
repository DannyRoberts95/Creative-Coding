let width = 750;
let height = 750;

let colorsRight = [];
let colorsLeft = [];

let tileCountX = 10;
let tileCountY = 10;
let boxWidth = width / tileCountX;
let boxHeight = height / tileCountY;

function setup() {
  createCanvas(width, height);
  colorMode(HSB);
  noStroke();
  shakeColors();
}

function draw() {
  boxWidth = width / tileCountX;
  boxHeight = height / tileCountY;
  // loop through the rows and popluate them with color
  // for each row...
  for (let y = 0; y <= tileCountY; y++) {
    // assign the colors to lerp between from the color arrays
    let startCol = colorsLeft[y];
    let endCol = colorsRight[y];
    //for each column in the row...
    for (let x = 0; x <= tileCountX; x++) {
      //establish the amount the current tile's color should be lerped by
      let lerpAmount = map(x, 0, tileCountX - 1, 0, 1);
      //lerp between startCol and endCol by the specified amount
      let interColor = lerpColor(startCol, endCol, lerpAmount);
      // set the fill
      fill(interColor);
      //define the tile position
      let posX = x * boxWidth;
      let posY = y * boxHeight;
      // render the tile
      rect(posX, posY, boxWidth, boxWidth);
    }
  }
}

function shakeColors() {
  for (let i = 0; i < tileCountY; i++) {
    colorsLeft.push(genRandomCol());
  }
  for (let i = 0; i < tileCountY; i++) {
    colorsRight.push(genRandomCol());
  }
}

function genRandomCol() {
  let col1 = floor(random(0, 255));
  let col2 = floor(random(0, 255));
  let col3 = floor(random(0, 255));
  let randomColor = color(col1, col2, col3);
  return randomColor;
}

function keyPressed() {
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode( colors )], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') interpolateShortest = true;
  if (key == '2') interpolateShortest = false;
}
