class Object2D
{
  constructor(x,y,w,h) 
  {
    this.posX=x;
    this.posY=y;
    this.h=h;
    this.w=w;
    this.color=[255,255,255];
    this.check=false;
    this.sign=1;
  }
  
  isClick(moX, moY) 
  {
    
    if (moX >= this.posX  && moX <= this.posX +this.w  ) 
    {
      if (moY >= this.posY   && moY <= this.posY +this.h) 
      {
       // this.color=[0,255,255];
        this.check=true;
        return true;
      }
    }
    // this.color=[255,0,0];
    return false;
  }
  show()
  {
    fill(this.color)
    rect(this.posX,this.posY, this.w,this.h);
    if(this.check)
    {
      if(this.sign>0)
      {
        line(this.posX+20,this.posY+this.h-20, this.posX+this.w-20,this.posY+20);
      }
      else
      {
        line(this.posX+20,this.posY+20, this.posX+this.w-20,this.posY+this.h-20);
      }
    }
  }
}