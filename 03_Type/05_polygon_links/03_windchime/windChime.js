class WindChime{

  constructor(_x,_y,_windMag,_startAngle,_endAngle){
    this.location = createVector(_x,_y);
    this.windMag = _windMag;
    this.startAngle = _startAngle;
    this.endAngle = _endAngle;
    this.windVector = createVector();
    this.time = 1000;
  }


	update(){

		this.windDir = map(noise(this.time),0,1,this.startAngle,this.endAngle);
		this.windVector = p5.Vector.fromAngle(radians(this.windDir));
		this.windVector.mult(this.windMag);
		this.time = this.time + 0.050;
	}

	display(){

		push();
		translate(this.location.x,this.location.y);

		scale(0.5,0.5);
		fill(0);
		noStroke();
		textSize(20);
		textAlign(CENTER);
		text("Magnitude: "+ this.windMag,0,120);

		this.string = str(this.windVector.heading()*180/PI)
		text("Wind Direction: " + this.string.substr(0,6),0,160);

		//text("Magnitude: "+"23",0,200);

		stroke(0);
		strokeWeight(2);
		fill(255);
		ellipse(0,0,160);
		ellipse(0,0,150);
		rotate(this.windVector.heading());
		line(-65,0,65,0);
		fill(0);
		triangle(40,-15,65,0,40,15);
		pop();

	}
}
