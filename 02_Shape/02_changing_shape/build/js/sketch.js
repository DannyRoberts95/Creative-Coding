"use strict";

//Variable to store the color
let strokeColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  strokeWeight(1);
  strokeColor = color(0, 10);
}

function draw() {
  //if the left mouse button is pressed down...
  if (mouseIsPressed && mouseButton == LEFT) {
    //save matrix state
    push();
    // translate to the middle
    translate(width / 2, height / 2);
    //the number of vertices that make us the circle is mapped to the mouseY
    let circleResolution = int(map(mouseY + 1, 1, height, 3, 100));
    // map the size of the circle to the mouseX
    let radius = map(mouseX, 0, width, 1, height * 0.45);
    //the angle increment each existing vertices is based TAU divided by the number of existing vertices
    let angleIncrement = TAU / circleResolution;
    //set stroke col
    stroke(strokeColor);

    //begin drawing a shape...
    beginShape();
    //for each vertex to be drawn...
    for (let i = 0; i <= circleResolution; i++) {
      //find the x point along the circumfrence based on the COS of angleIncrement * the i counter.
      let x = cos(angleIncrement * i) * radius;
      //find the y point along the circumfrence based on the SIN of angleIncrement * the i counter.
      let y = sin(angleIncrement * i) * radius;
      // draw each vertex with the x and y points
      vertex(x, y);
    }
    //end the shape and draw it
    endShape();
    //restore saved matrix state
    pop();
  }
}

//add in user interaction
function keyReleased() {
  //delete and BACKSPACE clears the screen
  if (keyCode == DELETE || keyCode == BACKSPACE) background(0, 0, 100);
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
  //change to a random color based on the number pressed
  if (key == "1")
    strokeColor = color(
      int(random(0, 360)),
      int(random(75, 100)),
      int(random(50, 75)),
      10
    );
}
