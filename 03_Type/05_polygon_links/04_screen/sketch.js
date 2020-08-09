
let font;
let textImg;

let particles = [];

let pixelSkip = 15;
let fontSize = 250;
let randomness = 500;

let textToBeRendered = "WAX";


function preload() {
  font = loadFont("data/Montserrat-Bold.ttf");
}

function setup() {

  createInputs();
  cursor(CROSS);
  colorMode(HSB, 360, 100, 100, 100);
  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = canvasDiv.offsetWidth;
  canvas = createCanvas(canvasW - 25, windowHeight*.75);
  canvas.parent("canvas-holder");

  setUpText();
  generateParticles();

}

function draw() {
  background(7);
  randomSeed(1);

  let connectionDistance = pixelSkip*1.5;

  for (let p of particles) {
    p.run();
    for (let p2 of particles) {
      let d = dist(p.loc.x, p.loc.y, p2.loc.x, p2.loc.y);
      if (d > connectionDistance || p === p2) continue;
      let a = map(d,0,connectionDistance,100,5);
      stroke(95,a);
      line(p.loc.x, p.loc.y, p2.loc.x, p2.loc.y);
      // vertex(p2.loc.x,p2.loc.y);
    }
  }
  endShape();
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
        particles.push(new Particle(x, y, 1, color(90)));
      }
    }
  }
}

function setUpText() {
  textImg = createGraphics(canvasW, windowHeight*.75);
  textImg.pixelDensity(1);
  textImg.background(225);
  textImg.textAlign(CENTER, CENTER);
  textImg.textFont(font);
  textImg.textSize(fontSize);
  textImg.text(textInput.value(), width / 2, height/2+fontSize/2, 50, 50);
  textImg.loadPixels();
}

let textInput,pixelSkipInput,fontSizeSlider,randomnessSlider,textInputButton;

function createInputs() {
  textInput = createInput(textToBeRendered);
  textInput.parent(`input-holder`);

  pixelSkipInput = createInput(pixelSkip);
  pixelSkipInput.parent(`pixelSkip-holder`);

  fontSizeSlider = createInput(fontSize);
  fontSizeSlider.parent(`fontSize-holder`);

  randomnessSlider = createInput(randomness);
  randomnessSlider.parent(`randomSlider-holder`);


  textInputButton = createButton('Render');
  textInputButton.parent(`textInputButton-holder`);
  textInputButton.class("button is-info")
  textInputButton.mousePressed(function() {

    reset();
  });
}

function reset() {
  randomness = parseInt(randomnessSlider.value());
  fontSize = parseInt(fontSizeSlider.value());
  pixelSkip = parseInt(pixelSkipInput.value());
  textToBeRendered = textInput.value();
  setUpText();
  generateParticles();
  clear();
}
