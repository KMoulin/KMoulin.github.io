class layoutManager
  {
    constructor(x,y)
    {
      this.Object=[];
      this.Order=0;
      this.posX=x;
      this.posY=y; 
      this.spacingX=20;
      this.spacingY=10;
      this.indexDclick=[];
    }
    addLoop()
    {
      let l=new Looper(this.posX,this.posY,580);
      this.Object.push(l);
    }
    addModule()
    {
      let m=new Module(this.posX,this.posY);
      this.Object.push(m);
    }
    addProbe()
    {
      let m=new Probe(this.posX,this.posY);
      this.Object.push(m);
    }
    
    show()
    {
      let Gap=0;
      for(let k=0;k<this.Object.length;k++)
      {
        Gap+=this.Object[k].show(k*this.spacingX,Gap)+this.spacingY;
      }
      
      for(let k=this.Object.length-1;k>=0;k--)
      {
         Gap+=this.Object[k].showGap(k*this.spacingX,Gap)+this.spacingY; 
        // print(Gap)
      }
    }
    unselect()
    {
      for(let k=0;k<this.Object.length;k++)
      {
        this.Object[k].unselect();    
      }
    }
    isClick(moX,moY)
    {
      for(let k=0;k<this.Object.length;k++)
      {
        if(!this.Object[k].childSelected)
        {
            this.Object[k].isSelected=this.Object[k].isClick(moX,moY);
        }
        
      }
    }
    isDoubleClick(moX,moY)
    {
      this.indexDclick=[];
      for(let k=0;k<this.Object.length;k++)
      {      
          if(this.Object[k].isClick(moX,moY))
          {
              this.Object[k].isLocked=true; 
              this.indexDclick=k;
          }
          else
          {
            this.Object[k].isLocked=false;
          }
        
      }
    }
    dragged(dX,dY,cX,cY)
    {
      let listD=[];
      for(let k=0;k<this.Object.length;k++)
      {
        
          if(this.Object[k].isSelected||this.Object[k].childSelected)
          {
            this.Object[k].dragged(dX,dY);
            listD.push(k);
          }
        else
          {
             this.Object[k].isLocked=false;
          }
      }
      for(let k=0;k<this.Object.length;k++)
      {
        if(!this.Object[k].isSelected)
        {
          if(this.Object[k].isClick(cX,cY))
          {
            this.Object[k].isSelected=false;
            for (let d=0;d<listD.length;d++)
            {
              this.moveElement(listD[d],k+d);
            }
            break;
          }
        }
      }
    }
    moveElement(fromIndex, toIndex) 
    {
      const element = this.Object.splice(fromIndex, 1)[0];
      //console.log(element);

      this.Object.splice(toIndex, 0, element);
    }

    deleteSelected()
    {
      //print(this.indexDclick)
      this.Object.splice(this.indexDclick,1);
    }
    
  }

class editorManager
  {
    constructor(x,y)
    {
      this.posX=x;
      this.posY=y;
      this.h=800;
      this.l=200;
      this.spacingX=80;
      this.spacingY=40;
      this.yLine=3;
      this.c=[random(0,255),random(0,255),random(0,255)];
      this.divL = createDiv('Sequence elements');
      this.divL.position(this.posX+20, this.posY+40);
      this.buttonM = createButton('Add Module');
      this.buttonM.position(this.posX+100, this.posY+80);
      this.buttonM.mousePressed(AddModule);
      this.buttonL = createButton('Add Loop');
      this.buttonL.position(this.posX+20, this.posY+80);
      this.buttonL.mousePressed(AddLoop);
      this.buttonP = createButton('Add Probe');
      this.buttonP.position(this.posX+20, this.posY+120);
      this.buttonP.mousePressed(AddProbe);
      
      
      this.divU = createDiv('Units');
      this.divU.position(this.posX+20, this.posY+160);
      this.units = createRadio();
      this.units.position(this.posX+20,this.posY+200);
      this.units.option('1','mT');
      this.units.option('2','Gauss');
      this.units.selected('1');
      this.units.style('width','150px');
      
      this.divS = createDiv('Simulate');
      this.divS.position(this.posX+20, this.posY+240);
      this.buttonS = createButton('Simulate');
      this.buttonS.position(this.posX+20, this.posY+280);
      this.buttonS.mousePressed(AddProbe);
      
    
     
      this.divO = createDiv('Timmings');
      this.divO.position(this.posX+20, this.posY+320);
      
      
      
      this.inp0 = createInput('');
      this.inp0.position(this.posX+20, this.posY+360);
      this.inp0.size(30);
      this.inp0.color=this.c;
      this.inp0.input(myInputEvent);
      
      this.inp = createInput('');
      this.inp.position(this.posX+60, this.posY+360);
      this.inp.size(30);
      this.inp.color=this.c;
      this.inp.input(myInputEvent);
      
      this.inp2 = createInput('');
      this.inp2.position(this.posX+100, this.posY+360);
      this.inp2.size(30);
      this.inp2.color=this.c;
      this.inp2.input(myInputEvent);
      
      this.inp3 = createInput('');
      this.inp3.position(this.posX+140, this.posY+360);
      this.inp3.size(30);
      this.inp3.color=this.c;
      this.inp3.input(myInputEvent);
    }
    getObject(obj)
    {
      if(obj.isLooper)
      {
          
      }
      else
      {
          
      }
    }
    show()
    {
      stroke(0);
      strokeWeight(2);
      fill(255);
      rect(this.posX, this.posY,this.l,this.h); 
      fill(this.c);
      
    }
    
  }