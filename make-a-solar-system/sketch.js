var orbiters=[];
var gravity = .4;
var totalMass;
var Trails = [];
let massRatio;
let sun;
let orbiterHue;
var SolarSystem;
let colorTheme = [[358, 73, 94],[350, 32, 100],[9, 70, 95],[217, 77, 100],[154, 74, 58],[270,73,96]]
function setup(){
  frameRate(30);
  canvas = createCanvas(windowWidth*.8, windowHeight*.8);
  canvas.parent('sketch-holder')
  v1 = 12;
  massRatio = 20000;
  colorMode(HSB);

 SolarSystem = new GravSystem(orbiters);

sun = orbiters.push(new Orbiter(createVector(width/2,height/2),createVector(-v1/massRatio,0),createVector(0,0),massRatio,[60, 81, 100]));

orbiters[0].radiusScale = .5
// mass1 =  orbiters.push(new Orbiter(createVector(width/2,-130+height/2),createVector(v1,0),createVector(0,0),100, color('DodgerBlue')));


 }



function draw(){
background(10);
noStroke();
  for (var k = 0; k < 2; k++) { // increase the greater than value to increase simulation step rate
      SolarSystem.do_physics(1.0 / 8); // increase the divisor to increase accuracy and decrease simulation speed
  }



  //COM();

  for (var i = Trails.length-1; i >= 0; i--) {
    var p = Trails[i];
    p.run();
    if (p.isDead()) {
      //remove the TrailDot
      Trails.splice(i, 1);
    }
  }

  for (i=0;i<orbiters.length;i++){
    orbiters[i].display();
  }
}


function COM(){
  //displays the center of mass of the system
  m1 = createVector(0,0)

  totalMass=0;


  for(i=0;i<orbiters.length;i++){
    totalMass=totalMass+orbiters[i].mass;
    m1 = p5.Vector.add(m1,p5.Vector.mult(orbiters[i].position,orbiters[i].mass))
  }

  com = p5.Vector.div(m1,totalMass);
  push();
  fill(0)
  stroke(0)
  line(com.x-5,com.y,com.x+5,com.y)
  line(com.x,com.y-5,com.x,com.y+5)
  pop();
}




function windowResized() {
    // Resize necessary elements to fit new window size
    // resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }

function keyTyped(){
 if (key === 'c'){
    for ( i = orbiters.length-1; i >= 0; i--){
      orbiters.splice(i,1);
    }
    // for ( i = Trails.length-1; i >= 0; i--){
    //   Trails.splice(i,1);
    // }
  }
}

function touchEnded() {
  let newPlanetPos = createVector(mouseX,mouseY)
  let a = p5.Vector.sub(orbiters[0].position, newPlanetPos );
  let v3 = createVector(a.x,a.y)
  a.setMag(sqrt(gravity*massRatio/a.mag()));
  orbiterHue = random(0,360)
  orbiterColorKey = random(0,4)
  orbiterMass = random(10,30)
  orbiterVel = a.rotate(-HALF_PI)
  orbiterColor =  random(colorTheme);

  //console.log(orbiterColor);
  orbiters.push(new Orbiter(newPlanetPos,orbiterVel,createVector(0,0),orbiterMass, orbiterColor));
  orbiters[0].velocity.sub(p5.Vector.mult(orbiterVel,(orbiterMass/massRatio)))
  // prevent default
  return false;
}
