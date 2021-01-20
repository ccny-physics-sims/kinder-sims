let symmetry = 1;
let angle;
let saveButton, clearButton;
let symmetryCountSlider;
let strokeColor;
let mirror = true;

let theme = [[120, 76, 80,'#32cd32'],[15, 100, 96,'#F43D00'],[55, 82, 96,'#FFEF2F'],[282, 95, 87,'#9E0BDE'],[204, 95, 96,'#0296FA'],[30,99,88,'#E07102'],[0,0,0,'#000000'],[1,1,1,'#ffffff']]
let alphas = ['ff','dd','cc','bb','aa']

let mean = 0
let sd = .5
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder')
  angleMode(DEGREES);
  background(250);

  strokeColor = theme[0][3]
  palatte = createDiv()
  palatte.parent('sketch-holder')
  palatte.position(10,15)

  symSelectPicker = createDiv()
  symSelectPicker.id('symSelectPicker')
  symSelectPicker.parent('sketch-holder')

  checkbox = createCheckbox('mirror?', true);
  checkbox.parent('sketch-holder')
  checkbox.changed(switchMirror);
  checkbox.position(theme.length*63+20,15)
  checkbox.class('mirrorCheck')
  const box = checkbox.elt.getElementsByTagName('input')[0];
  box.style.width = '50px';
  box.style.height = '50px';

  //
  // checkbox = createCheckbox('mirror?', true);
  // checkbox.parent('sketch-holder')
  // checkbox.changed(switchMirror);
  // checkbox.position(theme.length*63+20,15)
  // checkbox.class('mirrorCheck')
  //const box = checkbox.elt.getElementsByTagName('input')[0];
  // box.style.width = '50px';
  // box.style.height = '50px';

  clearButton = createButton('clear');
  clearButton.mousePressed(clearScreen);
  clearButton.touchEnded(clearScreen);
  clearButton.class('square')
  clearButton.parent('sketch-holder')
  clearButton.position(width*.8,20)


  saveButton = createButton('save');
  saveButton.mousePressed(saveFile);
  saveButton.touchEnded(saveFile);
  saveButton.class('square')
  saveButton.parent('sketch-holder')
  saveButton.position(width*.9,20)



//Color palatte buttons

  for (i = 0; i<theme.length; i++){
    makeButton(i,1,'white',i)
  }

  // symmetryButtonMakers


}

function refresh(){
    redraw();
}

// Clear Screen function
function clearScreen() {
  background(250);
}

function makeSymSelectButton(name,symCount,id){
  name = createButton(name)
  name.class('symSelectButton')
  name.id(id)
  name.parent(symSelectPicker)
  name.mousePressed(function() { symmetry=symCount;});
  name.touchEnded(function(){ symmetry=symCount;});

}

function makeButton(name,themeNo,color,count){
  name = createButton(count)
  name.style('background', theme[count][3])
  name.touchEnded(function() { changeStroke(theme[count][3]);});
  name.mousePressed(function() { changeStroke(theme[count][3]);});
  name.parent(palatte)
  name.class('swatch')

}

function changeStroke(arg) {
  strokeColor = arg

}

function saveFile() {
  //save('design.jpg');
  saveCanvas(canvas, 'mydrawing', 'jpg');
}


function switchMirror(){
  if (mirror) {
  mirror = false;
} else {
  mirror = true;
}
}


function draw() {
  // push()
  //
  // stroke(150)
  // line(0,80,width,80)
  // rect(0,0,(theme.length)*62,80)
  // pop()
  //symmetry = parseInt(radio.value());
 stroke(200)
  line(width/2,0,width/2,height)

  angle = 360 / symmetry;

  translate(width / 2, height / 2);
  noStroke()
  //transRandom = random(0,4);

  colorWithAlpha = strokeColor+random(alphas)
  fill(colorWithAlpha)
  //stroke(strokeColor,.5)
  if (mouseX > 0 && mouseX < width && mouseY > 100 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        let sw = 2;
        strokeWeight(sw);
        circle(mx+randomGaussian(mean, sd),my+randomGaussian(mean, sd),random(1,8))
        circle(mx+randomGaussian(mean, sd),my+randomGaussian(mean, sd),random(1,8))

        //line(mx, my, pmx, pmy);
        if (mirror){
          push();
          scale(-1, 1);
          circle(mx+randomGaussian(mean, sd),my+randomGaussian(mean, sd),random(1,8))
          circle(mx+randomGaussian(mean, sd),my+randomGaussian(mean, sd),random(1,8))

          //line(mx, my, pmx, pmy);
          pop();


        }
        else {
          circle(mx+randomGaussian(mean, sd),my+randomGaussian(mean, sd),random(1,8))

        }
      }
    }
  }


}

function sliderChange(){
  symmetry = symmetryCountSlider.value()
}
function touchMoved() {
  return false
}
