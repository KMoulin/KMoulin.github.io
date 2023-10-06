// A Path is a list of particles
class BlochEquation {
  constructor() 
  {
    this.hue = random(100);
    this.cpt=0;
    this.maxpoint=10000;
    this.M=[];
    this.W=0;
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

  flip(FlipAngle)
  {
    angleMode(DEGREES);
    let tmpFA=FlipAngle;
    if (this.M[this.M.length-1].y<0)
    {
      tmpFA=-tmpFA;    
    }
    let Fa = new ArrayL(1, 0, 0,0, cos(tmpFA),  -sin(tmpFA),0, sin(tmpFA), cos(tmpFA));// [1 0 0; 0 cos(phi) -sin(phi);0 sin(phi) cos(phi)];
    let Mn= Fa.multV(this.M[this.M.length-1].x,this.M[this.M.length-1].y,this.M[this.M.length-1].z);
    
  
    this.FA+=1;
    this.M.push(Mn);
    this.cpt++;
    if(this.cpt>this.maxpoint)
    {
       this.M.splice(0,1);
       this.cpt--;
    }
  }
  reset()
  {
    let ip= new Particle(0.01,0.01,1);
    this.M=[];
    this.M.push(ip);
    this.cpt=0;
  }
  add()
  {
    this.FA=0;
    let Mn= this.A.multV(this.M[this.M.length-1].x,this.M[this.M.length-1].y,this.M[this.M.length-1].z);
    
    Mn.x+=this.B.x;
    Mn.y+=this.B.y;
    Mn.z+=this.B.z;
    
    if(this.cpt<this.maxpoint)
    {
      this.M.push(Mn);
      this.cpt++;
      //print(Mn);
      if(this.cpt>this.maxpoint)
      {
         this.M.splice(0,1);
         this.cpt--;
      }
    }
    
    
  }
  add2()
  {
    this.FA=0;
    angleMode(DEGREES);
    let Rot=new ArrayL(cos(this.W*this.T*this.B0), -sin(this.W*this.T*this.B0), 0,sin(this.W*this.T*this.B0), cos(this.W*this.T*this.B0), 0,0, 0, 1);
     let Mn= Rot.multV(this.M[this.M.length-1].x,this.M[this.M.length-1].y,this.M[this.M.length-1].z);

    
    
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
    let phi = this.W*this.T*(this.B0+df)+2*PI*df*T/1000;
    let E1 = exp(-T/T1);	
    let E2 = exp(-T/T2);
    angleMode(RADIANS);
    let Rz = new ArrayL(cos(phi), -sin(phi), 0,sin(phi), cos(phi), 0,0, 0, 1);
    angleMode(DEGREES);
    let Afp= new ArrayL(E2, 0, 0, 0, E2, 0,  0, 0, E1);

    this.A=Afp.mult(Rz);
    this.B.z= 1-E1;
   
  }

 
  // Display path
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
