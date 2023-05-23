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
    this.type=0;
    this.col = [random(0, 255), random(0, 255), random(0, 255)];
    this.dx = 0;
    this.dy = 0;
    this.nID=0;
    this.name="name";
    this.nameTag = createDiv(this.name);
    this.nameTag.style('font-size', '16px');
    this.nameTag.position(this.posX+20,this.posY+10);
    this.nameTag.hide();
  }
  shapeShow() {
    rect(this.posX + this.dx, this.posY, this.l, this.h);
  }
  getLabel()
  {
    let dat=[];
    dat.type_name='Test';
    dat.l1='Amp';
    dat.l2='Rup';
    dat.l3='Rdw';
    dat.l4='Flat';
    dat.l5='Start time';
    return dat;
  }
  getData()
  {
    let dat=[];
    dat.name=this.name;
    dat.v1=12;
    dat.v2=45;
    dat.v3=12;
    dat.v4=33;
    dat.v5=5;
    return dat;
  }
  setData(dat)
  {
    
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
    this.nameTag.position(this.posX+dx+20, this.posY+10);
    return this.h;
  }
  showGap(dx, dy) {
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
  {
    this.nameTag.remove();
    return true; // We delete the object
  }
  update()
  {
    this.nameTag.html(String(this.name+"_"+String(this.nID)));
  }
  updateID(k)
  {
    this.nID=k;
    this.update();
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
    this.name="Probe";
    this.type=3;
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

   getLabel()
  {
    let dat=[];
    dat.type_name=String(this.name+'_'+this.nID);
    dat.l1='';
    dat.l2='';
    dat.l3='Shot';
    dat.l4='';
    dat.l5='';
    return dat;
  }
  getData()
  {
    let dat=[];
    dat.name=String(this.name);
    dat.v1=1;
    dat.v2=2;
    dat.v3=3;
    dat.v4=4;
    dat.v5=5;
    return dat;
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
    this.name="Loop";
    this.type=2;
    this.nameTag.html(String(this.name+" "+String(this.nID)));
    this.nameTag.show();
    this.st=0;
    this.inc=1;
    this.end=128;
    this.cur=12;
  }

  getLabel()
  {
    let dat=[];
    dat.type_name=String(this.name+'_'+this.nID);
    dat.l1='Start';
    dat.l2='Stop';
    dat.l3='Incr';
    dat.l4='';
    dat.l5='';
    return dat;
  }
  getData()
  {
    let dat=[];
    dat.name=String(this.name);
    dat.v1=this.st;
    dat.v2=this.inc;
    dat.v3=this.end;
    dat.v4="";
    dat.v5=this.cur;
    return dat;
  }
   setData(data)
  {
    this.name= data.name;
    this.st=Number(data.v1);
    this.inc=Number(data.v2);
    this.end=Number(data.v3);
    this.cur=Number(data.v5);
    this.update();
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
  update()
  {
    super.update();
    this.nameTag.html(String(this.name+"_"+this.nID+"    [ "+this.st+" : "+this.inc+" : "+ this.end +" ] "));
  }
}

/// Module ///
class Module extends GUIObject {
  constructor(x, y) {
    super(x, y, 500, 800);
    this.SeqObj =[];
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
    this.name="Module";
    this.type=1;
    this.nameTag.html(String(this.name+" "+String(this.nID)));
    this.nameTag.show();
    // print(this.posX);
    let tmp = new Gradient(0, 0, 2, random(-50, 50));
    this.SeqObj.push(tmp);
    tmp = new Gradient(0, 0, 3, random(-50, 50));
    this.SeqObj.push(tmp);
    tmp = new Gradient(0, 0, 4, random(-50, 50));
    this.SeqObj.push(tmp);
    tmp = new RF(0, 0, 1, -50);
    this.SeqObj.push(tmp);
    tmp = new ADC(300, 0, 1, -50);
    this.SeqObj.push(tmp);
    
    
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
  getLabel()
  {
    let dat=[];
    dat.type_name=String(this.name+'_'+this.nID);
    dat.l1='Amp';
    dat.l2='Rup';
    dat.l3='Flat';
    dat.l4='Rdw';
    dat.l5='Start Time';
    return dat;
  }
  getData()
  {
       
    let dat =[];
    let tmp = [];
    for (let p = 0; p < this.SeqObj.length; p++) {
      tmp=this.SeqObj[p].getData();
      dat.push(tmp);
    }
4
    return dat;
  }
  setData(dat)
  {
    //print('Hello'+String(dat.nID));
     for (let p = 0; p < this.SeqObj.length; p++)
     {
       if(dat.nID==this.SeqObj[p].nID)
       {
         this.SeqObj[p].setData(dat);    
       }    
    }

    this.update();
  }
  update()
  {
    super.update();
    let lMax=800;
    for (let p = 0; p < this.SeqObj.length; p++)
    {
         lMax=max(lMax,this.SeqObj[p].posX+this.SeqObj[p].duration);       
    }
  
    this.axisL=lMax;
    this.l=lMax+80;
    
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
        this.addObj(n);
    }
    else if (n==2)
    {
        this.addObj(n);
    }
    else if (n==3)
    {
        this.addObj(n);
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
  addObj(k)
  {

    
    let lx=0;
    if(Object.keys(this.SeqObj).length != 0)
    {
     lx=this.SeqObj[this.SeqObj.length-1].posX+this.SeqObj[this.SeqObj.length-1].duration;
    }
    let tmp = new Gradient(lx+20, 0, k+1, random(-50, 50));
    this.SeqObj.push(tmp);
    this.update();
    
  }


  addRf()
  {
    let lx=0;
    if(Object.keys(this.SeqObj).length != 0)
    {
     lx=this.SeqObj[this.SeqObj.length-1].posX+this.SeqObj[this.SeqObj.length-1].duration+20;
    } 
    let tmp = new RF(lx, 0, 1, -50);
    this.SeqObj.push(tmp);
     this.update();
  }
  addADC()
  {
    let lx=0;
    if(Object.keys(this.SeqObj).length != 0)
    {
     lx=this.SeqObj[this.SeqObj.length-1].posX+this.SeqObj[this.SeqObj.length-1].duration+20;
    } 
    let tmp = new ADC(lx, 0, 1, -50);
    this.SeqObj.push(tmp);
     this.update();
  }
  show(dx, dy) 
  {
    let h = super.show(dx, dy);
    for (let p = 0; p < this.SeqObj.length; p++) {
      this.SeqObj[p].show(
        this.posX + this.spacingX + dx,
        this.posY 
      ); //+ this.spacingY * 2
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
     if (!this.childSelected) 
    {
      this.nameTag.remove();
      this.buttonGx.remove();
      this.buttonGy.remove();
      this.buttonGz.remove();
      this.buttonRf.remove();
      this.buttonADC.remove();
      
      return true;
    }
    else
    {
      for (let p = this.SeqObj.length-1; p >= 0; p--) {
        if (this.SeqObj[p].isDoubleSelected) 
        {
          this.SeqObj.splice(p,1);
        }
      }

    }
    return false;
  }
  isDoubleClick(moX, moY)
  {
    if (this.isDoubleSelected) 
    {
      for (let p = 0; p < this.SeqObj.length; p++) {
        if (this.SeqObj[p].isClick(moX, moY)) {
          this.SeqObj[p].isDoubleSelected = true;
          this.childSelected = true;
        }
      }
    
    }
    
    if (!this.childSelected) 
    {
  
      return super.isDoubleClick(moX, moY); 
    } 
    
    return true;
  }
  isClick(moX, moY) {
    if (this.isDoubleSelected&&!this.isSelected) 
    {
      for (let p = 0; p < this.SeqObj.length; p++) {
        if (this.SeqObj[p].isClick(moX, moY)) {
          this.SeqObj[p].isSelected = true;
          this.childSelected = true;
        }
      }
 
    }
    if (!this.childSelected) 
    {
     
      return super.isClick(moX, moY);
      
    } 
    return false;
  
  }
  
  doubleSelect_()
  {
     super.doubleSelect_();

  }
  doubleUnselect()
  {
    super.doubleUnselect();
    
    this.isDoubleSelected = false;
    this.childSelected = false;
    for (let p = 0; p < this.SeqObj.length; p++) {
     
      this.SeqObj[p].doubleUnselect();
    }
    
  }
  unselect() {
 
    
    this.isSelected = false;
    this.childSelected = false;
    for (let p = 0; p < this.SeqObj.length; p++) {
      this.SeqObj[p].unselect();
      this.SeqObj[p].doubleUnselect();
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
      for (ob of this.SeqObj) 
      {
        intersect = false;
        for (other of this.SeqObj) 
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
     
     this.update();
  }
}





