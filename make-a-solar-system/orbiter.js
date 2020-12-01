var Orbiter = function(position, velocity, acceleration, mass, hslValues){
this.position = position;
this.velocity = velocity;
this.acceleration = acceleration;
this.mass = mass;
this.radius = Math.pow(mass,.333)
this.theHue = hslValues;
this.theColor = color(this.theHue[0],this.theHue[1],this.theHue[2]);
this.c = 0
this.radiusScale = 2;
}

Orbiter.prototype.display = function(){
  push();

  fill(this.theColor);
  circle(this.position.x, this.position.y, this.radius*2*this.radiusScale)
  pop();
  this.c++
  if(this.c % 2 == 0){
    Trails.push(new TrailDot(createVector(this.position.x, this.position.y),100));
  }
}
