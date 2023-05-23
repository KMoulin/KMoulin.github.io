
let sliderT1;
let sliderT2;
let sliderOff;
let pT1;
let pT2;
let pOff;
let varP;
function setup() {
  createCanvas(1000, 1000, WEBGL);
  angleMode(DEGREES);
  sliderT1 = createSlider(1, 100, 60);
  sliderT1.position(10, height + 5 -250);
  sliderT1.mousePressed(changeSlider); 
  sliderT1.mouseReleased(changeSlider);
  pT1 = createDiv('T1 =');
  pT1.style('font-size', '16px');
  pT1.position(100, height + 5 -250);
  
  sliderT2 = createSlider(1, 100, 60);
  sliderT2.position(10, height + 15-250);
  sliderT2.mousePressed(changeSlider);
  sliderT2.mouseReleased(changeSlider);
  pT2 = createDiv('T2 =');
  pT2.style('font-size', '16px');
  pT2.position(100, height + 15 -250);
  
   
  sliderOff = createSlider(1, 100, 10);
  sliderOff.position(10, height + 25 -250);
  sliderOff.mousePressed(changeSlider);
  sliderOff.mouseReleased(changeSlider);
  pOff = createDiv('Offresonance =');
  pOff.style('font-size', '16px');
  pOff.position(100, height + 25 -250);
  
  varP =new Path();
  varP.freeprecess(5,600,100,10);
//print(varP.A);
  //print(varP.B);
 // varP.add(random(0,150),random(0,150),random(0,150));
  sliderT1.style('width', '80px');
  sliderT2.style('width', '80px');
  sliderOff.style('width', '80px');
  pT1.html( String("T1 = " +String(sliderT1.value()*10)+ "ms"));
  pT2.html(String("T2 = " +sliderT2.value()+ "ms"));
  pOff.html( String("Offresonance = " +sliderOff.value()+ "ms"));
  describe(
    'a rotating white cylinder with limited Y detail, with a slider that adjusts detailY'
  );
}

function draw() {
  background(255);
 // varP.add(random(0,150),random(0,150),random(0,150));
  
  stroke(255);
  //rotateX(frameCount * 0.01);
  //rotateY(frameCount * 0.01);
  //box(300);
  // rotateX(millis() / 1000);
 // rotateZ(millis() / 1000);
  orbitControl();
  ambientLight(60, 60, 60);
  pointLight(255, 255, 255, 45, 45, 100);
  
  rotateX(90);
  if (mouseIsPressed && keyIsPressed) 
  {
    varP.flip();
  }
  else 
  {
    varP.add();
  }
  varP.show();
  normalMaterial();
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
}
function changeSlider()
{
  varP.freeprecess(5,sliderT1.value()*10,sliderT2.value(),sliderOff.value());
  pT1.html( String("T1 = " +String(sliderT1.value()*10)+ "ms"));
  pT2.html(String("T2 = " +sliderT2.value()+ "ms"));
  pOff.html( String("Offresonance = " +sliderOff.value()+ "ms"));
  
}
// A Path is a list of particles
class Path {
  constructor() {
    this.hue = random(100);
    this.cpt=0;
    this.maxpoint=100;
    this.M=[];
    this.A= new ArrayL(1,0,0,0,1,0,0,0,1);
    this.B= new Particle(0,0,0);
    let ip= new Particle(1,0,0);
    this.M.push(ip);
  }

  flip()
  {
    let Fa = new ArrayL(1, 0, 0,0, cos(1),  -sin(1),0, sin(1), cos(1));// [1 0 0; 0 cos(phi) -sin(phi);0 sin(phi) cos(phi)];
     let Mn= Fa.multV(this.M[this.M.length-1].x,this.M[this.M.length-1].y,this.M[this.M.length-1].z);
    
   
    this.M.push(Mn);
    this.cpt++;
    //print(Mn);
    if(this.cpt>this.maxpoint)
    {
       this.M.splice(0,1);
       this.cpt--;
    }
  }
  add()
  {
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
  freeprecess(T,T1,T2,df)
  {

    let phi = 2*PI*df*T/1000;
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
    stroke(255, 0, 0);
    strokeWeight(5);
    noFill();
    beginShape();
    for (let i = 0; i<this.M.length ; i++)
    {
      curveVertex(this.M[i].x*300,this.M[i].y*300,this.M[i].z*300);
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
