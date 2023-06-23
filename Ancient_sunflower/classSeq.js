/// Gradient ///
class Gradient extends GUIObject {
  constructor(x, y, axis, amp) {
    super(x, y, amp, 200);

    this.posY = y+axis*100;
    this.start = x;
    this.type=1;
    this.amp = amp;
    this.ramp1 = 50;
    this.flat = 100;
    this.ramp2 = 50;
    this.axis = axis;
    this.duration = this.ramp1 + this.flat + this.ramp2;
    this.shiftX = 0;
    this.shiftY = 0;
    this.col = [255, 255, 255];
    this.name="Grad_"+String(this.nID);
    this.isCompiled=false;
    this.isValid=true;
    this.end=this.start+this.duration;
    this.nPoint=0;
    this.px=[];
    this.py2=[];
    this.py=[];
    
    if(this.axis==2)
    {
          this.name="Gx_"+String(this.nID);
    }
    else if(this.axis==3)
    {
          this.name="Gy_"+String(this.nID);
    }
    else if(this.axis==4)
    {
          this.name="Gz_"+String(this.nID);
    }
    this.Eq_amp=String(this.amp);
    this.Eq_ramp1=String(this.ramp1);
    this.Eq_flat=String(this.flat);
    this.Eq_ramp2=String(this.ramp2);
    this.Eq_start=String(this.start);
  }
  computeContent(content)
  {
    
    let text2=content.replace(new RegExp('<br>', "g"), "");
    let textS=split(text2,';'); 
    try 
    {
      for (let k=0;k<textS.length;k++)
      {
        eval(textS[k]);
      }
    }
    catch
    {
      print('Error')
      return false;  
    }
   
    return true;
  }
  show(dx, dy)
  {
    this.dx = dx;
    this.dy = dy;
    if (this.isSelected)
    {
      fill(255, 204, 0);
    }
    else
    {
      if(!this.isCompiled & this.isValid) 
      {
         fill(this.col);
      }
      else if (!this.isCompiled & !this.isValid)
      {
          fill(this.col);
      }
      else if(this.isCompiled & !this.isValid) 
      {
        fill(255, 0, 0);
      }
      else
      {
        fill(0, 255, 0);
      }
    }
    if (this.isDoubleSelected) 
    {
      stroke(255, 0, 0);
      strokeWeight(4);
    }
    else
    {
        stroke(0, 0, 0);
       strokeWeight(2);
     }
   
    if(this.nPoint==0)
    {
      quad(
        this.start + this.dx,
        this.posY + this.dy, // begining of the ramp
        this.start + this.ramp1 + this.dx,
        this.posY + this.amp + this.dy, // end of the ramp, begining of the flat
        this.start + this.flat + this.ramp1 + this.dx,
        this.posY + this.amp + this.dy,
        this.start + this.ramp1 + this.flat + this.ramp2 + this.dx,
        this.posY + this.dy
      );
    }
    else
    {
        beginShape();
        for (let pt = 0; pt < this.nPoint; pt++)
        {
          vertex(this.start + this.px[pt] + dx, this.posY + this.py[pt] + dy);
        }
        endShape();
    }
  }
 
  isClick(moX, moY) {
    if (moX >= this.start + this.dx && moX <= this.start + this.l + this.dx) {
      if (
        moY >= this.posY + this.dy &&
        moY <= this.posY + this.amp + this.dy &&
        this.amp > 0
      ) {
        return true;
      }
      if (
        moY >= this.posY + this.amp + this.dy &&
        moY <= this.posY + this.dy &&
        this.amp < 0
      ) {
        return true;
      }
    }
    return false;
  }
  dragged(dx, dy) {
    if (this.isSelected) 
    {
      this.isCompiled =false;
      this.start += dx;
      if (this.start < 0) 
      {
        this.start = 0;
      }
      if (this.start > 1000) 
      {
        this.start = 1000;
      }
    }
  }
  intersect(ob, dx, dy) {
    if(this.axis!=ob.axis) return false;
    if (this.start + dx > ob.start && this.start + dx < ob.start + ob.duration) {
      return true;
    }
    if (
      this.start + this.duration + dx > ob.start &&
      this.start + this.duration + dx < ob.start + ob.duration
    ) {
      return true;
    }
    return false;
  }
  getData()
  {
    let data=[];
    data.name =this.name;
    data.nID=this.nID;
    data.v1=-this.amp;
    data.v2=this.ramp1;
    data.v3=this.flat;
    data.v4=this.ramp2;
    data.v5=this.start;
    
    return data;
  }
  getEq()
  {
     let data=[];
    data.name =this.name;
    data.nID=this.nID;
    data.Eq1=this.Eq_amp;
    data.Eq2=this.Eq_ramp1;
    data.Eq3=this.Eq_flat;
    data.Eq4=this.Eq_ramp2;
    data.Eq5=this.Eq_start;
    
    return data;
  }
  setEq(data)
  {
     
    this.Eq_amp=data.Eq1;
    this.Eq_ramp1=data.Eq2;
    this.Eq_flat=data.Eq3;
    this.Eq_ramp2=data.Eq4;
    this.Eq_start=data.Eq5;

  }
  setData(data)
  {
    //print(data.v1)
    this.name= data.name;
    this.amp=-Number(data.v1);
    this.ramp1=Number(data.v2);
    this.flat=Number(data.v3);
    this.ramp2=Number(data.v4);
    this.start=Number(data.v5);
    this.duration=this.ramp1+this.flat+this.ramp2;
    this.update();
  }
  update()
  {
     this.duration = this.ramp1 + this.flat + this.ramp2;
     this.end = this.start + this.duration;
     this.nPoint=this.py.length;
     this.px=[];
      for (let pt = 0; pt < this.nPoint; pt++)
      {
        this.px[pt]=this.duration*pt/this.nPoint;  
      }
      
  }
  //let start,posY;
}

class RF extends Gradient {
  constructor(x, y, axis, amp) {
    super(x, y, axis, amp);
    this.type=2;
    this.ramp1 = 0;
    this.flat = 200;
    this.ramp2 = 0;
    this.px = [];
    this.py = [];
    this.dT = 1;
    this.nPoint = this.duration / this.dT;
    this.name="RF_"+String(this.nID);
    this.freq=0;
    this.phase=0;
    this.update();
    // this.col=[random(0,255),random(0,255),random(0,255)];
  }
  show(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    if (this.isSelected) 
    {
      fill(255, 204, 0);
    } 
    else 
    {
      if(!this.isCompiled & this.isValid)
      {
         fill(this.col);
      }
      else if(this.isCompiled & !this.isValid) 
      {
        fill(255, 0, 0);
      }
      else
      {
        fill(0, 255, 0);
      }
    }
   if (this.isDoubleSelected) {
      stroke(255, 0, 0);
      strokeWeight(4);
    } else {
      stroke(0);
      strokeWeight(2);
    }
    beginShape();
    for (let pt = 0; pt < this.nPoint; pt++) {
      curveVertex(this.start + this.px[pt] + dx, this.posY + this.py[pt] + dy);
    }

    endShape();
  }
  isClick(moX, moY) {
    if (moX >= this.start + this.dx && moX <= this.start + this.l + this.dx) {
      if (moY >= this.posY + this.dy && moY <= this.posY + this.h + this.dy) {
        return true;
      }
      if (moY >= this.posY + this.h + this.dy && moY <= this.posY + this.dy) {
        return true;
      }
    }
    return false;
  }
  update()
  {
     let tmpx = 0;
      this.nPoint = this.duration / this.dT;
      for (let pt = 0; pt < this.nPoint; pt++) {
      tmpx = pt * this.dT;
      this.px[pt] = tmpx;
      tmpx = pt * this.dT - this.duration / 2;
      if (tmpx == 0) {
        this.py[pt] = this.amp;
      } else {
        this.py[pt] = (this.amp * sin(tmpx / 8)) / (tmpx / 8);
      }
    }
  }
}

class ADC extends Gradient {
  constructor(x, y, axis, amp) {
    super(x, y, axis, amp);
    this.type=3;
    this.ramp1 = 0;
    this.flat = 200;
    this.ramp2 = 0;
    this.name="ADC_"+String(this.nID);
 
    this.num=64;
    this.dwell=100000;
    this.freq=0;
    this.phase=0;
    // this.col=[random(0,255),random(0,255),random(0,255)];
  }
}