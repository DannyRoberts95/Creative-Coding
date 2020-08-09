let canvasDiv, canvasW;
let canvasH = 500;

let font;
let textImg;

let particles = [];

let pixelSkip = 5;
let unitSize = 2.5;
let fontSize = 100;

let textToBeRendered = "JAVAWAX";

function preload() {
  font = loadFont("data/FreeSansBold.ttf");
}

function setup() {
  createInputs();

  colorMode(HSB, 360, 100, 100, 100);

  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = canvasDiv.offsetWidth;
  canvasH = canvasDiv.offsetHeight;
  canvas = createCanvas(canvasW - 25, canvasH);
  canvas.parent("canvas-holder");

  setUpText();

  generateParticles();
}

function draw() {
  background(10);

  for (let p of particles) p.run();
}

//********************************************************************************************************
//UTILITY FUNCTIONS
//********************************************************************************************************
function generateParticles() {
  particles = [];
  for (let x = 0; x < width; x += pixelSkip) {
    for (let y = 0; y < height; y += pixelSkip) {
      let index = floor((x + y * textImg.width) * 4);

      if (textImg.pixels[index] < 128) {
        particles.push(new Particle(x, y, unitSize, color(90)));
        // particles.push(new Particle(random(width), random(height), unitSize, color(0, 0, 0)));
      }
    }
  }
}

function setUpText() {
  textImg = createGraphics(canvasW, canvasH);
  textImg.pixelDensity(1);
  textImg.background(225);
  textImg.textAlign(CENTER, CENTER);
  textImg.textFont(font);
  textImg.textSize(fontSize);
  textImg.text(textInput.value(), width / 2, height / 2, 50, 50);
  textImg.loadPixels();
}

function windowResized() {
  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = canvasDiv.width;
  resizeCanvas(width - 25, canvasH);
}

function createInputs() {
  textInput = createInput(textToBeRendered);
  textInput.parent(`input-holder`);
  textInput.input(function() {
    textToBeRendered = textInput.value();
    setUpText();
    generateParticles();
  });

  unitSizelider = createSlider(1, 50, unitSize);
  unitSizelider.parent(`size-holder`);
  unitSizelider.mouseReleased(function() {
    unitSize = unitSizelider.value();
    setUpText();
    generateParticles();
  });

  pixelSkipSlider = createSlider(5, 50, pixelSkip);
  pixelSkipSlider.parent(`pixelSkip-holder`);
  pixelSkipSlider.mouseReleased(function() {
    pixelSkip = pixelSkipSlider.value();
    setUpText();
    generateParticles();
  });

  fillCheck = createCheckbox(``, true);
  fillCheck.parent(`fill-holder`);

  fontSizeSlider = createSlider(5, 750, fontSize);
  fontSizeSlider.parent(`fontSize-holder`);
  fontSizeSlider.mouseReleased(function() {
    fontSize = fontSizeSlider.value();
    setUpText();
    generateParticles();
  });
}
