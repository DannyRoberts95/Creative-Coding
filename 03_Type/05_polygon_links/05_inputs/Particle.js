class Particle {
  constructor(x, y, r, col) {
    this.loc = createVector(
      x + random(-width, width),
      y + random(-height, height)
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

  // behaviour(flock) {
  //   //get the array of flock forces from steer
  //   let flockForces = this.steer(flock);
  //   //for every steering force...
  //   for (let force of flockForces) {
  //     //apply that force
  //     this.applyForce(force);
  //   }
  // }
  //
  // steer(flock) {
  //   let alignment = createVector();
  //   let cohesion = createVector();
  //   let seperation = createVector();
  //   let total = 0;
  //   //for every member of the flock...
  //   for (let other of flock) {
  //     let vecToOther = p5.Vector.sub(this.loc, other.loc);
  //     //get the distance between myself and the other Particle
  //     let d = vecToOther.mag();
  //     //get the angle between the two to decide if it is within my field of view
  //     let ang = degrees(this.loc.angleBetween(other.loc));
  //
  //     if (
  //       other !== this &&
  //       other.active & (d < this.perceptionRadius) &&
  //       ang < this.perceptionAngle / 2
  //     ) {
  //       alignment.add(other.vel);
  //       cohesion.add(other.loc);
  //       let diff = p5.Vector.sub(this.loc, other.loc);
  //       diff.div(d * d);
  //       seperation.add(diff);
  //       total++;
  //     }
  //   }
  //
  //   if (total > 0) {
  //     //ALIGNMENT
  //     alignment.div(total);
  //     alignment.setMag(this.speed);
  //     alignment.sub(this.vel);
  //     alignment.limit(this.maxForce);
  //     alignment.mult(this.steerWeights.aw);
  //     //COHESION
  //     cohesion.div(total);
  //     cohesion.sub(this.loc);
  //     cohesion.setMag(this.speed);
  //     cohesion.limit(this.maxForce);
  //     cohesion.mult(this.steerWeights.cw);
  //     //SEPERATION
  //     seperation.div(total);
  //     seperation.setMag(this.speed);
  //     seperation.sub(this.vel);
  //     seperation.limit(this.maxForce);
  //     seperation.mult(this.steerWeights.sw);
  //   }
  //   let steeringForces = [alignment, cohesion, seperation];
  //   return steeringForces;
  // }

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
