class Particle {
  constructor(x, y, r, col) {
    //vectors
    this.loc = createVector(random(width), random(height));
    this.origin = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.maxSpeed = 5;
    this.maxForce = 5;

    //display vars
    this.alphaValue = 100;
    this.col = col;
    this.radius = r;
  }

  run() {
    this.seek(this.origin);
    this.flee(createVector(mouseX, mouseY));
    this.update();
    this.display();
  }

  seek(target) {
    var desired = p5.Vector.sub(target, this.loc);
    var d = desired.mag();
    var speed = this.maxSpeed;
    if (d < 50) {
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    this.applyForce(steer);
  }

  flee(target) {
    var desired = p5.Vector.sub(target, this.loc);
    var d = desired.mag();
    if (d < 100) {
      let speed = map(d, 0, 100, 0, this.maxSpeed);
      desired.setMag(speed);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.mult(-2);
      this.applyForce(steer);
    }
  }

  update() {
    this.loc.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.acc.mult(0);
  }

  edgeCheck() {
    let buffer = width * 0.1;
    if (this.loc.x <= -buffer) {
      this.loc.x = width + buffer;
    } else if (this.loc.x >= width + buffer) {
      this.loc.x = 0 - buffer;
    } else if (this.loc.y <= -buffer) {
      this.loc.y = height + buffer;
    } else if (this.loc.y >= height + buffer) {
      this.loc.y = 0 - buffer;
    }
  }

  display() {
    push();
    fill(this.col, this.alphaValue);
    translate(this.loc.x, this.loc.y);
    // rotate(this.vel.heading());
    noStroke();
    ellipse(0, 0, this.radius * 2, this.radius * 2);
    pop();
  }

  applyForce(force) {
    let f = force;
    f.limit(this.maxForce);
    this.acc.add(f);
  }
} // END OF CLASS
