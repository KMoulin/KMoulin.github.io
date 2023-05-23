/// Gradient ///
class Gradient extends GUIObject {
  constructor(x, y, axis, amp) {
    super(x, y, amp, 200);

    this.posY = y+axis*100;
    this.posX = x;

    this.amp = amp;
    this.ramp1 = 50;
    this.flat = 100;
    this.ramp2 = 50;
    this.axis = axis;
    this.duration = this.ramp1 + this.flat + this.ramp2;
    this.shiftX = 0;
    this.shiftY = 0;
    this.col = [255, 255, 255];
    this.nID=newID();
    this.name="Grad";
    if(this.axis==2)
    {
          this.name="Gx";
    }
    else if(this.axis==3)
    {
          this.name="Gy";
    }
    else if(this.axis==4)
    {
          this.name="Gz";
    }
    
  }
  show(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    if (this.isDoubleSelected) {
      stroke(255, 0, 0);
      strokeWeight(4);
    } else {
      stroke(0);
      strokeWeight(2);
    }
    quad(
      this.posX + this.dx,
      this.posY + this.dy, // begining of the ramp
      this.posX + this.ramp1 + this.dx,
      this.posY + this.amp + this.dy, // end of the ramp, begining of the flat
      this.posX + this.flat + this.ramp1 + this.dx,
      this.posY + this.amp + this.dy,
      this.posX + this.ramp1 + this.flat + this.ramp2 + this.dx,
      this.posY + this.dy
    );
  }
 
  isClick(moX, moY) {
    if (moX >= this.posX + this.dx && moX <= this.posX + this.l + this.dx) {
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
    if (this.isSelected) {
      this.posX += dx;
      if (this.posX < 0) {
        this.posX = 0;
      }
      if (this.posX > 1000) {
        this.posX = 1000;
      }
    }
  }
  intersect(ob, dx, dy) {
    if(this.axis!=ob.axis) return false;
    if (this.posX + dx > ob.posX && this.posX + dx < ob.posX + ob.duration) {
      return true;
    }
    if (
      this.posX + this.duration + dx > ob.posX &&
      this.posX + this.duration + dx < ob.posX + ob.duration
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
    data.v5=this.posX;
    
    return data;
  }
  setData(data)
  {
    //print(data.v1)
    this.name= data.name;
    this.amp=-Number(data.v1);
    this.ramp1=Number(data.v2);
    this.flat=Number(data.v3);
    this.ramp2=Number(data.v4);
    this.posX=Number(data.v5);
    this.duration=this.ramp1+this.flat+this.ramp2;
    this.update();
  }
  update()
  {
    
  }
  //let posX,posY;
}

class RF extends Gradient {
  constructor(x, y, axis, amp) {
    super(x, y, axis, amp);

    this.ramp1 = 0;
    this.flat = 200;
    this.ramp2 = 0;
    this.px = [];
    this.py = [];
    this.dT = 1;
    this.nPoint = this.duration / this.dT;
    this.name="RF";
   
    
    this.update();
    // this.col=[random(0,255),random(0,255),random(0,255)];
  }
  show(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
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
      curveVertex(this.posX + this.px[pt] + dx, this.posY + this.py[pt] + dy);
    }

    endShape();
  }
  isClick(moX, moY) {
    if (moX >= this.posX + this.dx && moX <= this.posX + this.l + this.dx) {
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

    this.ramp1 = 0;
    this.flat = 200;
    this.ramp2 = 0;
    this.name="ADC";
    // this.col=[random(0,255),random(0,255),random(0,255)];
  }
}