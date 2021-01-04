document.title = "Rule 30";
const ruleset = [0, 0, 0, 1, 1, 1, 1, 0];
let cellSystems = [];

let cycle = 0;

let colNum = 50;
let padding = 50;
let colWidth;

function setup() {
  // A4 - 3508 x 2480
  // A3 - 4961 x 3605
  // A2 - 7016 x 4961
  // createCanvas(3508, 3508);

  //SQUARE
  createCanvas(windowHeight, windowHeight);
  //FULLSCREEN
  // createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  colWidth = width / colNum;

  for (let i = 0; i < colNum; i++) {
    cellSystems.push(
      new Ca(
        ruleset,
        colWidth * i,
        0,
        colWidth,
        random(height * 0.1, height),
        2
      )
    );
  }

  background(100, 0, 0);
}

function draw() {
  const cycleFinsihed = cellSystems.every((system) => system.finished());
  if (!cycleFinsihed) {
    cellSystems.forEach((system) => {
      system.renderCells();
      !system.finished() && system.generate();
    });
  } else {
    cycle++;

    cellSystems = [];
    for (let i = 0; i < colNum; i++) {
      cellSystems.push(
        new Ca(
          ruleset,
          colWidth * i,
          0,
          colWidth,
          random(height * 0.1, height * (1 - 0.05 * cycle)),
          2
        )
      );
    }
    if (height * (1 - 0.05 * cycle) < height * 0.05) noLoop();
    else background(0, 0, 0, 20);
  }
}

class Ca {
  constructor(rules, x, y, w, h, res) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.rules = rules;
    this.cellNumber = w / res;
    this.res = res;
    this.cells = [];
    this.generation = 0;
    this.init(true);
  }

  init = (ran = false) => {
    console.log("cells initiated");
    console.log(this.rules);
    // this.cells = [];
    for (let i = 0; i < this.cellNumber; i++) {
      const active = ran
        ? random() > 0.15
        : floor(this.width / this.res / 2) === i;
      this.cells.push(active ? 1 : 0);
    }
    this.generation = 0;
    // clear();
  };

  renderCells = () => {
    console.log("RNDR");

    push();
    translate(this.x, this.y);
    this.cells.forEach((cell, i) => {
      cell === 0 ? fill(100, 0, 100) : fill(10, 100, 0);
      const x = i * this.res;
      const y = this.generation * this.res;
      noStroke();
      rect(x, y, this.res, this.res);
    });
    pop();
  };

  generate = () => {
    const nextGen = this.cells.map((cell, i) => {
      // if (i === 0 || i === this.cells.length - 1) return 0;
      const a = i === 0 ? this.cells[this.cells.length - 1] : this.cells[i - 1];
      const b = cell;
      const c = i === this.cells.length - 1 ? this.cells[0] : this.cells[i + 1];
      if (a == 1 && b == 1 && c == 1) {
        return this.rules[0];
      } else if (a == 1 && b == 1 && c == 0) {
        return this.rules[1];
      } else if (a == 1 && b == 0 && c == 1) {
        return this.rules[2];
      } else if (a == 1 && b == 0 && c == 0) {
        return this.rules[3];
      } else if (a == 0 && b == 1 && c == 1) {
        return this.rules[4];
      } else if (a == 0 && b == 1 && c == 0) {
        return this.rules[5];
      } else if (a == 0 && b == 0 && c == 1) {
        return this.rules[6];
      } else if (a == 0 && b == 0 && c == 0) {
        return this.rules[7];
      } else return 0;
    });
    this.cells = nextGen;
    this.generation++;
  };

  finished = () => this.generation * this.res >= this.height;
}

function mousePressed() {
  noLoop();
}
