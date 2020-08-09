let width = 750;
let height = 750;

let colorsRight = [];
let colorsLeft = [];

let tileCountX = 10;
let tileCountY = 10;
let boxWidth = width/tileCountX;
let boxHeight = height/tileCountY;

function setup(){
  createCanvas(width,height);
  colorMode(HSB);
  // noStroke();
  shakeColors();
}

function draw(){
  boxWidth = width / tileCountX;
  boxHeight = height / tileCountY;
  for (let y = 0; y <= tileCountY; y++) {
    // assign the colors to lerp between from the color arrays
    let startCol = colorsLeft[y];
    let endCol = colorsRight[y];
    //for each column in the row...
    for (let x = 0; x <= tileCountX; x++) {
      //define the tile position
      let posX = x * boxWidth;
      let posY = y * boxHeight;
      // render the tile
      rect(posX, posY, boxWidth, boxWidth);
    }
  }
}

function shakeColors() {
  for(let i = 0; i<tileCountY; i++){
    colorsLeft.push(genRandomCol());
  }
  for(let i = 0; i<tileCountY; i++){
    colorsRight.push(genRandomCol());
  }
}

function genRandomCol(){
  let col1 = floor(random(0,255));
  let col2 = floor(random(0,255));
  let col3 = floor(random(0,255));
  let randomColor = color(col1,col2,col3);
  return randomColor;
}
