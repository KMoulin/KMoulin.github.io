
let Xaxis=100;
let Yaxis=100;
let Xoffset=0;
let Yoffset=0;
let buttonG;
let ctrl_key=false;
let lManager;
let eManager;
let ID_manager;

// map (mouseX, min, max, new_min,new_max)

function setup() 
{
  createCanvas(5000, 5000); //windowsWidth, WindowsHeight
 // background(220);
  ID_manager=0;
  lManager = new layoutManager(400,50);
  lManager.addLoop();
  lManager.addLoop();
  lManager.addModule();
  lManager.addProbe();
  lManager.addLoop();
  lManager.addLoop();
  lManager.addModule();
  
  
//  blendMode(DIFFERENCE    );
}

function draw() 
{
 
  background(256);
   
  lManager.show();
  
  /*
  buttonG = createButton('Add Gradients');
  buttonG.position(0, 0);*/
 
}


function doubleClicked() 
{

  lManager.isDoubleClick(mouseX,mouseY,ctrl_key);
}
function mousePressed() 
{

  lManager.isClick(mouseX,mouseY,ctrl_key);
  Xoffset = mouseX ;
  Yoffset = mouseY ;
  lManager.updateObj2Table();
 // print(Xoffset)
}

function mouseDragged() 
{

  lManager.dragged(mouseX - Xoffset, mouseY-Yoffset,mouseX,mouseY);
  Xoffset = mouseX ;
  Yoffset = mouseY ;
  lManager.updateObj2Table();
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
function ExportPulSeq()
{
  lManager.exportPulSeq();
}
function myInputEvent() {
  //console.log('you are typing: ', this.value());
  //console.log('Object: ', this.value());
  lManager.updateTable2Obj();
}
function plusObject()
{
  let nid=this.id();
  let sp=split(nid, '_');
  lManager.eventID(int(sp[0]),int(sp[1]));
}
function newID()
{
  ID_manager=ID_manager+1;
  return ID_manager;
}