let tileNumber = 24;
let tileDensity = 30;
let tileSize;
let primary, secondary, backgroundCol;
let tiles = [];
let oldTiles = [];

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(1440, 900);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  rectMode(CENTER);
  strokeCap(SQUARE);
  tileSize = width / tileNumber;
  clacTiles();
  calcCols();
  oldTiles = tiles;
}

function draw() {
  noLoop();
  background(backgroundCol);
  translate(tileSize / 2, tileSize / 2);
  strokeWeight(1);
  tiles.forEach((item) => {
    item.aor === 0 ? stroke(secondary) : stroke(primary);
    tile(item.x, item.y, item.w, item.h, item.lines, item.aor);
  });
  s;

  // saveCanvas(`${document.title}-${new Date().getTime()}`, "png");
}

const clacTiles = () => {
  oldTiles = tiles;
  tiles = [];
  for (let x = 0; x <= width - tileSize / 2; x += tileSize) {
    for (let y = 0; y <= height - tileSize / 2; y += tileSize) {
      let size = tileSize;
      tiles.push({
        x: x,
        y: y,
        w: size,
        h: size,
        lines: tileDensity,
        aor: random(1) > 0.5 ? 90 : 0,
      });
    }
  }
};
const calcCols = () => {

  let r = random(1)>0.5;
  let primaryHue = random(360);
  let secondaryHue = r?primaryHue*2:primaryHue/2; 

  primary = color(primaryHue, 33, random(40,80));
  secondary = color(secondaryHue, random(45,90), 100);
  backgroundCol = color(primaryHue, 100, 15);
};

const tile = (x, y, w, h, lines, aor) => {
  push();
  translate(x, y);
  noFill();
  ellipse(0, 0, w);
  rotate(aor);
  let xOff = 0;
  for (let i = 0; i < lines; i++) {
    let lerpAmm = map(i, 0, lines - 1, 0, 1);
    xOff = lerp(xOff, w, lerpAmm);
    push();
    translate(w / 2 - xOff, 0);
    line(0, -h / 2, 0, h / 2);
    pop();
  }
  pop();
};

function keyPressed() {
  let saveStr = `${document.title}-${new Date().getTime()}`;
  if (key == "s" || key == "S") saveCanvas(saveStr, "png");
  if (key == "q" || key == "Q") noLoop();
}
function mousePressed() {
  clacTiles();
  calcCols();
  loop();
}
