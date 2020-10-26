//----------------------------------------------------------------------------------------------------------------------------------------
//GRID OBJECT
//----------------------------------------------------------------------------------------------------------------------------------------
class Grid {
  //define a constructor method for the grid object
  constructor(moduleSize, padding, cols, rows, canvasPadding, strokeWeight, circleCount, mouduleAlpha) {
    this.moduleSize = moduleSize;
    this.padding = padding;
    this.colNum = cols;
    this.rowNum = rows;
    this.canvasPadding = canvasPadding;
    this.strokeWeight = strokeWeight;
    this.mouduleAlpha = mouduleAlpha;

    //the var that keeps track of the random value accumulation across the grid
    this.offsetSum = 0;
    //the amount of circles contained in a module
    this.circleCount = circleCount;
    //the size of the smallest circle in the module
    this.endSize = 0;
    //the damping value for the module offset controlled by the mouse
    this.damping = 0;
    //the offsetSum is incremented by i*randomInc for every colum across the grid
    this.randomInc = 0;

    //array to store gird x & y co ordinates
    this.coOrds = [];

    //the two arrays storing the colors each row will lerp between
    this.colorsLeft = [];
    this.colorsRight = [];
    //populates the arrays with colors
    this.populateGridColorArrays();
  }

  //----------------------------------------------------------------------------------------------------------------------------------------
  //RUNS ALL THE FUNCTIONALITY FOR THE GRID OBJECT
  //----------------------------------------------------------------------------------------------------------------------------------------
  run() {
    //run the grid logic
    this.updateMouseValues();
    this.updateGridValues();
    this.renderModules();
  }

  //----------------------------------------------------------------------------------------------------------------------------------------
  // UPDATES VALUES CONTROLED BY THE MOUSE
  //----------------------------------------------------------------------------------------------------------------------------------------
  updateMouseValues() {
    // map randomInc to the mouse X
    this.randomInc = map(mouseX, 0, width, 0, 5);
    // constarin random inc between 0 and 5
    this.randomInc = constrain(this.randomInc, 0, 5);
    // map damping to the mouse Y
    this.damping = map(mouseY, 0, height, 0, 1);
    // constrain damping between 0 and 1
    this.damping = constrain(this.damping, 0, 1);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------
  //UPDATES THE VALUES STORED FOR EACH MODULE IN THE GRID
  //----------------------------------------------------------------------------------------------------------------------------------------
  updateGridValues() {
    //for every col...
    for (let i = 0; i < this.colNum; i++) {

      //increment offsetSum by randomInc*2.25 each row, this line is responsible for the increased distrotion across the grid
      this.offsetSum += (this.randomInc*2.25);

      //Alternative method of having the offsetSum accumulate exponentially
      // this.offsetSum += this.randomInc*i;

      //nest another array within coOrds[i]
      this.coOrds[i] = [];
      //and for every row...
      for (let ii = 0; ii < this.rowNum; ii++) {
        //store the X and Y values for this spot in the grid
        this.x = this.canvasPadding + (this.moduleSize / 2) + (i * (this.moduleSize + this.padding));
        this.y = this.canvasPadding + (this.moduleSize / 2) + (ii * (this.moduleSize + this.padding));
        //store the offsetSum as Z. This will be used to offset the module when it it rendered later
        this.z = this.offsetSum;
        //Store X,Y and Z inside a vector in coOrds[i][ii]
        this.coOrds[i][ii] = createVector(this.x, this.y, this.z);
      }
    }

    // reset offsetSum after each frame so it does not accumulate
    this.offsetSum *= 0;
  }

  //----------------------------------------------------------------------------------------------------------------------------------------
  //RENDERS THE GRID MODULES
  //----------------------------------------------------------------------------------------------------------------------------------------
  renderModules() {
    // for every col...
    for (let i = 0; i < this.colNum; i++) {
      // for every row...
      for (let ii = 0; ii < this.rowNum; ii++) {
        //crete a liner interpolation percentage based on how far across the grid the module is
        this.lerpAmount = map(i, 0, this.colNum, 0, 1);
        //pull the left hand color and the right hand color from this row from their arrays
        this.col1 = this.colorsLeft[ii];
        this.col2 = this.colorsRight[ii];
        //lerp between them based on the lerp amount calculated earlier
        this.interCol = lerpColor(this.col1, this.col2, this.lerpAmount);

        //pull the X,Y and Z value from the corresponding coOrds vector
        this.x = this.coOrds[i][ii].x;
        this.y = this.coOrds[i][ii].y;
        this.z = this.coOrds[i][ii].z;

        //generate an offset value for X and Y
        this.offsetX = random(-this.z, this.z);
        this.offsetY = random(-this.z, this.z);

        //icrease the modules size based on how much it has been offset from it's origin
        //the ABS fucntion returns the magnitude of a number, which is always positive
        this.renderSize = (abs((this.offsetX + this.offsetY) / 2 * this.damping) / 2) + this.moduleSize;
        //offset the smallest circle in a module by the renderSize from the center point
        this.endOffset = this.renderSize;

        //save the matrix state
        push();
        //set stroke weight
        strokeWeight(this.strokeWeight);
        //translate the the grid coOrds + the offset X and Y
        translate(this.x + (this.offsetX * this.damping), this.y + (this.offsetY * this.damping));
        //rotate the grid matrix within a range defined by this modules offset from its orign
        rotate(random(radians(-(this.offsetX + this.offsetY), (this.offsetX + this.offsetY))));

        //for every circle in the module...
        for (let iii = 0; iii < this.circleCount; iii++) {
          //set the stroke color to the interpolated color
          stroke(this.interCol);
          //define the diameter of each circle in the module by its order in the module
          this.diameter = map(iii, 0, this.circleCount, this.renderSize, this.endSize);
          //define by how much circle in the module is offset by based on its order in the module
          this.offset = map(iii, 0, this.circleCount, 0, this.endOffset);
          // use the background color values to fill each circle with reduced alpha
          fill(color(bgH, bgS, bgB, this.mouduleAlpha * 0.75));
          // draw the ellipse
          ellipse(this.offset, 0, this.diameter, this.diameter);
        }
        //revert to saved matrix state
        pop();
      }
    }
  }

  //----------------------------------------------------------------------------------------------------------------------------------------
  // GENERATE COLORS TO COLOR THE MODULES
  //----------------------------------------------------------------------------------------------------------------------------------------
  populateGridColorArrays() {
    //for every column..
    for (let i = 0; i < this.colNum; i++) {

      // //Generate colors based on a split complementry palette
      // if (i % 2 == 0) {
      //   this.hVal = 19;
      //   this.sVal = 91;
      //   this.bVal = 95;
      //   this.colorsRight[i] = color(this.hVal, this.sVal, this.bVal, this.mouduleAlpha);
      // } else if (i % 3 == 0) {
      //   this.hVal = 59;
      //   this.sVal = 96;
      //   this.bVal = 87;
      //   this.colorsRight[i] = color(this.hVal, this.sVal, this.bVal, this.mouduleAlpha);
      // }else{
      //   this.hVal = 240;
      //   this.sVal = 57;
      //   this.bVal = 89;
      //   this.colorsRight[i] = color(this.hVal, this.sVal, this.bVal, this.mouduleAlpha);
      // }

      // //Generate colors based on a triad palette
      // if (i % 2 == 0) {
      //   this.hVal = 19;
      //   this.sVal = 91;
      //   this.bVal = 100;
      //   this.colorsRight[i] = color(this.hVal, this.sVal, this.bVal, this.mouduleAlpha);
      // } else if (i % 3 == 0) {
      //   this.hVal = 173;
      //   this.sVal = 96;
      //   this.bVal = 40;
      //   this.colorsRight[i] = color(this.hVal, this.sVal, this.bVal, this.mouduleAlpha);
      // }else{
      //   this.hVal = 259;
      //   this.sVal = 82;
      //   this.bVal = 90;
      //   this.colorsRight[i] = color(this.hVal, this.sVal, this.bVal, this.mouduleAlpha);
      // }

      //Generate colors based on a analogus palette

      //based on the row number push one of three possible colors into the right hand side color array
      if (i % 3 === 0) {
        this.hVal = 261;
        this.sVal = 75;
        this.bVal = 91;
        this.colorsRight[i] = color(this.hVal, this.sVal, this.bVal, this.mouduleAlpha);
      } else if (i % 2 === 0) {
        this.hVal = 231;
        this.sVal = 90;
        this.bVal = 89;
        this.colorsRight[i] = color(this.hVal, this.sVal, this.bVal, this.mouduleAlpha);
      } else {
        this.hVal = 202;
        this.sVal = 90;
        this.bVal = 89;
        this.colorsRight[i] = color(this.hVal, this.sVal, this.bVal, this.mouduleAlpha);
      }

      //based on the row number push one of two possible colors (white or black) into the left hand side color array
      //two possible colors linearly interpolate to three possible colors creating and asnyschronus relation between the left and right hand sides
      if (i % 2 == 0) {
        this.hVal = 0;
        this.sVal = 0;
        this.bVal = 20;
        this.colorsLeft[i] = color(this.hVal, this.sVal, this.bVal, this.mouduleAlpha);
      } else {
        this.hVal = 0;
        this.sVal = 0;
        this.bVal = 85;
        this.colorsLeft[i] = color(this.hVal, this.sVal, this.bVal, this.mouduleAlpha);
      }
    }

  }

} //END OF THE CLASS
