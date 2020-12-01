let shapes=[];
let sidesChoices = [3,4,5,6,8,12,30]
let rotations = [-90,-45,-18,0,22.5,15,0]

let colorTheme = []
let sides = 3;
let name=[sidesChoices.length];
function setup(){
  frameRate(30);
  canvas = createCanvas(windowWidth*.8, windowHeight*.8);
  canvas.parent('sketch-holder')

  colorMode(HSB);
  //shape = new Polygon();

  palatte = createDiv()
  palatte.parent('sketch-holder')
  palatte.position(width*.05,height*.05)
  for (i = 0; i<12; i++){
    colorTheme[i] = [i*30,80,50]
  }
  shape = new Polygon();
  shape.sides = sidesChoices[0]
  shape.x = width/2;
  shape.y = height/2;
  shape.spin = 0
  shape.size = width/5
  shape.spinrate = 0
  shape.color = random(colorTheme)
  shapes.push(shape);

  for (i = 0; i<sidesChoices.length; i++){
    makeButton(i,sidesChoices[i],'white',i)
  }
  name[0].style('background','hsl(10,100%,50%)')

 }

 function makeButton(i,noOfSides,color,count){

   name[i] = createButton(noOfSides.toString())
   name[i].style('background', 'white')
   name[i].class('numberButton')

   //name[i].touchEnded(function() { sides = noOfSides ;});
   //name[i].mousePressed(function() { sides = noOfSides ; name[i].addClass('active')});
   name[i].mousePressed(function() { sides = noOfSides ; setSides() });
   name[i].parent(palatte)
   name[i].size(80,80)
   //name[i].style('width', width/sidesChoices.length/2+'px' )
   //name[i].style('height', width/sidesChoices.length/2+'px' )
   //name[i].style('margin-right', width/sidesChoices.length*.1+'px' )
   name[i].id(sidesChoices[i]+'sides')
   name[i].style('text-align','center')

 }

function setSides(){

  for (var i = 0; i<sidesChoices.length; i++) {
    name[i].style('background','white')
  }
  thisone = sidesChoices.indexOf(sides)
  name[thisone].style('background','hsl(10,100%,50%)')


}

function draw(){
background(255);



  for (i=0;i<shapes.length;i++){
    shapes[i].show();
  }
  shapes[0].sides = sides;
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
    this.size = 50;
    this.sides = 6;

    this.spin = 0;
    this.spinrate = 1;
  }

  show() {


    let cF = color('hsla('+this.color[0]+', '+this.color[1]+'%, '+this.color[2]+'%, 0.5)');
    noStroke()
    fill(cF);

    angleMode(DEGREES);
    push();
    translate(this.x, this.y);
    rotate(rotations[sidesChoices.indexOf(this.sides)]);
    beginShape();
    for(let i = 1; i < this.sides + 1; i++) {
      let x = cos(360/this.sides * i)*this.size;
      let y = sin(360/this.sides * i)*this.size;
      vertex(x, y);
    }
    endShape(CLOSE);
     //stroke(0)
     let factor = 1;//*(1+.1*map(mouseX,0,width,0,10))
     strokeWeight(4)

     let cS = color('hsla('+this.color[0]+', '+this.color[1]+'%, '+this.color[2]+'%, 1.0)');
     stroke(cS);
     strokeCap(SQUARE);
     for(let i = 1; i < this.sides + 1; i++) {
       //lineVec = createVector
       let x = cos(360/this.sides * i)*(this.size*factor);
       let y = sin(360/this.sides * i)*(this.size*factor);
       let x2 = cos(360/this.sides * (i+1))*(this.size*factor);
       let y2 = sin(360/this.sides * (i+1))*(this.size*factor);
       let lineVec = createVector(x2-x,y2-y)
       lineVec.normalize()
       lineVec.mult(map(mouseY,0,height,0,30))
       lineVec.rotate(-90)
       // stroke(i*30)
       // line(0,0,lineVec.x,lineVec.y)
       push()
       translate(lineVec.x,lineVec.y)
       line(x,y,x2,y2);
       pop()
     }
    pop();
  }
}
