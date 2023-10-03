// A Path is a list of particles
class Path {
  constructor(x,y,z) {
    this.hue = random(100);
    this.cpt=0;
    this.maxpoint=100;
    this.px=x;
    this.py=y;
    this.pz=z;
    this.Spin=1;
    this.l=150;
    this.c=1;
    this.T=1;
    this.B0=1;
    this.W=5;
    this.M=[];
    this.ref=0;
    this.roll=random(0,1);
    this.A= new ArrayL(1,0,0,0,1,0,0,0,1);
    this.B= new Particle(0,0,0);
    let ip= new Particle(random(-1,1),random(-1,1),random(-1,1));
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
  setM(Mx,My,Mz)
  {
    let Mn=new Particle(1,0,0);
     Mn.x=Mx;
     Mn.y=My;
     Mn.z=Mz;
    this.M.push(Mn);
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
  add2()
  {
    let Mn= this.M[this.M.length-1];//this.A.multV(this.M[this.M.length-1].x,this.M[this.M.length-1].y,this.M[this.M.length-1].z);
    
    //Mn.x+=this.B.x;
   // Mn.y+=this.B.y;
   // Mn.z+=this.B.z;
    
   
    this.M.push(Mn);
     this.M[this.M.length-1].x=this.M[this.M.length-1].x*cos(this.W*this.T*this.B0)+this.M[this.M.length-1].y*sin(this.W*this.T*this.B0);

     this.M[this.M.length-1].y=this.M[this.M.length-1].y*cos(this.W*this.T*this.B0)-this.M[this.M.length-1].x*sin(this.W*this.T*this.B0);
    this.cpt++;
    //print(Mn);
    if(this.cpt>this.maxpoint)
    {
       this.M.splice(0,1);
       this.cpt--;
    }
    
    
  }
  freeprecess(T,T1,T2,df,B0)
  {
    let DE=26.7*(10**7)*1*(10**-34)*B0;
    let Kb=1*(10**-23);
    let stat=exp(-10000*DE/(Kb*305));
    
    this.T=T;
    this.B0=1+B0;
    //print(stat);
    
    if(B0==0)
    {
      this.M[this.M.length-1].x=random(-1,1);
      this.M[this.M.length-1].y=random(-1,1);
      this.M[this.M.length-1].z=random(-1,1);
    }
    else
    {
      if (this.roll>stat/2)
      {
          this.Spin=1;
          this.M[this.M.length-1].x=random(-0.1,0.1);
          this.M[this.M.length-1].y=random(-0.1,0.1);
          this.M[this.M.length-1].z=-1;
      }
      else
      {
          this.Spin=-1;
          this.M[this.M.length-1].x=random(-0.1,0.1);
          this.M[this.M.length-1].y=random(-0.1,0.1);
          this.M[this.M.length-1].z=1;
      }
    }
    let phi = 2*PI*df*T*B0/1000;
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
    //stroke(255, 255, 0);
    //strokeWeight(5);
    push()
    translate (this.px,this.py,this.pz)
    noStroke();
    if (this.Spin>0)
    {
      fill(0, 0, 255);
    }
    else
    {
       fill(255, 0, 0);
    }
    //ambientMaterial(250);
   // normalMaterial();
    //specularMaterial(250,0,0);
    angleMode(DEGREES);
    let w=5;
    if(1)
    {
       

    }
    
    let nz=sqrt(this.M[this.M.length-1].z*this.M[this.M.length-1].z+this.M[this.M.length-1].y*this.M[this.M.length-1].y+this.M[this.M.length-1].x*this.M[this.M.length-1].x);
    let nxy=sqrt(this.M[this.M.length-1].y*this.M[this.M.length-1].y+this.M[this.M.length-1].x*this.M[this.M.length-1].x);
    
    let ax=90-acos(this.M[this.M.length-1].z/nz);
    let az=acos(this.M[this.M.length-1].x/nxy);
    
    if( this.M[this.M.length-1].y<0)
    {
      az=-az;//-180;
    }
    if (this.ref==1)
    {
        ax=-ax;
     }
    else
    {
      if(Tilt==0)
      {
          ax=90;
      }
      else
      {
        if (abs(ax)>=(90-Tilt) )
        {
          ax=90-Tilt;
        }
      }
    }
    
   // print(this.M[this.M.length-1].x)
    if (this.Spin<0)
    {
      ax=ax+180;
    }  
    push(); // Start a new drawing state
    
    rotateZ(az);
    rotateX(ax);
    
    translate(0,nz*this.l/2);
    cylinder(6*this.c,nz*this.l,4, 1);
    
    translate(0, nz*this.l/2,0);
    cone(18*this.c, 18*this.c);
    
    pop();
    pop();
    
  /*  stroke(255, 0, 0);
    strokeWeight(5);
    noFill();
    
    beginShape();
    for (let i = 0; i<this.M.length ; i++)
    {
      curveVertex(this.M[i].x*300,this.M[i].y*300,this.M[i].z*300);
    }
     endShape();
     */
  }  
}
