let check=1;
let r=200/2;
let t=0;
let clSpin=[];
let origin=[100,100];
let oSize=[600,600];
let center=[(oSize[0]-origin[0])/2,(oSize[1]-origin[1])/2];
let gX=[];
let gY=[];
let slowC=0;
function setup() {
  createCanvas(1200, 1200);
  clSpin = new SpinSystem(100,100,600,600);
  gY= new Object2D(700,100,250,500);
  gX= new Object2D(100,700,500,250);
}

function draw() {
  background(255);
  gX.show();
  gY.show();
  clSpin.show(t);
   t++;
  /*ellipse(400, 400, 200, 200);
  let dx= r* cos(t/10);
  let dy= r* sin(t/10);
  line(400, 400, 400+dx, 400+dy);
  t++;*/
  
  
  if (mouseIsPressed )
  {
      if(gX.isClick(mouseX, mouseY))
      {
          gX.sign=check;
          clSpin.addXG(check*0.0003);
      }
      if(gY.isClick(mouseX, mouseY))
      {
          gY.sign=-check;
          clSpin.addYG(check*0.0003);
      }
  }
  else
  {
       clSpin.reset();
        gX.check=false;
        gY.check=false;
  }
  slowC=slowC+1;
  if(slowC>10)
  {
    slowC=0;
  }
     
}
function keyPressed()
{
  if (keyCode === CONTROL) 
  {
    check=-1; 
  }  
  
}
function keyReleased() {
  check=1;
}
function mousePressed() 
{
  
 
 // xOffset = mouseX <;
//  yOffset = mouseY - by;
}