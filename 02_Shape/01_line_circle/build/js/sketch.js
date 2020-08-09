"use strict";

function setup() {
  createCanvas(windowWidth, windowHeight);
  //Render the ends of strokes as square, instead of the default rounded end
  strokeCap(SQUARE);
}

function draw() {
  background(255);
  //translate the matrix to the center of the canvas
  translate(width / 2, height / 2);

  //The number of lines forming the circle is mapped to the mouses Y postition (retarained to an int)
  var circleResolution = int(map(mouseY, 0, height, 2, 160));
  // Circle radius is mapped to the mouses X position
  var radius = mouseX - width / 2;
  //TAU is a circle constant relating the circumfrance of a circle to its radius (6.2831855)
  //the angle of incrementation is found by dividing TAU by however many lines there are making up the Circle
  var angle = TAU / circleResolution;
  //mouseY is mapped to the stroke weight
  strokeWeight(mouseY / 40);

  //for every line to be drawn in the circle...
  for (var i = 0; i <= circleResolution; i++) {
    //find the Y value along the circles circumfrance
    var y = cos(angle * i) * radius;
    //find the X value along the circles circumfrance
    var x = sin(angle * i) * radius;
    //Draw the line
    line(0, 0, x, y);
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
}
