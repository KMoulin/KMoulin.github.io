class Object2D
{
  constructor(x,y, w,h) 
  {
    this.posX=x;
    this.posY=y;
    this.h = -h;
    this.w = w;
  }
  isClick(moX, moY) 
  {
    
    if (moX >= this.posX  && moX <= this.posX  + this.w) 
    {
      if (moY >= this.posY + this.h && moY <= this.posY ) 
      {
        return true;
      }
    }
    return false;
  }
  dragged(dx, dy,moX,moY)
  {
    if (this.isClick(moX, moY) )
    {
      this.posX+=dx;
      this.posY+=dy;
    }
  }
}
class Axis2D extends Object2D {
  constructor(x,y, w,h) 
  {
    super(x,y, w,h);
    this.vectX=[];
    this.vectY=[];
     this.vectY2=[];
    this.barX=50;
    this.barY=100;
    this.Xlim=[0, 0];
    this.Ylim=[0, 0];
    this.color=[255,0,0];
    this.labelX='time';
    this.labelY='|Mxy|';
    this.contrast=[1, 1, 1];
    this.bar=1;
  }
  addData(vx,vy)
  {
    this.vectX=vx;
    this.vectY=vy;
    this.Xlim=[0, 0];
    this.Ylim=[0, 0];
    for (let cpt=0;cpt<this.vectX.length;cpt++)
    {
      if(this.vectX[cpt]>this.Xlim[1])
      {
          this.Xlim[1]=this.vectX[cpt];
      }
      if(this.vectY[cpt]>this.Ylim[1])
      {
          this.Ylim[1]=this.vectY[cpt];
      }
    }
  }
  addDataY(vy)
  {
    this.vectY=vy;
    this.vectX=[];
    this.Xlim=[0, 0];
    this.Ylim=[0, 0];
    for (let cpt=0;cpt<this.vectY.length;cpt++)
    {
      if(this.vectY[cpt]>this.Ylim[1])
      {
          this.Ylim[1]=this.vectY[cpt];
      }
      this.vectX[cpt]=cpt;
      if(this.vectX[cpt]>this.Xlim[1])
      {
          this.Xlim[1]=this.vectX[cpt];
      }
      
    }
  }
  addDataY2(vy,vy2)
  {
    this.vectY2=[];
    for (let cpt=0;cpt<vy.length;cpt++)
    {
      this.vectY2[cpt]=[];
      this.vectY2[cpt][0]=vy[cpt];
      this.vectY2[cpt][1]=vy2[cpt];
    }
  }
  show()
  {
    
    let tmpx=[];
    let tmpy=[];
    let tmpdx=999999;
    let textY=0;
    let textX=0;
    push()
    stroke(0);
    strokeWeight(4);
    translate(this.posX, this.posY);
    line(0, 0, 0, this.h);
    line(0, 0, this.w,0);

    textFont(myFont);
    textSize(32);
    fill(0);
    strokeWeight(2);
    stroke(0);
    text(String(this.Xlim[0]),0,30);
    text(String(this.Xlim[1]),this.w,30);
    text(String(this.Ylim[0]),-30,0);
    text(String(this.Ylim[1]),-30,this.h);
    
    noFill();
    stroke(this.color);
    beginShape();
    for (let cpt=0;cpt<this.vectX.length;cpt++)
    {
      tmpx= map(this.vectX[cpt], this.Xlim[0], this.Xlim[1], 0, this.w); // val range min/max new range min/max
      tmpy= map(this.vectY[cpt], this.Ylim[0], this.Ylim[1], 0,  this.h); // val range min/max new range min/max
      if (abs(tmpx-this.barX<tmpdx))
      {
          tmpdx=abs(tmpx-this.barX);
          this.barY=-tmpy;
          textY=round(this.vectY[cpt], 2);
          textX=round(this.vectX[cpt], 2);
          this.contrast=[this.vectY[cpt], this.vectY2[cpt][0], this.vectY2[cpt][1]];
          //print (this.contrast)
      }
     
      vertex(tmpx,tmpy);
    }
   
    endShape();
    stroke(150);
    strokeWeight(4);
    if(this.bar==1)
    {
      line( this.barX, 0, this.barX,-this.barY);
      strokeWeight(2);
      text(String(textY),this.barX+10,-this.barY-10);
      text(String(textX),this.barX,30);
    }    
    // Label
    strokeWeight(2);
    text(this.labelX,this.w/2-40,60);
    angleMode(DEGREES);
    rotate(270);
    text(this.labelY,-this.h/2-40,-20);
    pop()
  }
  show2()
  {
    let tmpx=[];
    let tmpy=[];
    push()
    translate(this.posX, this.posY);
    strokeWeight(2);
    noFill();
    for (let cpt_ax=0;cpt_ax<2;cpt_ax++)
    {
      if(cpt_ax==0)
      {
         stroke(0,255,0);
      }
      else
      { 
        stroke(0,0,255);
      }
   
      beginShape();
      for (let cpt=0;cpt<this.vectX.length;cpt++)
      {
        tmpx= map(this.vectX[cpt], this.Xlim[0], this.Xlim[1], 0, this.w); // val range min/max new range min/max
        tmpy= map(this.vectY2[cpt][cpt_ax], this.Ylim[0], this.Ylim[1], 0,  this.h); // val range min/max new range min/max
       
      vertex(tmpx,tmpy);
      }
     
      endShape();
    }
    pop()
    
  }
  dragged(dx, dy,moX,moY)
  {
    if (this.isClick(moX, moY) )
    {
      this.barX+=dx;
      if(this.barX<0)
      {
          this.barX=0;
      }
      if(this.barX>this.w)
      {
          this.barX=this.w;
      }
      for (let cpt=0;cpt<this.vectX.length;cpt++)
      {
      
      }
      
    }
  }
 

}

