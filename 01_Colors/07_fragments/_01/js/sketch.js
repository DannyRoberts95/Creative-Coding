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
