let sliderD=[];
let sliderV=[];
let sliderA=[];
let sliderSeq=[];

let squareD=[];
let squareVA=[];

let waterD=[];
let waterVA=[];

let D=1.5e-3; // mm^2/s
let A=0.5; // cm/s^2
let V=12; // cm/s
let f=0.15;
let Dstart=3e-2;
let Seq=[];

let ptext=[];

let GammaU =  267.513 *0.001 ;  // rad * mT-1. us-1   
let phase=[];
let magn=[];
class sequence
{
  constructor(x,y,lt,d180,Gmax)
  {
    this.x=x;
    this.y=y;
    this.lt=lt;
    this.Gmax=Gmax;
    this.d180=d180;
    this.D1=random(0,this.lt);
    this.D2=random(0,this.lt-this.D1);
    this.G=Gmax; //random()*
    this.b=0;
    this.M0=0;
    this.M1=0;
    this.M2=0;
    
     let G=[];
      for (let i=0;i<this.d180 +this.lt*2;i++)
    {
      G[i]=0;
    }
    
    for (let i=0;i<this.D1;i++)
    {
        G[i]=this.G;
    }
     
    for (let i=round(this.D1);i<(this.D1+this.D2);i++)
    {
      
        G[i]=-this.G;
    }
   
    
    for (let i=round(this.d180 +this.lt*2 -this.D1 -this.D2);i<(this.d180 +this.lt*2 -this.D1);i++)
    {

        G[i]=this.G;
    }
    
   
    for (let i=round(this.d180 +this.lt*2-this.D1);i<(this.d180 +this.lt*2);i++)
    {
    
        G[i]=-this.G;
    }
    this.b=this.bval(G);
    this.M0=this.Moment(G,0);
    this.M1=this.Moment(G,1);
    this.M2=this.Moment(G,2);
    //print(" b "+this.b+" M0 "+this.M0+" M1 "+this.M1+" M2 "+this.M2)
  }
  
  show()
  {
    fill(255,255,255);
    rect(this.x, this.y, this.D1,-this.G);
    rect(this.x+this.D1, this.y, this.D2, this.G);
    rect(this.x+this.lt+this.d180 +this.lt -this.D1 -this.D2, this.y, this.D2, this.G);
    rect(this.x+this.lt+this.d180 +this.lt -this.D1 , this.y, this.D1, -this.G);
    
  }
  bval(G)
  {
       
    let  GammaH= 267.513e6;  // Hz/T            
    let G1=G*1e-3*1e-3;      // mT/m -> T/mm
    let dT=100e-6;            // us -> s
    let bval=0;
    let bfact=0;
    let Gtmp=0;
    for (let i = 0; i < G.length; i++)
    {
            Gtmp+=G[i]*dT;
            //Integration1 = (Gtmp  .*dT);     // First integral
            bfact=Gtmp*Gtmp // Square of the First integral
            bval += bfact* dT; // Second integral
    }
    bval*=GammaH*GammaH;
    return bval*0.000000000001;
  }
  Moment(G,n)
  {
   
    let dT=1 ; //100e-6; // us -> s
    let M=0;
    let t=0;
    for (let i = 0; i < G.length; i++)
    { 
       t=i*dT;
       M+=G[i]*(pow(t,n))*dT;
    }
    return M;
  }
}
class ball
{
   constructor(x,y,d) {
    this.px =random(x,x+d);
    this.py =random(y,y+d); 
 
    this.x=x;
    this.y=y;
    this.s=d;
     
    this.dv=0;
    this.d=0;
    this.da=0;
     this.ddv=0;
   }
   update(dx,dy)
   {
      this.px-=dx;
      this.py-=dy;
    

     if(this.px>(this.x+this.s))
     {
       this.px=this.x; 
       this.ddv=this.dv;
     }
     
     if(this.px<(this.x))
     {
       this.px=this.x+this.s; 
       this.ddv=this.dv;
     }
     
     if(this.py>(this.y+this.s))
     {
       this.py=this.y;  
       this.ddv=this.dv;
     }
     if(this.py<(this.y))
     {
       this.py=this.y+this.s; 
       this.ddv=this.dv;
     }
   }
  
  show(v,a,d)
  {
    this.dv=v;
    this.da=a;
    this.d=d;
    
     
    let KD = sqrt(this.d * 3 * 2 *100 );
    let dx= random(-1,1)*KD;
    let dy= random(-1,1)*KD;
    
    this.ddv+=this.da/2;
    this.update(dx,dy+this.ddv);
   // print('The value of y is ' + this.py);
   // color(255*this.dv/12,255*this.da,255*this.d/3e-3);
    let c=color(56,255,255);
    fill (255*this.dv/12,0,255*this.d/3e-3);
    circle(this.px, this.py, 20);
  }
  
}
function setup()
{
  createCanvas(1400, 1400);
  sliderD = createSlider(0, 100, 50);
  sliderD.position(10, 10);
  sliderD.style('width', '180px');
  sliderD.mouseReleased(eventSlider);
  
  sliderV = createSlider(0, 100, 50);
  sliderV.position(210, 10);
  sliderV.style('width', '180px');
  sliderV.mouseReleased(eventSlider);
  
  sliderA = createSlider(0, 100, 50);
  sliderA.position(210, 20);
  sliderA.style('width', '180px');
  sliderA.mouseReleased(eventSlider);
  
  sliderSeq = createSlider(0, 19, 0);
  sliderSeq.position(410, 10);
  sliderSeq.style('width', '580px');
  
  ptext = createP('this is some text');
  ptext.style('font-size', '16px');
  ptext.position(410, 30);
 
  for (let i = 0; i < 40; i++)
  {
     waterD[i] = new ball(10,40,180);   
     waterVA[i] = new ball(210,40,180);  
  }
  for (let i = 0; i < 20; i++)
  {
    Seq[i]= new sequence( 410, 150, 273,43,  40);
   
  }
  
   generateLib();
  
}
function generateLib()
{
  for (let i = 0; i < 20; i++)
  {
    phase[i]=GammaU*V*Seq[i].M1+GammaU*A*Seq[i].M2;
    magn[i]= (f*exp(-Seq[i].b*Dstart)+(1-f)*exp(-Seq[i].b*D)) 
  }
}
function draw() 
{

  background(255);
  fill(255,255,255);
  square(10, 40, 180);
  fill(255,255,255);
  square(210,40, 180);
  
  for (let i = 0; i < 40; i++)
  {
     waterD[i].show(0,0,3e-3* sliderD.value()/100);
     waterVA[i].show(12*sliderV.value()/100,sliderA.value()/100,0);
  }
  let tmp=sliderSeq.value();
  Seq[tmp].show();
  let venc=PI*1000000/ (Seq[tmp].M1 * GammaU);
  ptext.html(" bval "+round(Seq[tmp].b) +" M1 "+round(Seq[tmp].M1/1000000)+" M2 "+round(Seq[tmp].M2/100000)+" VENC "+venc);
  
  noFill();
  beginShape();
  for (let i = 0; i < 20; i++)
  {
    vertex(i*20+10, map(magn[i],0, 1,0, 400)+400);
  }
  endShape();
  
 
  
  noFill();
  beginShape();
  for (let i = 0; i < 20; i++)
  {
    //vertex(abs(Seq[i].M1)/1000000+10, abs(phase[i])/100000+400);
    
     vertex(i*20+410, map(abs(phase[i])/10000000,0, 100,0, 400)+400);
  }
  endShape();
   stroke('blue'); // Change the color
  strokeWeight(20); // Make the points 10 pixels in 
  point(tmp*20+10, map(magn[tmp],0, 1,0, 400)+400);
   stroke('red'); // Change the color
  point(tmp*20+410, map(abs(phase[tmp])/10000000,0, 100,0, 400)+400)
  stroke('black');
  strokeWeight(2);
}
function eventSlider()
{
  V=12*sliderV.value()/100;
  A=sliderA.value()/100;
  D=3e-3*sliderD.value()/100;
  print("EVENT slider");
  generateLib();
}
