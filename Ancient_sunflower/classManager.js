class layoutManager
  {
    constructor(x,y)
    {
      this.Object=[];
      this.Order=0;
      this.posX=x;
      this.posY=y; 
      this.spacingX=20;
      this.spacingY=20;
      this.eManager = new editorManager(0,0);
      this.table = new TableUI(0,this.eManager.h);
      this.editor = new Editor(20,this.eManager.h);
     
      this.indexDclick=false;
      this.FOV=[0.25, 0.25, 0.004];
      this.Matrix=[128, 128, 1];
      this.SeqName="randomSeq_KM";
      this.extractor= new Export(this.FOV,this.Matrix, this.SeqName);
      this.editor.contentFill('');
    }
    addLoop()
    {
      let l=new Looper(this.posX,this.posY);
      this.Object.push(l);
      this.updateID();
    }
    addModule()
    {
      let m=new Module(this.posX,this.posY);
      this.Object.push(m);
      this.updateID();
    }
    addProbe()
    {
      let m=new Probe(this.posX,this.posY);
      this.Object.push(m);
      this.updateID();
    }
    updateObj2Table()
    {
      for(let k=0;k<this.Object.length;k++)
      {
         if(this.Object[k].isDoubleSelected)
         {
            this.table.UpdateTable(this.Object[k]);
         }
      }
    }
    updateTable2Obj()
    {
      for(let k=0;k<this.Object.length;k++)
      {
         if(this.Object[k].isDoubleSelected)
         {
           this.table.updateObj(this.Object[k]);
         }
      }
      this.update();
    }
    generateTable()
    {
      this.table.destruct();
      for(let k=0;k<this.Object.length;k++)
      {
         if(this.Object[k].isDoubleSelected)
         {
           this.table.AddObject(this.Object[k]);
         }
      }
      this.updatePosition();
      
    }
    removeTable()
    {
      this.table.destruct(); 
      this.updatePosition();
    }
    updatePosition()
    {
       this.editor.position(20,this.eManager.h+this.table.dy);
    }
    show()
    {
      let Gap=this.posY;
      for(let k=0;k<this.Object.length;k++)
      {
        Gap+=this.Object[k].show(k*this.spacingX,Gap)+this.spacingY;
      }
      
      for(let k=this.Object.length-1;k>=0;k--)
      {
           Gap+=this.Object[k].showGap(k*this.spacingX,Gap)+this.spacingY; 
        // print(Gap)
      }
      //this.generateTable()
      // 
     // let GapTable= this.eManager.l;
     // GapTable+=this.table.show(0,GapTable,"test");
      
    }
    doubleUnselect()
    {
       for(let k=0;k<this.Object.length;k++)
      {
        //this.Object[k].unselect(); 
        this.Object[k].doubleUnselect();
      }
    }
    unselect()
    {
      for(let k=0;k<this.Object.length;k++)
      {
        this.Object[k].unselect(); 
        //this.Object[k].doubleUnselect();
      }
    }
    isClick(moX,moY,ctr_key)
    {
      let check=false;
      for(let k=0;k<this.Object.length;k++)
      {
        if(!this.Object[k].childSelected)
        {
            if(this.Object[k].isClick(moX,moY))
            {
                this.Object[k].select_();
              check=true;
            }
            else
            {
              if(!ctr_key)
              {  
                this.Object[k].unselect();
              }
           }
        }
        
      }
      return check;
    }
    isDoubleClick(moX,moY,ctr_key)
    {
      this.indexDclick=false;

      //this.editor.contentEmpty();
      for(let k=0;k<this.Object.length;k++)
      {      
          if(this.Object[k].isDoubleClick(moX,moY))
          {
              this.Object[k].doubleSelect_();
              this.indexDclick=true;
             
          }
         else
          {
            if(!ctr_key)
            {  
              this.Object[k].doubleUnselect();
            }
          }
         /* if(this.Object[k].childSelected)
          {
            this.editor.contentFill(this.Object[k].getChild());    
          } */     
          
      }
      if(this.indexDclick)this.generateTable();
      else this.removeTable();
      return this.indexDclick;
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
      this.updateID();
    }

    deleteSelected()
    {
      //print(this.indexDclick)
      for(let k=this.Object.length-1;k>=0;k--)
      {
        if(this.Object[k].isDoubleSelected)
        {
          if(this.Object[k].destruct())
          {
            this.table.destruct();
            this.Object.splice(k,1);
            this.updateID();
          }
        }
      }
    }
    update()
    {
      for(let k=0;k<this.Object.length;k++)
      {
        this.Object[k].update();
      }
    }
    updateID()
    {
      for(let k=0;k<this.Object.length;k++)
      {
        this.Object[k].updateID(k);
      }
    }
    eventID(k,n)
    {
      this.Object[k].eventID(n);
      this.generateTable();
    }
    exportPulSeq()
    {
      this.extractor.reset();
      this.recursiveExportEvent(0);
      
      this.extractor.write2file();
    }
    recursiveExportEvent(ObjCounter)
    {
      if ( this.Object[ObjCounter].type==1)  //Module
      {
          this.extractor.addEvent(this.Object[ObjCounter].SeqObj,this.Object[ObjCounter].sortIdx);
          if (ObjCounter+1<this.Object.length)
          {
              this.recursiveExportEvent(ObjCounter+1);
          }
      }
      else if ( this.Object[ObjCounter].type==2) //looper
      {
        for (let k=this.Object[ObjCounter].st;k<this.Object[ObjCounter].end;k+=this.Object[ObjCounter].inc)
        {
          if (ObjCounter+1<this.Object.length)
          {
            this.recursiveExportEvent(ObjCounter+1);
          }
        }
      }  
      else // Probe
      {
          if (ObjCounter+1<this.Object.length)
          {
              this.recursiveExportEvent(ObjCounter+1);
          }
      }
     // print(" last "+String(ObjCounter));
      
    }
    getObj(nameID)
    {
      for(let k=0;k<this.Object.length;k++)
      {
        if(this.Object[k].name===nameID)
        {
          return this.Object[k];
        }
        else
        {
            for(let p=0;p<this.Object[k].SeqObj.length;p++)
            { 
              if(this.Object[k].SeqObj[p].name===nameID)
              {
                return this.Object[k].SeqObj[p];
              }
            }
        }
      }
      return NaN;
    }
    compileScript()
    {
      /*let dat=[];
      dat=this.getObj(this.editor.currentName);
      
      if(dat.computeContent(this.editor.getContent()))
      {
          dat.isCompiled=true;
          dat.isValid=true;
      }
      else
      {
            dat.isCompiled=true;
            dat.isValid=false;
      }*/
      let content=this.editor.getContent();
      let text2=content.replace(new RegExp('<br>', "g"), "");
      text2=text2.replace(new RegExp('<div>', "g"), "");
      text2=text2.replace(new RegExp('</div>', "g"), "");
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
    
  }

class editorManager
  {
    constructor(x,y)
    {
      this.posX=x;
      this.posY=y;
      this.h=320;
      this.l=350;
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
      
      this.buttonS = createButton('PulSeq');
      this.buttonS.position(this.posX+100, this.posY+280);
      this.buttonS.mousePressed(PulSeq);
    
     
      
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