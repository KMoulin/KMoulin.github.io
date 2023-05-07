/// UI Object ///
class GUIObject {
  constructor(x, y, dx, dy) {
    this.posX = x;
    this.posY = y;
    this.h = dx;
    this.l = dy;
    this.isSelected = false;
    this.childSelected = false;
    this.isDoubleSelected = false;
    this.isLooper = false;
    this.col = [random(0, 255), random(0, 255), random(0, 255)];
    this.dx = 0;
    this.dy = 0;
    this.table= new TableUI();
    this.nID=random(0,10000);
  }
  shapeShow() {
    rect(this.posX + this.dx, this.posY, this.l, this.h);
  }
  show(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    if (!this.isSelected) {
      this.posY = this.dy;
    }
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

    this.shapeShow();

    return this.h;
  }
  showGap(dx, dy) {
    return 0;
  }
  showTable(dx,dy)
  {
    return 0;
  }

  
  isClick(moX, moY) {
    if (moX >= this.posX + this.dx && moX <= this.posX + this.dx + this.l) {
      if (moY >= this.posY && moY <= this.posY + this.h) {
        return true;
      }
    }
    return false;
  }

  isDoubleClick(moX, moY)
  {
    return this.isClick(moX, moY);
  }
  createTable()
  {
    
  }
  select_() {
    this.isSelected = true;
  }
  doubleSelect_() {
    this.isDoubleSelected = true;
  }
  doubleUnselect()
  {
    this.isDoubleSelected=false;
  }
  unselect() {
    this.isSelected = false;
  }
  dragged(dx, dy) {
    this.posY += dy;
  }
  intersect(ob) {
    if (
      this.posX < ob.posX + ob.duration &&
      this.posX + this.duration > ob.posX + ob.duration
    ) {
      return true;
    }
    if (this.posX < ob.posX && this.posX + this.duration > ob.posX) {
      return true;
    }
    return false;
  }
  destruct()
  {}
  updateID(k)
  {
    this.nID=k;
  }
  eventID(k,n)
  {
  }
}

class Probe extends GUIObject {
  constructor(x, y) {
    super(x, y, 80, 100);
    this.r = (3 * this.l) / 6;
    this.isLooper = false;
    this.col = color(random(0, 255), random(0, 255), random(0, 255));
  }
  shapeShow() {
    rect(
      this.posX + this.dx,
      this.posY + this.h / 4,
      this.l,
      (3 * this.h) / 4,
      5
    );
    rect(
      this.posX + this.dx + (2 * this.l) / 6,
      this.posY,
      (2 * this.l) / 6,
      this.h,
      5
    );
    rect(
      this.posX + this.dx,
      this.posY + this.h / 4,
      this.l,
      (3 * this.h) / 4,
      5
    );
    fill(256, 256, 256, 256);
    circle(
      this.posX + this.dx + this.l / 2,
      this.posY + (3 * this.h) / 5,
      this.r
    );
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    circle(
      this.posX + this.dx + this.l / 2,
      this.posY + (3 * this.h) / 5,
      this.r / 2
    );

    fill(255, 0, 0);
    circle(
      this.posX + this.dx + this.l / 2 + this.r / 2,
      this.posY + (3 * this.h) / 5 - this.r / 2 + 5,
      this.r / 10
    );
  }

  showGap(dx, dy) {
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
    line(
      this.posX + this.dx + 5,
      this.posY + 5 + this.h,
      this.posX + this.dx + 5,
      dy - 5
    );

    rect(this.posX + this.dx, dy + this.h / 4, this.l, (3 * this.h) / 4, 5);
    rect(
      this.posX + this.dx + (2 * this.l) / 6,
      dy,
      (2 * this.l) / 6,
      this.h,
      5
    );
    rect(this.posX + this.dx, dy + this.h / 4, this.l, (3 * this.h) / 4, 5);
    fill(256, 256, 256, 256);
    circle(this.posX + this.dx + this.l / 2, dy + (3 * this.h) / 5, this.r);
    if (this.isSelected) {
      fill(255, 204, 0);
    } else {
      fill(this.col);
    }
    circle(this.posX + this.dx + this.l / 2, dy + (3 * this.h) / 5, this.r / 2);

    fill(255, 0, 0);
    circle(
      this.posX + this.dx + this.l / 2 + this.r / 2,
      dy + (3 * this.h) / 5 - this.r / 2 + 5,
      this.r / 10
    );
    return this.h;
  }
}

/// LOOPER CLASS ///
class Looper extends GUIObject {
  constructor(x, y) {
    super(x, y, 40, 200);
    this.isLooper = true;
  }

  showGap(dx, dy) {
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
    line(
      this.posX + this.dx + 5,
      this.posY + 5 + this.h,
      this.posX + this.dx + 5,
      dy - 5
    );
    rect(this.posX + this.dx, dy, this.l, this.h);
    return this.h;
  }
}

/// Module ///
class Module extends GUIObject {
  constructor(x, y,nId) {
    super(x, y, 500, 800);
    this.Rf = [];
    this.Gx = [];
    this.Gy = [];
    this.Gz = [];
    this.Eval = [];
    this.axis = [];
    this.spacingX = 20;
    this.spacingY = 100;
    this.col = [256, 256, 256];
    this.axisL=720;
    
    
    // print(this.posX);
    let tmp = new Gradient(0, 0, 1, random(-50, 50));
    this.Gx.push(tmp);
    tmp = new Gradient(0, 0, 2, random(-50, 50));
    this.Gy.push(tmp);
    tmp = new Gradient(0, 0, 3, random(-50, 50));
    this.Gz.push(tmp);
    tmp = new RF(0, 0, 0, -50);
    this.Rf.push(tmp);
    tmp = new ADC(300, 0, 0, -50);
    this.Rf.push(tmp);
    
    this.buttonGx = createButton('+');
    this.buttonGx.position(this.posX+this.axisL,             this.posY+this.spacingY);
    this.buttonGx.id(this.nID+"_"+1);
    this.buttonGx.mousePressed(plusObject);
    
    this.buttonGy = createButton('+');
    this.buttonGy.position(this.posX+this.axisL,             this.posY+this.spacingY);
    this.buttonGy.id(this.nID+"_"+2);
    this.buttonGy.mousePressed(plusObject);
    
    this.buttonGz = createButton('+');
    this.buttonGz.position(this.posX+this.axisL,             this.posY+this.spacingY);
    this.buttonGz.id(this.nID+"_"+3);
    this.buttonGz.mousePressed(plusObject);
    
    this.buttonRf = createButton('+');
    this.buttonRf.position(this.posX+this.axisL,             this.posY+this.spacingY);
    this.buttonRf.id(this.nID+"_"+4);
    this.buttonRf.mousePressed(plusObject);
    
    this.buttonADC = createButton('+');
    this.buttonADC.position(this.posX+this.axisL,             this.posY+this.spacingY);
    this.buttonADC.id(this.nID+"_"+5);
    this.buttonADC.mousePressed(plusObject);
  }
  updateID(k)
  {
    super.updateID(k);
    this.buttonGx.id(this.nID+"_"+1);
    this.buttonGy.id(this.nID+"_"+2);
    this.buttonGz.id(this.nID+"_"+3);
    this.buttonRf.id(this.nID+"_"+4);
    this.buttonADC.id(this.nID+"_"+5);
    
  }
  eventID(n)
  {
    if (n==1)
    {
        this.addGx();
    }
    else if (n==2)
    {
        this.addGy();
    }
    else if (n==3)
    {
        this.addGz();
    }
    else if (n==4)
    {
        this.addRf();
    }
    else if (n==5)
    {
        this.addADC();
    }
    
  }
  addGx()
  {

    
   let lx=this.Gx[this.Gx.length-1].posX+this.Gx[this.Gx.length-1].duration;
    let tmp = new Gradient(lx+20, 0, 1, random(-50, 50));
    this.Gx.push(tmp);
    
  }

  addGy()
  {
    let lx=this.Gy[this.Gy.length-1].posX+this.Gy[this.Gy.length-1].duration;
    let tmp = new Gradient(lx+20, 0, 2, random(-50, 50));
    this.Gy.push(tmp);
  }
  addGz()
  {
    let lx=this.Gz[this.Gz.length-1].posX+this.Gz[this.Gz.length-1].duration;
    let tmp = new Gradient(lx+20, 0, 1, random(-50, 50));
    this.Gz.push(tmp);
  }
  addRf()
  {
    let lx=this.Rf[this.Rf.length-1].posX+this.Rf[this.Rf.length-1].duration;
    let tmp = new RF(lx+20, 0, 0, -50);
    this.Rf.push(tmp);
  }
  addADC()
  {
    let lx=this.Rf[this.Rf.length-1].posX+this.Rf[this.Rf.length-1].duration;
    let tmp = new ADC(lx+20, 0, 0, -50);
    this.Rf.push(tmp);
  }
  show(dx, dy) 
  {
    let h = super.show(dx, dy);
    for (let p = 0; p < this.Gx.length; p++) {
      this.Gx[p].show(
        this.posX + this.spacingX + dx,
        this.posY + this.spacingY * 2
      );
    }
    for (let p = 0; p < this.Gy.length; p++) {
      this.Gy[p].show(
        this.posX + this.spacingX + dx,
        this.posY + this.spacingY * 3
      );
    }
    for (let p = 0; p < this.Gz.length; p++) {
      this.Gz[p].show(
        this.posX + this.spacingX + dx,
        this.posY + this.spacingY * 4
      );
    }
    for (let p = 0; p < this.Rf.length; p++) {
      this.Rf[p].show(
        this.posX + this.spacingX + dx,
        this.posY + this.spacingY * 1
      );
    }
    for (let p = 1; p < 5; p++) {
      stroke(0);
      strokeWeight(2);
      line(
        this.posX + this.dx + this.spacingX,
        this.posY + this.spacingY * p,
        this.posX + this.axisL + this.dx,
        this.posY + this.spacingY * p
      );
    }
     this.buttonRf.position(this.posX+this.axisL+this.dx, this.posY+this.spacingY*1-10);
    
    this.buttonADC.position(this.posX+this.axisL+this.dx+20, this.posY+this.spacingY*1-10);
    
    this.buttonGx.position(this.posX+this.axisL+this.dx, this.posY+this.spacingY*2-10);
    
    this.buttonGy.position(this.posX+this.axisL+this.dx, this.posY+this.spacingY*3-10);
    
    this.buttonGz.position(this.posX+this.axisL+this.dx, this.posY+this.spacingY*4-10);
    return h;
  }
  showTable(dx,dy)
  {
    if(this.isSelected)
    {
      
    }
  }
  destruct()
  {
    
  }
  isDoubleClick(moX, moY)
  {
    if (this.isDoubleSelected) 
    {
      for (let p = 0; p < this.Gx.length; p++) {
        if (this.Gx[p].isClick(moX, moY)) {
          this.Gx[p].isDoubleSelected = true;
          this.childSelected = true;
        }
      }
      for (let p = 0; p < this.Gy.length; p++) {
        if (this.Gy[p].isClick(moX, moY)) {
          this.Gy[p].isDoubleSelected = true;
          this.childSelected = true;
        }
      }
      for (let p = 0; p < this.Gz.length; p++) {
        if (this.Gz[p].isClick(moX, moY)) {
          this.Gz[p].isDoubleSelected = true;
          this.childSelected = true;
        }
      }
      for (let p = 0; p < this.Rf.length; p++) {
        if (this.Rf[p].isClick(moX, moY)) {
          this.Rf[p].isDoubleSelected = true;
          this.childSelected = true;
        }
      }
    }
    
    if (!this.childSelected) 
    {
      /*if (super.isClick(moX, moY));
      {
        this.table= new TableUI(0,0,0,0,0,0);
        return true;
      }*/
      return super.isDoubleClick(moX, moY); 
    } 
    
    return true;
  }
  isClick(moX, moY) {
    if (this.isDoubleSelected&&!this.isSelected) 
    {
      for (let p = 0; p < this.Gx.length; p++) {
        if (this.Gx[p].isClick(moX, moY)) {
          this.Gx[p].isSelected = true;
          this.childSelected = true;
        }
      }
      for (let p = 0; p < this.Gy.length; p++) {
        if (this.Gy[p].isClick(moX, moY)) {
          this.Gy[p].isSelected = true;
          this.childSelected = true;
        }
      }
      for (let p = 0; p < this.Gz.length; p++) {
        if (this.Gz[p].isClick(moX, moY)) {
          this.Gz[p].isSelected = true;
          this.childSelected = true;
        }
      }
      for (let p = 0; p < this.Rf.length; p++) {
        if (this.Rf[p].isClick(moX, moY)) {
          this.Rf[p].isSelected = true;
          this.childSelected = true;
        }
      }
    }
    if (!this.childSelected) 
    {
      /*if (super.isClick(moX, moY));
      {
        this.table= new TableUI(0,0,0,0,0,0);
        return true;
      }*/
      return super.isClick(moX, moY);
      
    } 
    return false;
  
  }
  
  doubleSelect_()
  {
     super.doubleSelect_();
     this.table.populate(0,0,0,0);
  }
  doubleUnselect()
  {
    super.doubleUnselect();
    this.table.destruct();
    
    this.isDoubleSelected = false;
    this.childSelected = false;
    for (let p = 0; p < this.Gx.length; p++) {
     
      this.Gx[p].doubleUnselect();
    }
    for (let p = 0; p < this.Gy.length; p++) {
     
      this.Gy[p].doubleUnselect();
    }
    for (let p = 0; p < this.Gz.length; p++) {
     
      this.Gz[p].doubleUnselect();
    }
    for (let p = 0; p < this.Rf.length; p++) {
     
      this.Rf[p].doubleUnselect();
    }
  }
  unselect() {
 
    
    this.isSelected = false;
    this.childSelected = false;
    for (let p = 0; p < this.Gx.length; p++) {
      this.Gx[p].unselect();
      this.Gx[p].doubleUnselect();
    }
    for (let p = 0; p < this.Gy.length; p++) {
      this.Gy[p].unselect();
      this.Gy[p].doubleUnselect();
    }
    for (let p = 0; p < this.Gz.length; p++) {
      this.Gz[p].unselect();
      this.Gz[p].doubleUnselect();
    }
    for (let p = 0; p < this.Rf.length; p++) {
      this.Rf[p].unselect();
      this.Rf[p].doubleUnselect();
    }
    
  }
  dragged(dx, dy) {
    if (this.isSelected) {
      this.posY += dy;
    }
    if (this.isDoubleSelected) {
      let intersect = false;
      let ob;
      let other;
      for (ob of this.Gx) 
      {
        intersect = false;
        for (other of this.Gx) 
        {
          if (ob != other) 
          {
            intersect = ob.intersect(other, dx, dy);
            if(intersect)
            {
                break;
            }
          }
        }
        if (!intersect) {
          ob.dragged(dx, dy);
        }
      }
      for (ob of this.Gy) 
      {
        intersect = false;
        for (other of this.Gy) 
        {
          if (ob != other) 
          {
            intersect = ob.intersect(other, dx, dy);
            if(intersect)
            {
                break;
            }
          }
        }
        if (!intersect) {
          ob.dragged(dx, dy);
        }
      }
      for (ob of this.Gz) 
      {
        intersect = false;
        for (other of this.Gz) 
        {
          if (ob != other) 
          {
            intersect = ob.intersect(other, dx, dy);
            if(intersect)
            {
                break;
            }
          }
        }
        if (!intersect) {
          ob.dragged(dx, dy);
        }
      }

      for (ob of this.Rf) 
      {
        intersect = false;
        for (other of this.Rf) 
        {
          if (ob != other) 
          {
            intersect = ob.intersect(other, dx, dy);
            if(intersect)
            {
                break;
            }
          }
        }
        if (!intersect) {
          ob.dragged(dx, dy);
        }
      }
    }
  }
}





