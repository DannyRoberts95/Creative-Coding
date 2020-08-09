'use strict'

let colorCount = 100;

let hueVals = [];
let satVals = [];
let brightVals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  //defining random seed ensures identical random results each time the sketch runs
  randomSeed(0);
}


function draw() {
  noLoop();

  for (let i = 0; i < colorCount; i++) {
    if (i % 2 === 0) {
      hueVals[i] = int(random(180, 360));
      satVals[i] = 100;
      brightVals[i] = int(random(25, 75));
    } else {
      hueVals[i] = int(random(0, 180));
      satVals[i] = 100;
      brightVals[i] = int(random(50, 100));
    }
  }
  //create the counter variable which will be used for modulus math later on
  let counter = 0;
  //define the number of rows
  let rowCount = 1;
  // define the row height
  let rowHeight = width / rowCount;

  //for every row...
  for (let i = 0; i < rowCount; i++) {
    let fragmentNumber = 5;
    let fragmentWidths = []
    let widthSum = 0;

    //generate the random values which will be mapped to fragment width
    for (let ii = 0; ii < fragmentNumber; ii++) {
      fragmentWidths[ii] = random(50, 200);
      //add the vales together so they can be scaled later
      widthSum += fragmentWidths[ii];
    }
    //scale the random values to fit the width of the window
    for (let ii = 0; ii < fragmentNumber; ii++) {
      let scaledWidth = (fragmentWidths[ii] / widthSum) * width;
      fragmentWidths[ii] = scaledWidth;
    }
    //render the fragments..

    //store the X pos for each fragment so we know where to begin drawing the next one
    let fragXpos = 0;
    for (let ii = 0; ii < fragmentNumber; ii++) {
      let index = counter % colorCount;
      let col = color(hueVals[index], satVals[index], brightVals[index]);

      let x = fragXpos;
      let y = i * rowHeight;
      //use the fragment width stored in the array
      let w = fragmentWidths[ii];
      let h = rowHeight;

      fill(col);
      rect(x, y, w, h);
      //increment the fragXpos var for the next fragment
      fragXpos += fragmentWidths[ii];
      //increment the counter
      counter++;
    }
  }


}
