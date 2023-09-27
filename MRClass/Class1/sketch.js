
let sliderB0;
let sliderT;
let sliderOff;
let pB0;
let pT;
let pOff;
let varP;
let pFrame;
let cptFrame=0;
let Tilt=0;

let T1=600;
let T2=100;
let Off=10;

let ObjP=[];
let ObjM=[];
let pg;

function setup() {
  createCanvas(750, 750, WEBGL);

  angleMode(DEGREES);
  sliderB0 = createSlider(0, 15, 0);
  sliderB0.position(10, height + 5 -250);
  sliderB0.mousePressed(changeSlider); 
  sliderB0.mouseReleased(changeSlider);
  pB0 = createDiv('B0 =');
  pB0.style('font-size', '16px');
  pB0.position(100, height + 5 -250);
  
  
   
  sliderOff = createSlider(0, 90, 10);
  sliderOff.position(10, height + 25 -250);
  sliderOff.mousePressed(changeSlider);
  sliderOff.mouseReleased(changeSlider);
  pOff = createDiv('Offresonance =');
  pOff.style('font-size', '16px');
  pOff.position(100, height + 25 -250);
  
  
  sliderT = createSlider(1, 100, 5);
  sliderT.position(10, height + 45 -250);
  sliderT.mousePressed(changeSlider);
  sliderT.mouseReleased(changeSlider);
  pT = createDiv('Time ratio =');
  pT.style('font-size', '16px');
  pT.position(100, height + 45 -250);
  
  pFrame = createDiv('Frame Rate =');
  pFrame.style('font-size', '16px');
  pFrame.position(0, height + 100 -250 );
  
  
  for(let cpty=-5;cpty<5;cpty++)
  {
    for(let cptx=-5;cptx<5;cptx++)
    { 
       for(let cptz=-5;cptz<5;cptz++)
      {   
        varP =new Path(cptx*200,cpty*200,cptz*200);
        varP.freeprecess(5/5,T1,T2,1,sliderB0.value());
        ObjP.push(varP);
      }
    }  
  }
  ObjM=new Path(-1500,0,0);
  ObjM.l=1000;
  ObjM.c=10;
  ObjM.ref=1;
  //varP =new Path(0,0);
 // varP.freeprecess(5/5,T1,T2,Off);
  
 // varP2 =new Path(150,0);
 // varP2.freeprecess(5/5,T1,T2,Off);
  
//print(varP.A);
  //print(varP.B);
 // varP.add(random(0,150),random(0,150),random(0,150));
  sliderB0.style('width', '80px');
 
  sliderOff.style('width', '80px');
   sliderT.style('width', '80px');
  pB0.html( String("T1 = " +String(sliderB0.value())+ "T"));
  pT.html( String("Time ratio = " +String(sliderT.value())+ ""));
  pOff.html( String("Tilt = " +sliderOff.value()+ " degree"));
  Tilt=0;
  describe(
    'a rotating white cylinder with limited Y detail, with a slider that adjusts detailY'
  );
}

function draw() {
  background(255);
 // varP.add(random(0,150),random(0,150),random(0,150));
  //rect(20, 150, 50, 100)
  //stroke(255);
  orbitControl();
  ambientLight(60, 60, 60);
  pointLight(255, 255, 255, 45, 45, 100);
  //normalMaterial();
  
  
  //push();
 // specularMaterial(0, 0, 250);
  //stroke(0,0,255);
 // rotateX(180);
 // translate(-1200, 0,0);
  //cylinder(100,800*2);
 // translate(0,400*2+25*2,0);
 // cone(100*2, 100*2);
 // pop();
  //rotateX(frameCount * 0.01);
  //rotateY(frameCount * 0.01);
  //box(300);
  // rotateX(millis() / 1000);
 // rotateZ(millis() / 1000);
  
  let Mx=0;
  let My=0;
  let Mz=0;
  rotateX(90);
  if (mouseIsPressed && keyIsPressed) 
  {
    varP.flip();
    varP2.flip();
  }
  else 
  {
    for (let cpt=0;cpt<ObjP.length;cpt++)
    {
        ObjP[cpt].add2();
        ObjP[cpt].show();
        Mx+=ObjP[cpt].M[ObjP[cpt].M.length-1].x/ObjP.length;
        My+=ObjP[cpt].M[ObjP[cpt].M.length-1].y/ObjP.length;
        Mz+=ObjP[cpt].M[ObjP[cpt].M.length-1].z/ObjP.length;
    }
    //varP.add();
    //varP2.add();
  }
  ObjM.setM(Mx,My,Mz);
  ObjM.show();
  //varP.show();
  //varP2.show();
  
  
  cptFrame++;
  if (cptFrame>20)
  {
    pFrame.html( String("Frame Rate = " +getFrameRate()+ " Hz"));
    cptFrame=0;
  }
 
}
function changeSlider()
{
  
 pB0.html( String("T1 = " +String(sliderB0.value())+ "T"));

  pOff.html( String("Tilt = " +sliderOff.value()+ " degree"));
  pT.html( String("Time ratio = " +String(sliderT.value())+ ""));
  //varP.freeprecess(5/sliderT.value(),T1,T2,Off);
  //varP2.freeprecess(5/sliderT.value(),T1,T2,Off);
  
    for (let cpt=0;cpt<ObjP.length;cpt++)
    {
        ObjP[cpt].freeprecess(5/sliderT.value(),T1,T2,1,sliderB0.value());
    }
}

class Particle
  {
    constructor(x,y,z)
    {
      this.x=x;
      this.y=y;
      this.z=z;
    }
  }

class ArrayL
  {
    constructor(x1,x2,x3,y1,y2,y3,z1,z2,z3)
    {
     this.mat=[];
      for (let i = 0; i < 3; i++)
      {
         this.mat[i]=[];
         for (let j = 0; j < 3; j++)
         {
          this.mat[i][j]=0;
         }
      }
      // row column
      this.mat[0][0]=x1;
      this.mat[0][1]=x2;
      this.mat[0][2]=x3;
      this.mat[1][0]=y1;
      this.mat[1][1]=y2;
      this.mat[1][2]=y3;
      this.mat[2][0]=z1;
      this.mat[2][1]=z2;
      this.mat[2][2]=z3;
    }
    mult(mat2)
    {
      let matResult= new ArrayL(0,0,0,0,0,0,0,0,0);
      for (let i = 0; i < 3; i++)
      {
         for (let j = 0; j < 3; j++)
         {
            for (let k = 0; k < 3; k++)
            {
               matResult.mat[i][j] += this.mat[i][k] * mat2.mat[k][j];
            }
         }
      }
      return matResult;
      
    }
    multV(x,y,z)
    {
       let vect=[x,y,z];
       let vecttmp=[0,0,0];
       let partresult= new Particle(0,0,0);
       for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                vecttmp[j] += this.mat[i][j] * vect[i];
            }
           
        }
     
        partresult.x=vecttmp[0];
       partresult.y=vecttmp[1];
       partresult.z=vecttmp[2];
      return partresult;
    }
  }
