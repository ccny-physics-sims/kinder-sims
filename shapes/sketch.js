let shapes=[];
let sidesChoices = [3,4,5,6,8,50]
let colorTheme = [[358, 73, 94],[350, 32, 100],[9, 70, 95],[217, 77, 100],[154, 74, 58],[270,73,96],[60, 81, 100]]

function setup(){
  frameRate(30);
  canvas = createCanvas(windowWidth*.8, windowHeight*.8);
  canvas.parent('sketch-holder')

  colorMode(HSB);
  //shape = new Polygon();



  shape = new Polygon();
  shape.sides = random(sidesChoices)
  shape.x = width/2;
  shape.y = height/2;
  shape.spin = random(-90,90)
  shape.size = random(20,100)
  shape.spinrate = random(-2,2)
  shape.color = random(colorTheme)
  shapes.push(shape);
 }



function draw(){
background(10);



  for (i=0;i<shapes.length;i++){
    shapes[i].show();
  }
}


function keyTyped(){
 if (key === 'c'){
    for ( i = shapes.length-1; i >= 0; i--){
      shapes.splice(i,1);
    }

  }
}

class Polygon {
  constructor() {
    this.x = 200;
    this.y = 200;
    this.size = 20;
    this.sides = 6;
    this.color = 'darkgray';
    this.spin = 0;
    this.spinrate = 1;
  }

  show() {
    noStroke();
    fill(this.color);
    angleMode(DEGREES);
    push();
    translate(this.x, this.y);
    rotate(this.spin+this.spinrate*frameCount);
    beginShape();
    for(let i = 1; i < this.sides + 1; i++) {
      let x = cos(360/this.sides * i)*this.size;
      let y = sin(360/this.sides * i)*this.size;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}

function touchEnded() {
  shape = new Polygon()
  shape.sides = random(sidesChoices)
  shape.x = mouseX;
  shape.y = mouseY;
  shape.spin = random(-90,90)
  shape.size = random(20,100)
  shape.spinrate = random(-2,2)
  shape.color = random(colorTheme)
  shapes.push(shape);
  // prevent default
  return false;
}
