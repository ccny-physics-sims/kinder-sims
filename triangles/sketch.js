let topOffsetX, topOffsetY;
let colorTheme = [];
let n;
function setup(){
  frameRate(30);
  canvas = createCanvas(windowWidth*.8, windowHeight*.8);
  canvas.parent('sketch-holder')
  for (i = 0; i<12; i++){
    colorTheme[i] = [i*30,80,100]
  }
  colorMode(HSB);
  //shape = new Polygon();
  shape = new Triangle();
  whatKindOfTriangle = createP()
  whatKindOfTriangle.position(width/2,height*.9)
  whatKindOfTriangle.style('text-align', 'center')
  whatKindOfTriangle.style('font-size','3em')
  //whatKindOfTriangle.style('color',color(25, 23, 200, 50))

 }



function draw(){
background(250);

translate(width/2, height/2)
shape.show()

}

class Triangle {
  constructor() {
    this.size = width/2;
    this.x = 0;
    this.y = 0;
    this.color = 'darkgray';
    this.spin = 0;
  }

  show() {
    let x1 = this.x - (this.size/2);
    topOffsetX = map(mouseX,0,width,-this.size,this.size)
    topOffsetY = map(mouseY,0,height,-this.size/2,this.size/2)
    let x2 = this.x+topOffsetX;
    let x3 = this.x + (this.size/2);
    let y1 = this.y + (this.size/2);
    let y2 = this.y - (this.size/2)+topOffsetY;
    let y3 = this.y + (this.size/2);
      fill(this.color);

    if(isSmall(x2) && isSmall(sqrt( pow(this.size,2) - pow(this.size/2,2)) - (y3-y2)) ){
      n = 0;
      whatKindOfTriangle.html('Equilateral')
    }
    else if (isSmall(topOffsetX))
    {
      n=1
      whatKindOfTriangle.html('Isosceles')
    }
    else if ( isSmall((y3-y2)-this.size) && isSmall(abs(topOffsetX)-this.size/2) )  {
      n=4
      whatKindOfTriangle.html('Right Isosceles')
    }
    else if (isSmall(abs(topOffsetX)-this.size/2)) {
      n=9
      whatKindOfTriangle.html('Right Triangle')
    }
    else if (x2<x1 || x2>x3){
      n=6
      whatKindOfTriangle.html('Obtuse')
    }
    else if (x2>x1 && x2<x3){
      n=7
      whatKindOfTriangle.html('Acute')
    }
    // else if (isSmall(abs(topOffsetX)-this.size/2)  && isSmall((y3-y2)-this.size) )  {
    //   fill('purple')
    // }
    fill(colorTheme[n])
    //whatKindOfTriangle.html('Right Isocolese')
    //console.log('hsl('+colorTheme[n][0]+','+colorTheme[n][1]+'%,'+colorTheme[n][2]+'%)');
    whatKindOfTriangle.style('color',color(colorTheme[n][0],colorTheme[n][1],colorTheme[n][2]))
    //console.log(isSmall((y3-y2)-this.size) )
    noStroke();
    angleMode(DEGREES);
    push();
    translate(this.x, this.y);
    rotate(this.spin);
    beginShape();
    vertex(x1 - this.x, y1 - this.y);
    vertex(x2 - this.x, y2 - this.y);
    vertex(x3 - this.x, y3 - this.y);
    endShape(CLOSE);
    pop();
  }
}

function isSmall(number){
  return Math.abs(number) < 3;
}
