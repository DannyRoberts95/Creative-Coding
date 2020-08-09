'use strict'

let colorCount = 100;

let hueVals = [];
let satVals = [];
let brightVals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  randomSeed(1);
  noStroke();
}

function draw() {
  noLoop();

  for (let i = 0; i < colorCount; i++) {
    if (i % 2 === 0) {
      hueVals[i] = int(random(180, 250));
      satVals[i] = 100;
      brightVals[i] = int(random(25, 75));
    } else {
      hueVals[i] = int(random(90, 250));
      satVals[i] = 100;
      brightVals[i] = int(random(50, 75));
    }
  }

  let counter = 0;
  let rowCount = 30;
  let rowHeight = width / rowCount;

  for (let i = 0; i < rowCount; i++) {
    let fragmentNumber = i + 1;
    let fragmentWidths = []

    //decides whether or not to break a fragment into sub-fragments
    //for every fragment on the row...
    for (let ii = 0; ii < fragmentNumber; ii++) {
      //7.5% of the time...
      if (random() < 0.075) {
        //generate a fragment value...
        let fragments = int(random(2, 20));
        //add it to the fragment count...
        fragmentNumber += fragments;
        // and break that fragment into sub fragments
        for (let iii = 0; iii < fragments; iii++) {
          //add the sub fragments into the fragmentWidths array
          fragmentWidths.push(random(2));
        }
        // OR instead of adding subfragments...
      } else {
        //add a normal fragment instead
        fragmentWidths.push(random(2, 20));
      }
    }

    let widthSum = 0;
    for (let ii = 0; ii < fragmentNumber; ii++) {
      widthSum += fragmentWidths[ii];
    }

    for (let ii = 0; ii < fragmentNumber; ii++) {
      let scaledWidth = (fragmentWidths[ii] / widthSum) * width;
      fragmentWidths[ii] = scaledWidth;
    }

    let fragXpos = 0;
    for (let ii = 0; ii < fragmentNumber; ii++) {
      let index = counter % colorCount;
      let col = color(hueVals[index], satVals[index], brightVals[index]);

      let x = fragXpos;
      let y = i * rowHeight;
      let w = fragmentWidths[ii];
      let h = rowHeight;

      fill(col);
      rect(x, y, w, h);
      fragXpos += fragmentWidths[ii];
      counter++;
    }
  }
}

//If the mouse is clicked, generate a new random seed and run the draw
function mouseReleased() {
  randomSeed(random(100000));
  loop();
}
// Add the ability to save canvas colors as an ASE file and PNG
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'c' || key == 'C') {

    let colors = [];
    //loop through the H,S and B value arrays...
    for (let i = 0; i < hueValues.length; i++) {
      // create a color object from each and push it into the colors array...
      colors.push(color(hueValues[i], saturationValues[i], brightnessValues[i]));
    }
    //create an ase file
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }
}
