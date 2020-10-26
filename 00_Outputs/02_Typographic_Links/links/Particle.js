class Particle {
  constructor(x, y, r, col) {
    //spawn the partical within a random range
    this.loc = createVector(
      random(-width, width * 2),
      random(-height, height * 2)
    );
    //set the origin as the point it will seek towards
    this.origin = createVector(x, y);

    this.vel = p5.Vector.random2D();
    this.acc = createVector();

    //set the max speed and forces
    this.maxSpeed = 20;
    this.maxForce = 7.5;

    //display variables
    this.alphaValue = 100;
    this.col = col;
  }

  run() {
    this.seek(this.origin);
    this.flee(createVector(mouseX, mouseY));
    this.update();
  }

  //function to guide the particle to its traget (its origin)
  seek(target) {
    //get a vector that ponts from location to its target
    let desired = p5.Vector.sub(target, this.loc);
    // the distance is equal to desired vecotrs magnitude
    let d = desired.mag();
    //set the speed
    let speed = this.maxSpeed;
    //if the distance is less than the fontsize * 0.75...
    if (d < fontSize * 0.75) {
      //set the particles movement speed based on the distance it still has to travel to its target
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    //set the magnitude to the speed var
    desired.setMag(speed);
    //find the steering force by subtracting desired from the velocity
    let steer = p5.Vector.sub(desired, this.vel);
    //apply the steer force
    this.applyForce(steer);
  }

  //same concept as seek function above, except steer force is inverted
  flee(target) {
    let desired = p5.Vector.sub(target, this.loc);
    let d = desired.mag();
    if (d < fontSize * 0.75) {
      let speed = map(d, 0, fontSize * 0.75, 0, this.maxSpeed);
      desired.setMag(speed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.mult(-1);
      this.applyForce(steer);
    }
  }

  //Basic particle update function
  update() {
    this.loc.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.acc.mult(0);
  }

  // check the edges
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

  //function for applying a force
  applyForce(force) {
    let f = force;
    f.limit(this.maxForce);
    this.acc.add(f);
  }
} // END OF CLASS
