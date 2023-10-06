
let TissueH=[];
let TissueB=[];
let TissueF=[];
let checkModel=0;
let plt1=[];
let plt2=[];

let Xoffset=0;
let Yoffset=0;
let MaxB=1000;
let NumB=100;
let Label=[];

let inputC1=[];
let inputC2=[];
let inputC3=[];
let img=[];
let myFont;
let sliderTime=[];
let sliderTR=[];
let sliderFA=[];
let pTR=[];
let pFA=[];
let pTime=[];
function preload() 
{
  myFont = loadFont('OpenSans-Medium.ttf');
  Label = loadTable("Label.txt", 'csv');
}
function setup() 
{
  createCanvas(1800, 1800);
  
   loadData() ;
  inputC1= new IO(150,700,'Heart');
  inputC2= new IO(150,750,'Blood');
  inputC3= new IO(150,800,'Fat');
  
  TissueH = new Tissue(1000,500,25,'Heart');
  inputC1.inp1.value(TissueH.T1);
  inputC1.inp2.value(TissueH.T2);
  TissueB = new Tissue(700,30,15,'Blood');
  inputC2.inp1.value(TissueB.T1);
  inputC2.inp2.value(TissueB.T2);
  TissueF = new Tissue(2350,50,25,'Fat');
  inputC3.inp1.value(TissueF.T1);
  inputC3.inp2.value(TissueF.T2);
  sliderTR = createSlider(10, 10000, 10000);
  sliderTR.position(150, 50);
  sliderTR.mousePressed(myInputEvent); 
  sliderTR.mouseReleased(myInputEvent);
  pTR = createDiv('TR = 10000 ms');
  pTR.style('font-size', '16px');
  pTR.position(150, 40);
  
  sliderFA = createSlider(-180, 180, 90);
  sliderFA.position(350, 50);
  sliderFA.mousePressed(myInputEvent); 
  sliderFA.mouseReleased(myInputEvent);
  pFA = createDiv("Flip Angle = " +String(sliderFA.value())+ " degree");
  pFA.style('font-size', '16px');
  pFA.position(350, 40);
  
  sliderTime = createSlider(1000, 10000, 10000);
  sliderTime.position(550, 50);
  sliderTime.mousePressed(myInputEvent); 
  sliderTime.mouseReleased(myInputEvent);
  pTime = createDiv("Max Time  = " +String(sliderTime.value())+ " ms ");
  pTime.style('font-size', '16px');
  pTime.position(550, 40);
  
  TissueH.simulate(10000);
  TissueB.simulate(10000);
  TissueF.simulate(10000);
  plt1=new Axis2D(150,600,600,200);
  plt2=new Axis2D(150,300,600,200);
  plt2.labelY='Mz';
  plt2.bar=0;
  plotModel();
 
}


function draw() {
  background(255);
  image(img, 900, 000,600,600);

  plt1.show();
  plt1.show2();
  plt2.show();
  plt2.show2();
}
// Convert saved Bubble data into Bubble Objects
function loadData() 
{
  let vectRow=Label.getRows();
  // The size of the array of Bubble objects is determined by the total number of rows in the CSV
  img = createImage(151, 151);
  img.loadPixels();
  for (let x=0;x<Label.getRowCount();x++)
  {
        for (let y=0;y<vectRow[x].arr.length;y++)
        {
           //print(Label.getNum(x, y)*50)
            img.set(x, 151-y, [Label.getNum(x, y)*50, Label.getNum(x, y)*50, Label.getNum(x, y)*50, 255]);
          // print(img.get(x, y))
        }
  }
  img.updatePixels();
}
function updateContrast()
  {
    
    img.loadPixels();
    let tmpContrast=1;
    let r=1;
    for (let x = 0; x < img.width; x++) 
    {
      for (let y = 0; y < img.height; y++) 
      {
       
        if(Label.getNum(x,y)==3|Label.getNum(x,y)==2)
        {
            tmpContrast=plt1.contrast[0];
        }
        else if(Label.getNum(x,y)>3&Label.getNum(x,y)<8)
        {
            tmpContrast=plt1.contrast[1];
        }
        else if(Label.getNum(x,y)>=8)
        {
            tmpContrast=plt1.contrast[2];
        }
        else
        {
            tmpContrast=0;
        }
       
        r=map(tmpContrast,0,1,0,255);
        img.set(x, 151-y, [r, r, r, 255]);       
      }
    }
    img.updatePixels();
  }
function runModel()
{
 // sliderTR.value()
}
function plotModel()
{

  //plt1.addData(0,0);
  let M=TissueH.getData();
  let MB=TissueB.getData();
  let MF=TissueF.getData();
  let Mz=[];
  let MzB=[];
  let MzF=[];
  let Mxy=[];
  let MxyB=[];
  let MxyF=[];
  for(let cptt=0;cptt<M.length;cptt++)
  {
      Mz[cptt]=M[cptt].z;
      Mxy[cptt]=sqrt(M[cptt].x*M[cptt].x+M[cptt].y*M[cptt].y);
      MzB[cptt]=MB[cptt].z;
      MxyB[cptt]=sqrt(MB[cptt].x*MB[cptt].x+MB[cptt].y*MB[cptt].y);
      MzF[cptt]=MF[cptt].z;
      MxyF[cptt]=sqrt(MF[cptt].x*MF[cptt].x+MF[cptt].y*MF[cptt].y);
  }
  //print(Mxy);
  
  plt2.addDataY(Mz);
  plt2.addDataY2(MzB,MzF);
  plt2.Xlim=[0, sliderTime.value()];
  plt2.Ylim=[0, 1];
  plt1.addDataY(Mxy);
  plt1.addDataY2(MxyB,MxyF);
  plt1.Xlim=[0, sliderTime.value()];
  plt1.Ylim=[0, 1];
  updateContrast();
}
function mousePressed() 
{

  plt1.isClick(mouseX,mouseY);
  Xoffset = mouseX ;
  Yoffset = mouseY ;
  updateContrast();
}

function mouseDragged() 
{
  plt1.dragged(mouseX - Xoffset, mouseY-Yoffset,mouseX,mouseY);
  Xoffset = mouseX ;
  Yoffset = mouseY ;
  updateContrast();
}
function myInputEvent() 
{
  
  pTR.html( String("TR = " +String(sliderTR.value())+ "ms"));
  pFA.html( String("Flip Angle = " +String(sliderFA.value())+ " degree"));
  pTime.html( String("Max Time = " +String(sliderTime.value())+ " ms"));
  
  TissueH.FA=sliderFA.value();
  TissueB.FA=sliderFA.value();
  TissueF.FA=sliderFA.value();
  
  TissueH.T1=inputC1.inp1.value();
  TissueH.T2=inputC1.inp2.value();

  TissueB.T1=inputC2.inp1.value();
  TissueB.T2=inputC2.inp2.value();
  
  TissueF.T1=inputC3.inp1.value();
  TissueF.T2=inputC3.inp2.value();
  
  
  TissueH.maxTime=sliderTime.value();
  TissueB.maxTime=sliderTime.value();
  TissueF.maxTime=sliderTime.value();
  
  TissueH.simulate(sliderTR.value());
  TissueB.simulate(sliderTR.value());
  TissueF.simulate(sliderTR.value());
  //plt1.color=[0,255,0];

  plotModel();
}
class Tissue
{
  constructor(T1,T2,T2s,name)
  {
    this.name=name;
    this.T1=T1;
    this.T2=T2;
    this.T2s=T2s;
    this.BlochEquation= new BlochEquation();
    this.BlochEquation.freeprecess(1,this.T1,this.T2,0);
    this.FA=90;
    this.maxTime=10000;
  }
  simulate(TR)
  {
    let tmpTR=TR;
    if(TR>this.maxTime)
    {
      tmpTR=this.maxTime;   
    }
    this.BlochEquation.freeprecess(1,this.T1,this.T2,0);
    this.BlochEquation.reset();
    let cptTime=0;
    for(let cptN=0;cptTime<this.maxTime;cptN++)
    {
      this.BlochEquation.flip(this.FA);
      for(let cpt=0;cpt<tmpTR;cpt=cpt+this.BlochEquation.T)
      {
          this.BlochEquation.add();
          cptTime++;
          if (cptTime>this.maxTime)
          {
            break;
          }
      }
      
    }
  }
  getData()
  {
    return this.BlochEquation.M;
  }
  
}
class IO
{
 constructor(x,y,name)
  {
    
    this.name=name;
    this.posX=x;
    this.posY=y;
    this.gapY=60;
    this.gapX=60;
    this.div1 = createDiv(String('T1 ' +this.name));
    this.div1.position(this.posX+70,this.posY);
    this.inp1 = createInput(String(0));
    this.inp1.size(60);
    this.inp1.position(this.posX, this.posY);
    this.inp1.input(myInputEvent);
  
    
    this.div2 = createDiv(String('T2 ' +this.name));
    this.div2.position(this.posX+170+this.gapX, this.posY);
    this.inp2 = createInput(String(0));
    this.inp2.size(60);
    this.inp2.position(this.posX+100+this.gapX, this.posY);
    this.inp2.input(myInputEvent)
    
    this.div2s = createDiv(String('T2* ' +this.name));
    this.div2s.position(this.posX+270+this.gapX*2, this.posY);
    this.div2s.hide();
    this.inp2s = createInput(String(0));
    this.inp2s.size(60);
    this.inp2s.position(this.posX+200+this.gapX*2, this.posY);
    this.inp2s.input(myInputEvent)
     this.inp2s.hide();
  }
}