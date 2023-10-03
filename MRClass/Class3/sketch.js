
let sliderT1;
let sliderT2;
let sliderT;
let sliderOff;
let checkbox;
let checkbox2D

let Mode2D=0;

let pT1;
let pT2;
let pT;
let pOff;
let varP;
let pInfo;
let pFA;
let FrameCpt=0;
let cam;
let myFont;
function preload() {
  myFont = loadFont('Inconsolata_Condensed-Black.ttf');
}
function setup() {
  createCanvas(750, 750, WEBGL);
  angleMode(DEGREES);
  
 sliderT1 = createSlider(1, 200, 60);
 sliderT1.position(10, height + 5 -250);
  sliderT1.mousePressed(changeSlider); 
 sliderT1.mouseReleased(changeSlider);
  pT1 = createDiv('T1 =');
  pT1.style('font-size', '16px');
  pT1.position(100, height + 5 -250);
  
  sliderT2 = createSlider(1, 200, 60);
  sliderT2.position(10, height + 15-250);
  sliderT2.mousePressed(changeSlider);
  sliderT2.mouseReleased(changeSlider);
  pT2 = createDiv('T2 =');
  pT2.style('font-size', '16px');
  pT2.position(100, height + 15 -250);
  
  sliderT = createSlider(1, 20, 1);
  sliderT.position(10, height + 25-250);
  sliderT.mousePressed(changeSlider);
  sliderT.mouseReleased(changeSlider);
  pT = createDiv('Time Scale')
  pT.style('font-size', '16px');
  pT.position(100, height + 25 -250); 
//  sliderOff = createSlider(1, 100, 10);
//  sliderOff.position(10, height + 25 -250);
//  sliderOff.mousePressed(changeSlider);
//  sliderOff.mouseReleased(changeSlider);
//  pOff = createDiv('Offresonance =');
//  pOff.style('font-size', '16px');
//  pOff.position(100, height + 25 -250);
  
  varP =new Path();
  varP.freeprecess(5,600,100,0);
//print(varP.A);
  //print(varP.B);
 // varP.add(random(0,150),random(0,150),random(0,150));
  pInfo = createDiv('Ctrl + Click to add a Flip Angle');
  pInfo.position(0, 30);
  checkbox = createCheckbox('Rotating Frame', false);
  checkbox.changed(myCheckedEvent);
  checkbox.position(0, 50);
  
  checkbox2D = createCheckbox('2D/3D', false);
  checkbox2D.changed(myChecked2DEvent);
  checkbox2D.position(0, 70);
  
  pFA = createDiv('');
  pFA.position(150, 50);
  sliderT1.style('width', '80px');
  sliderT2.style('width', '80px');
   sliderT.style('width', '80px');
//  sliderOff.style('width', '80px');
  pT1.html( String("T1 = " +String(sliderT1.value()*10)+ "ms"));
  pT2.html(String("T2 = " +sliderT2.value()+ "ms"));
  pT.html(String("Time Scale = " +sliderT.value()));
//  pOff.html( String("Offresonance = " +sliderOff.value()+ "ms"));
  describe(
    'a rotating white cylinder with limited Y detail, with a slider that adjusts detailY'
  );
  
  cam = createCamera();
   cam.camera(0, 0, 800, 0, 0, 0, 0, 1, 0);
  
}
function myChecked2DEvent()
{
  if (checkbox2D.checked()) {
    Mode2D=1;
  } else 
  {
    Mode2D=0;
  }
  //cam.setPosition(0, 0, 600);
  cam.camera(0, 0, 800, 0, 0, 0, 0, 1, 0);
 
}
function myCheckedEvent()
{
  if (checkbox.checked()) {
    varP.W=0;
  } else {
    varP.W=-5;
  }
  varP.freeprecess(5,600,100,0);
  varP.reset();
}
function draw() {
  background(255);
 // varP.add(random(0,150),random(0,150),random(0,150));
  
  //stroke(255);
  //rotateX(frameCount * 0.01);
  //rotateY(frameCount * 0.01);
  //box(300);
  // rotateX(millis() / 1000);
 // rotateZ(millis() / 1000);
  
  // Apply Bloch Equation
  if (mouseIsPressed && keyIsPressed) 
  {
    varP.flip();
     pFA.html( String("FA = " +varP.FA+ "degree"));
  }
  else 
  {
    if (FrameCpt>sliderT.value()&&sliderT.value()!=20)
    {
      varP.add();
      pFA.html('');
      FrameCpt=0;
    }
  }
  
  FrameCpt=FrameCpt+1;
  
  // Display 2D or 3D 
  if (Mode2D==1)
  {
    
      textFont(myFont);
     textSize(32);
    fill(255,0,0);
    text('Mz',-240,-150);

    fill(0,0,255);
    text('Mx',-240,50);

    fill(0,255,0);
    text('My',-270,50);
      stroke(0);
      line(-200, -150, 300, -150);
    
      line(-200, 50, 300, 50);
      varP.show2D();
    
  }
  else
  {
      orbitControl();
      ambientLight(60, 60, 60);
      pointLight(255, 255, 255, 45, 45, 100);
  
      rotateX(90);
      push();
      noStroke();
      fill(0);
      //normalMaterial();
      push(); // Start a new drawing state
      translate(0, 150,0);
      cylinder(3,300);
      translate(0, 150,0);
      cone(8, 8);

      pop();

      push(); // Start a new drawing state
      rotateX(90);
      translate(0, 150,0);
      cylinder(3,300);
      translate(0, 150,0);
      cone(8, 8);
      pop();
      push();
      rotateZ(90);
      translate(0, 150,0);
      cylinder(3,300);
      translate(0, 150,0);
      cone(8, 8);
      pop();
      pop();
      varP.show();
  }
  
 
  
}
function changeSlider()
{
  varP.freeprecess(5,sliderT1.value()*10,sliderT2.value(),0);
  pT1.html( String("T1 = " +String(sliderT1.value()*10)+ "ms"));
  pT2.html(String("T2 = " +sliderT2.value()+ "ms"));
  if(sliderT.value()==20)
  {
    pT.html(String("Time Scale = pause" ));
  }
  else
  {
    pT.html(String("Time Scale = " +sliderT.value()));
  }
 // pOff.html( String("Offresonance = " +sliderOff.value()+ "ms"));
  
}
// A Path is a list of particles
class Path {
  constructor() {
    this.hue = random(100);
    this.cpt=0;
    this.maxpoint=100;
    this.M=[];
    this.W=-5;
    this.T=1;
    this.B0=1.5;
    this.l=250;
    this.c=1;
    this.FA=0;
    this.A= new ArrayL(1,0,0,0,1,0,0,0,1);
    this.B= new Particle(0,0,0);
    let ip= new Particle(0.01,0.01,1);
    this.M.push(ip);
  }

  flip()
  {
    angleMode(DEGREES);
    let tmpFA=1;
    if (this.M[this.M.length-1].y<0)
    {
      tmpFA=-tmpFA;    
    }
    let Fa = new ArrayL(1, 0, 0,0, cos(tmpFA),  -sin(tmpFA),0, sin(tmpFA), cos(tmpFA));// [1 0 0; 0 cos(phi) -sin(phi);0 sin(phi) cos(phi)];
     let Mn= Fa.multV(this.M[this.M.length-1].x,this.M[this.M.length-1].y,this.M[this.M.length-1].z);
    
    let Rot=new ArrayL(cos(this.W*this.T*this.B0), -sin(this.W*this.T*this.B0), 0,sin(this.W*this.T*this.B0), cos(this.W*this.T*this.B0), 0,0, 0, 1);
    // Mn= Rot.multV(Mn.x,Mn.y,Mn.z);
    this.FA+=1;
    this.M.push(Mn);
    this.cpt++;
    //print(Mn);
    if(this.cpt>this.maxpoint)
    {
       this.M.splice(0,1);
       this.cpt--;
    }
  }
  reset()
  {
     let ip= new Particle(0.01,0.01,1);
    this.M.push(ip);
  }
  add()
  {
    this.FA=0;
    let Mn= this.A.multV(this.M[this.M.length-1].x,this.M[this.M.length-1].y,this.M[this.M.length-1].z);
    
    Mn.x+=this.B.x;
    Mn.y+=this.B.y;
    Mn.z+=this.B.z;
    
    
    this.M.push(Mn);
    this.cpt++;
    //print(Mn);
    if(this.cpt>this.maxpoint)
    {
       this.M.splice(0,1);
       this.cpt--;
    }
    
    
  }
  add2()
  {
    this.FA=0;
    //let Mn= this.M[this.M.length-1];//this.A.multV(this.M[this.M.length-1].x,this.M[this.M.length-1].y,this.M[this.M.length-1].z);
    angleMode(DEGREES);
    let Rot=new ArrayL(cos(this.W*this.T*this.B0), -sin(this.W*this.T*this.B0), 0,sin(this.W*this.T*this.B0), cos(this.W*this.T*this.B0), 0,0, 0, 1);
     let Mn= Rot.multV(this.M[this.M.length-1].x,this.M[this.M.length-1].y,this.M[this.M.length-1].z);
    //Mn.x+=this.B.x;
   // Mn.y+=this.B.y;
   // Mn.z+=this.B.z;
    
   //print(Mn)
    
    
   // Mn=Mn.mult(ArrayL);
  //  Mn.x=Mn.x*cos(this.W*this.T*this.B0)+Mn.y*sin(this.W*this.T*this.B0);

   //  Mn.y=Mn.y*cos(this.W*this.T*this.B0)-Mn.x*sin(this.W*this.T*this.B0);
    
    
    this.M.push(Mn);
     
    this.cpt++;
    //print(Mn);
    if(this.cpt>this.maxpoint)
    {
       this.M.splice(0,1);
       this.cpt--;
    }
    
    
  }
  freeprecess(T,T1,T2,df)
  {    
    let phi = this.W*this.T*this.B0+2*PI*df*T/1000;
    let E1 = exp(-T/T1);	
    let E2 = exp(-T/T2);
    angleMode(RADIANS);
    let Rz = new ArrayL(cos(phi), -sin(phi), 0,sin(phi), cos(phi), 0,0, 0, 1);
    angleMode(DEGREES);
    let Afp= new ArrayL(E2, 0, 0, 0, E2, 0,  0, 0, E1);

    this.A=Afp.mult(Rz);
    this.B.z= 1-E1;
   
  }

 
  // Display plath
  show()
  {    
    push()
    //translate (this.px,this.py,this.pz)
    noStroke();
    
    fill(0, 0, 255);
    
    //ambientMaterial(250);
   // normalMaterial();
    //specularMaterial(250,0,0);
    angleMode(DEGREES);
    let nz=sqrt(this.M[this.M.length-1].z*this.M[this.M.length-1].z+this.M[this.M.length-1].y*this.M[this.M.length-1].y+this.M[this.M.length-1].x*this.M[this.M.length-1].x);
    let nxy=sqrt(this.M[this.M.length-1].y*this.M[this.M.length-1].y+this.M[this.M.length-1].x*this.M[this.M.length-1].x);
    
    let ax=0;
    let az=0;
    if(nz!=0)
    {
      ax=90-acos(this.M[this.M.length-1].z/nz);
    }
    if(nxy!=0)
    {
     az=acos(this.M[this.M.length-1].x/nxy);
    }
    
    if( this.M[this.M.length-1].y<0)
    {
      az=-az;//-180;
    }
    
  
    push(); // Start a new drawing state
    
    rotateZ(az-90);
    rotateX(ax);
   
    translate(0,nz*this.l/2);
    cylinder(6*this.c,nz*this.l,4, 1);
    
    translate(0, nz*this.l/2,0);
    cone(18*this.c, 18*this.c);
    
    pop();
    pop();
    
    push();
    stroke(255, 0, 0);
    strokeWeight(5);
    noFill();
    
    beginShape();
    for (let i = 0; i<this.M.length ; i++)
    {
      curveVertex(this.M[i].x*this.l,this.M[i].y*this.l,this.M[i].z*this.l);
    }
     endShape();
    pop();
  } 
  show2D()
{
  noFill();
 
  
  strokeWeight(4);
   stroke(255, 0, 0);
  beginShape();
  for (let i = 0; i<this.M.length ; i++)
    {
      vertex(-200+i*4,-150-this.M[i].z*100);
    }
  endShape();
  
   stroke(0, 255, 0);
   beginShape();
  for (let i = 0; i<this.M.length ; i++)
    {
      vertex(-200+i*4,50-this.M[i].x*100);
    }
  endShape();
  
   stroke(0, 0, 255);
   beginShape();
  for (let i = 0; i<this.M.length ; i++)
    {
      vertex(-200+i*4,50-this.M[i].y*100);
    }
  endShape();
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
