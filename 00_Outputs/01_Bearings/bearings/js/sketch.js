//vars to store the HSB values for the background so they can be used individually later
let bgH, bgS, bgB, bgA;
//set the random seed so random generations are consistant across frames
let ranSeed = 1;
// boolean controlling if vars are shown or not
let displayInfo = true;
//grid object declared
let grid;
//set the default size of each grid module
let moduleSize = 40;
//set the distance between each grid module
let padding = -moduleSize / 10;
//set the empty space around the grid, between it and the canvas edges
let canvasPadding = (moduleSize + padding) * 5;
//set the number of cols and rows in the grid
let colNum = 30;
let rowNum = 12;

//W = 1240
//H = 1748

//----------------------------------------------------------------------------------------------------------------------------------------
//SETUP
//----------------------------------------------------------------------------------------------------------------------------------------
function setup() {
  //based on the padding, canvas padding, cols and rows generate a canvas that fits the grid
  createCanvas(
    colNum * (moduleSize + padding) + canvasPadding * 2,
    rowNum * (moduleSize + padding) + canvasPadding * 2
  );
  //set the color mode to HSB and define the HSBA ranges
  colorMode(HSB, 360, 100, 100, 100);
  //set the mouse cursor to a cross
  cursor(CROSS);
  //pass the variables into the grid constructor and generate a new grid object
  //constructor(moduleSize, padding, cols, rows, canvasPadding, moduleStrokeThickness, circleCount, mouduleAlpha) {
  grid = new Grid(
    moduleSize,
    padding,
    colNum,
    rowNum,
    canvasPadding,
    1,
    10,
    100
  );
  // grid must be rendered after colorMode is set or else its generateColor function generates in RBG instead of HSB

  //assign the background color HSBA vals
  bgH = 225;
  bgS = 95;
  bgB = 2.5;
  bgA = 100;
}

//----------------------------------------------------------------------------------------------------------------------------------------
//DRAW
//----------------------------------------------------------------------------------------------------------------------------------------
function draw() {
  //define program FPS
  // frameRate(2);
  //set the random seed with the random seed variable
  randomSeed(ranSeed);
  //draw background
  background(bgH, bgS, bgB, bgA);

  //draw the white border around the grid
  noFill();
  stroke(95);
  strokeWeight(1);
  rect(
    canvasPadding * 0.75,
    canvasPadding * 0.75,
    width - canvasPadding * 1.5,
    height - canvasPadding * 1.5
  );

  //if the boolean is true display the variables
  if (displayInfo) {
    // pass the font color and size into the function
    displayVars(100, 12);
  }
  //run the code for the grid object
  grid.run();
}

//----------------------------------------------------------------------------------------------------------------------------------------
//DISPLAY VARIABLES
//----------------------------------------------------------------------------------------------------------------------------------------
function displayVars(col, fontSize) {
  fill(col);
  noStroke();
  //set font size
  textSize(fontSize);
  //set lineHeight
  let lineHeight = fontSize * 1.5;
  //display text for each variable
  text(`HIDE INFO " I " `, lineHeight, lineHeight * 2);
  text(`RANDOM INC // ${grid.randomInc}`, lineHeight, lineHeight * 3);
  text(`OFFSET DAMPING // ${grid.damping}`, lineHeight, lineHeight * 4);
  text(`ROWS // ${grid.rowNum}`, lineHeight, lineHeight * 5);
  text(`COLS // ${grid.colNum}`, lineHeight, lineHeight * 6);
  text(`PAD // ${grid.padding}`, lineHeight, lineHeight * 7);
  text(`R-SEED // ${ranSeed}`, lineHeight, lineHeight * 8);
}

//----------------------------------------------------------------------------------------------------------------------------------------
//KEY / MOUSE PRESSED FUNCTIONS
//----------------------------------------------------------------------------------------------------------------------------------------
function mousePressed() {
  //when mouse is pressed increment the ranSeed to change the random generation
  ranSeed++;
  //populate grid colors based on new random seed
  grid.populateGridColorArrays();
}

function keyReleased() {
  //Stop looping with Q
  if (key == "q" || key == "Q") noLoop();
  //Save Canvas with S
  else if (key == "s" || key == "S") saveCanvas(`mk18_W:${width}_H:${height}`);
  //Toggle info with I
  else if (key == "i" || key == "I") {
    if (displayInfo) {
      displayInfo = false;
    } else {
      displayInfo = true;
    }
  }
}
