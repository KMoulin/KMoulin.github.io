
let Xaxis=100;
let Yaxis=100;
let Xoffset=0;
let Yoffset=0;
let buttonG;
let ctrl_key=false;
let lManager;
let eManager;
// map (mouseX, min, max, new_min,new_max)

function setup() 
{
  createCanvas(5000, 5000); //windowsWidth, WindowsHeight
 // background(220);
  
  lManager = new layoutManager(400,50);
  lManager.addLoop();
  lManager.addLoop();
  lManager.addModule();
  lManager.addProbe();
  lManager.addLoop();
  lManager.addLoop();
  lManager.addModule();
  eManager = new editorManager(0,0);
//  blendMode(DIFFERENCE    );
}

function draw() 
{
 
  background(256);
   
  lManager.show();
  eManager.show();
  
  /*
  buttonG = createButton('Add Gradients');
  buttonG.position(0, 0);*/
 
}


function doubleClicked() {
   lManager.isDoubleClick(mouseX,mouseY);
}
function mousePressed() 
{

  lManager.isClick(mouseX,mouseY);
  Xoffset = mouseX ;
  Yoffset = mouseY ;
 // print(Xoffset)
}

function mouseDragged() 
{

  lManager.dragged(mouseX - Xoffset, mouseY-Yoffset,mouseX,mouseY);
  Xoffset = mouseX ;
  Yoffset = mouseY ;
}

function mouseReleased() 
{
  if (!ctrl_key)
  {  
    lManager.unselect();
  }
}
function keyPressed() 
{
  if (keyCode === CONTROL) 
  {
    ctrl_key=true; 
  }
  if (keyCode== DELETE )
  {
    lManager.deleteSelected();    
  
  }
}
function keyReleased() 
{
  if (keyCode === CONTROL) 
  {
    ctrl_key=false; 
  }
}
function AddLoop()
{
  lManager.addLoop();
}
function AddModule()
{
  lManager.addModule();
}
function AddProbe()
{
  lManager.addProbe();
}
function myInputEvent() {
  console.log('you are typing: ', this.value());
  console.log('Object: ', this.value());
}
function plusObject()
{
  let nid=this.id();
  let sp=split(nid, '_');
 lManager.eventID(int(sp[0]),int(sp[1]));
}