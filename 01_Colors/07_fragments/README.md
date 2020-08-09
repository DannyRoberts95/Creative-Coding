# Color_07_fragmentedColorPalette

This sketch generates a color palette of contrasting colors, with tiles of varying width. The tiles may also be broken down further into fragments, each with their own color.

## Step 1

```js
'use strict'

//define how many colors will be generated
let colorCount = 60;
//create 3 seperate arrays to store the HUE, SATURATION & BRIGHTNESS of each generated color
let hueVals = [];
let satVals = [];
let brightVals = [];

function setup() {
  colorMode(HSB, 360, 100, 100);

  //A "tick tock" modulus sequence to create contrasting colors inside of the HSB arrays
  for (let i = 0; i < colorCount; i++) {
    //if the index is even, do this..
    if (i % 2 === 0) {
      //define the color generation rules
      hueVals[i] = int(random(180, 360));
      satVals[i] = 100;
      brightVals[i] = int(random(25, 75));
      //else do this...
    } else {
      //define the contrasting color generation rules
      hueVals[i] = int(random(0, 180));
      satVals[i] = 100;
      brightVals[i] = int(random(50, 100));
    }
  }
}

function draw() {

}

```

## Step 2

```js
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

```

## Step 3

```js

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
      hueVals[i] = int(random(180, 360));
      satVals[i] = 100;
      brightVals[i] = int(random(25, 75));
    } else {
      hueVals[i] = int(random(0, 180));
      satVals[i] = 100;
      brightVals[i] = int(random(50, 100));
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

```

## Step 4

```js
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
      hueVals[i] = int(random(180, 360));
      satVals[i] = 100;
      brightVals[i] = int(random(25, 75));
    } else {
      hueVals[i] = int(random(0, 180));
      satVals[i] = 100;
      brightVals[i] = int(random(50, 100));
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

```
