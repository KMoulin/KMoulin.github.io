class TableUI {
  constructor(x, y) 
  {
    this.posX=x
    this.posY=y
    this.raw=[];
    this.keys=[];
    this.spacingX=20;
    this.spacingY=30;
    this.dy=0;
  }
  show(dx,dy,name)
  {
    return 0;
  }
  UpdateTable(Obj)
  {
    let tmpData=Obj.getData();
    if(tmpData.length >0)
    {
      for (let k=0;k<tmpData.length;k++)
      {
        for (let p=0;p<this.raw.length;p++)
        {
          if (this.raw[p].nID==tmpData[k].nID)
          {
                this.raw[p].updateData(tmpData[k]);
          }
        }
      }
    }
    else
    {
      for (let p=0;p<this.raw.length;p++)
        {
          if (this.raw[p].nID==tmpData.nID)
          {
                this.raw[p].updateData(tmpData);
          }
        }
    }
  }
  updateObj(Obj)
  {
        for (let p=0;p<this.raw.length;p++)
        {
          if(this.raw[p].isPopulated==2)
          {
            Obj.setData(this.raw[p].getData());
          }
        }    
  }
  AddObject(Obj)
  {
        
    let shift=0;
    let tmpRaw=new TabRaw(0,this.posY+this.dy);
    
    shift=tmpRaw.addLabel(Obj.getLabel());
    this.dy+=this.spacingY*shift;
    this.raw.push(tmpRaw);
    this.keys.push([this.raw.length-1,tmpRaw.ID]);
    let tmpRaw2=[];
   
    
    let tmpData=Obj.getData();
    
    if(tmpData.length >0)
    {
      for (let k=0;k<tmpData.length;k++)
      {
        tmpRaw2=new TabRaw(0,this.posY+this.dy);
        
        shift= tmpRaw2.addData(tmpData[k]);
        this.raw.push(tmpRaw2);
        this.keys.push([this.raw.length-1,tmpRaw2.ID]);
        this.dy+=this.spacingY*shift;
      }
    }
    else
    {
       tmpRaw2=new TabRaw(0,this.posY+this.dy); 
     
      shift=tmpRaw2.addData(Obj.getData());
      this.raw.push(tmpRaw2);
      this.keys.push([this.raw.length-1,tmpRaw2.ID]);
      this.dy+=this.spacingY*shift;
    }
    // let tmpData=Obj.getData();
   // 
    //{
    //}
   // print(this.keys);
  }
  destruct()
  {
    this.dy=0;
    for (let k=this.raw.length-1;k>=0;k--)
    { 
      this.raw[k].destruct();
      this.raw.pop();
    } 
    for (let k=this.keys.length-1;k>=0;k--)
    {
      this.keys.pop();
    }
  }
}

class TabRaw
{
  constructor(x, y) 
  {
    this.nID=0;
    this.posX=x
    this.posY=y
    this.divT0 = [];
    this.divT1 = [];
    this.divT2 = [];
    this.divT3 = [];
    this.divT4 = [];
    this.divT5 =[];
    this.inp0 = [];
    this.inp1 = [];
    this.inp3 = [];
    this.inp4 = [];
    this.inp5 = [];
    this.isPopulated=0;
  }
  addLabel(dat)
  {
      this.nID=0;
      this.divTL = createDiv(dat.type_name);
      this.divTL.position(this.posX+20, this.posY);
      this.divT0 = createDiv('Name');
      this.divT0.position(this.posX+20, this.posY+20);
      this.divT1 = createDiv(dat.l1);
      this.divT1.position(this.posX+60, this.posY+20);
      this.divT2 = createDiv(dat.l2);
      this.divT2.position(this.posX+100, this.posY+20);
      this.divT3 = createDiv(dat.l3);
      this.divT3.position(this.posX+140, this.posY+20);
      this.divT4 = createDiv(dat.l4);
      this.divT4.position(this.posX+190, this.posY+20);
      this.divT5 = createDiv(dat.l5);
      this.divT5.position(this.posX+250, this.posY+20);
    
      this.isPopulated=1;
      return 2;
  }
  updateData(dat)
  {
    this.inp0.value(String(dat.name));
    this.inp1.value(String(dat.v1));
    this.inp2.value(String(dat.v2));
    this.inp3.value(String(dat.v3));
    this.inp4.value(String(dat.v4));
    this.inp5.value(String(dat.v5));
  }
  getData()
  {
    let dat=[];
    dat.nID=this.nID;
    dat.name=(this.inp0.value());
    dat.v1=(this.inp1.value());
    dat.v2=(this.inp2.value());
    dat.v3=(this.inp3.value());
    dat.v4=(this.inp4.value());
    dat.v5=(this.inp5.value());
    //print(this.inp1.value());
   //  print(dat);
    return dat;
  }
  addData(dat)
  {
      this.nID=dat.nID;
      this.inp0 = createInput(String(dat.name));
      this.inp0.position(this.posX+20, this.posY);
      this.inp0.size(30);
      this.inp0.color=this.c;
      this.inp0.input(myInputEvent);
      
      this.inp1 = createInput(String(dat.v1));
      this.inp1.position(this.posX+60, this.posY);
      this.inp1.size(30);
      this.inp1.color=this.c;
      this.inp1.input(myInputEvent);
      
      this.inp2 = createInput(String(dat.v2));
      this.inp2.position(this.posX+100, this.posY);
      this.inp2.size(30);
      this.inp2.color=this.c;
      this.inp2.input(myInputEvent);
      
      this.inp3 = createInput(String(dat.v3));
      this.inp3.position(this.posX+140, this.posY);
      this.inp3.size(40);
      this.inp3.color=this.c;
      this.inp3.input(myInputEvent);
      
      this.inp4 = createInput(String(dat.v4));
      this.inp4.position(this.posX+190, this.posY);
      this.inp4.size(30);
      this.inp4.color=this.c;
      this.inp4.input(myInputEvent);
    
      this.inp5 = createInput(String(dat.v5));
      this.inp5.position(this.posX+250, this.posY);
      this.inp5.size(30);
      this.inp5.color=this.c;
      this.inp5.input(myInputEvent);
    
    this.isPopulated=2;
    return 1;
  }
  destruct()
  {
    
    if (this.isPopulated==1)
    {
      this.divTL.remove();
      this.divT0.remove();
      this.divT1.remove();
      this.divT2.remove();
      this.divT3.remove();
      this.divT4.remove();
      this.divT5.remove();
    }
    if (this.isPopulated==2)
     { 
      this.inp0.remove();
      this.inp1.remove();
      this.inp2.remove();
      this.inp3.remove();
      this.inp4.remove();
      this.inp5.remove();
    }
    this.isPopulated=0;
  }
  
}