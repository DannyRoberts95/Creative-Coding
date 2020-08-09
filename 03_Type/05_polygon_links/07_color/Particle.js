class Particle {
  constructor(x, y, r, col) {
    this.loc = createVector(
      random(-width, width * 2),
      random(-height, height * 2)
    );
    this.origin = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.maxSpeed = 20;
    this.maxForce = 7.5;

    //display lets
    this.alphaValue = 100;
    this.col = col;
    this.radius = r;
  }

  run(particlesArray) {
    this.seek(this.origin);
    this.flee(createVector(mouseX, mouseY));
    this.update();
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.loc);
    let d = desired.mag();
    let speed = this.maxSpeed;
    if (d < fontSize * 0.5) {
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    this.applyForce(steer);
  }

  flee(target) {
    let desired = p5.Vector.sub(target, this.loc);
    let d = desired.mag();
    if (d < fontSize * 0.5) {
      let speed = map(d, 0, 100, 0, this.maxSpeed);
      desired.setMag(speed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.mult(-1);
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

  applyForce(force) {
    let f = force;
    f.limit(this.maxForce);
    this.acc.add(f);
  }
} // END OF CLASS
