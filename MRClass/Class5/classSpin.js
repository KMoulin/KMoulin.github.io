class SpinSystem
  {
    constructor(x,y,l,h)
    {
      this.posX=x;
      this.posY=y;
      this.lenght=l;
      this.height=h;
      this.angM=[];
      this.aSpin=[];
      this.n=7;
      this.r=min(this.height/this.n,this.lenght/this.n);
      
      this.dx=this.lenght/this.n;
      this.dy=this.height/this.n;
      this.createSpins();
    }
    createSpins()
    {
      let tmpSpin=[];
      
      for(let x=0;x<this.n;x++)
      {
          for(let y=0;y<this.n;y++)
          {
            tmpSpin= new Spin(this.posX+this.dx*x,this.posY+this.dy*y,this.r)
            this.aSpin.push(tmpSpin);
          }
      }
    }
    addXG(G)
    {
      let s=0;
      for(let x=0;x<this.n;x++)
      {
          for(let y=0;y<this.n;y++)
          {
             this.aSpin[s].setFrequency(G*(this.dx*x-this.dx*(this.n-1)/2));
              //print(G*(this.dy*y-this.dy*(this.n-1)/2))
             s++;
          }
      }
    }
    addYG(G)
    {
      let s=0;
      for(let x=0;x<this.n;x++)
      {
          for(let y=0;y<this.n;y++)
          {
             this.aSpin[s].setFrequency(G*(this.dy*y-this.dy*(this.n-1)/2));
           
             s++;
          }
      }
    }
    reset()
    {
        for(let ns=0;ns< this.aSpin.length;ns++)
          {
            this.aSpin[ns].reset();
          }
    }
    show(t)
    {
  
          for(let ns=0;ns< this.aSpin.length;ns++)
          {
            this.aSpin[ns].show(t);
          }
    }
    
    
  }
class Spin
{
  constructor(x,y,r)
    {
      this.posX=x;
      this.posY=y;
      this.r=r;
      this.f0=1/10;
      this.f=this.f0;
      this.df0=0;
      this.df= this.df0;
      this.color=[255,255,255];
    }
  show(t)
  {
    //let t=0;
    let c=map(this.df0,-4*PI,4*PI,0,255);
    let a=map(this.df0,-4*PI,4*PI,40,120);
    this.color=[c, 0, 255-c,60];
    fill(this.color);
    ellipse(this.posX, this.posY, this.r, this.r);
    let dx= this.r/2* cos(t*this.f+this.df);
    let dy= this.r/2* sin(t*this.f+this.df);
    line(this.posX, this.posY, this.posX+dx, this.posY+dy);
  }
  reset()
  {
    this.df=this.df0;
    this.f=this.f0;
    
  }
  setFrequency(df)
  {
    this.f=this.f0+df;
    this.df0+=df;
  }
}