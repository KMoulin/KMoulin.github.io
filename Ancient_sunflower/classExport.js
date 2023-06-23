class Export 
{
  constructor(fov,mat,name) 
  {
    this.content=[]; 
    this.FOV=fov;
    this.Matrix=mat;
    this.SeqName=name;
    this.Blockcount=-1;
    this.Blockstart=0;
    this.Blocks=[];
    this.Blocks[0]=[0, 0, 0, 0, 0, 0, 0, 0];
    this.vecGrad=[];
    this.vecRF=[];
    this.vecADC=[];
    this.vecDelay=[];
    this.vecDelay.push(0);
  }
  reset()
  {
    this.Blockcount=-1;
    this.Blocks=[];
    this.vecGrad=[];
    this.vecRF=[];
    this.vecADC=[];
    this.vecDelay=[];
    this.vecDelay.push(0);
  }
  addEvent(Obj,Idx_sorted)
  {
    let current_max=1;
    let current_block=0;
    this.Blockcount+=1;
    this.Blocks[this.Blockcount]=[this.Blockcount, 0, 0, 0, 0, 0, 0, 0];
    this.Blockcount+=1;
    this.Blocks[this.Blockcount]=[this.Blockcount, 0, 0, 0, 0, 0, 0, 0];
    for (let p = 0; p < Obj.length; p++)
    {
          if(Obj[Idx_sorted[p]].start<current_max)
          {
              current_max=Obj[Idx_sorted[p]].start+Obj[Idx_sorted[p]].duration;
              this.RegisterObj(Obj[Idx_sorted[p]]);
          }
          else // New block
          {
               if((Obj[Idx_sorted[p]].start-current_max)>0)
               {
                 this.Blockcount+=1; 
                 this.Blockstart=current_max;
                 this.Blocks[this.Blockcount]=[this.Blockcount, 0, 0, 0, 0, 0, 0, 0];
                 this.RegisterDelay((Obj[Idx_sorted[p]].start-current_max))    
               }
               this.Blockcount+=1;
               this.Blockstart=Obj[Idx_sorted[p]].start;
               this.Blocks[this.Blockcount]=[this.Blockcount, 0, 0, 0, 0, 0, 0, 0];
               this.RegisterObj(Obj[Idx_sorted[p]]); 
               current_max=Obj[Idx_sorted[p]].start+Obj[Idx_sorted[p]].duration;
          }
    }
  }
  RegisterObj(Obj)
  {
    if(Obj.type==1) //Grad
    {
      this.RegisterGrad(Obj);    
    }
    if(Obj.type==2) //RF
    {
      this.RegisterRF(Obj);    
    }
    if(Obj.type==3) //ADC
    {
      this.RegisterADC(Obj);    
    }
  }
  RegisterDelay(delay)
  {
     let tmpP=-1;
     for(let p=0;p<this.vecDelay.length;p++)
     {
        if(this.vecDelay[p]==delay)
        {
          tmpP=p;
          break;
        }  
     }

     if (tmpP== (-1))
     {
       this.vecDelay.push(delay);
       this.Blocks[this.Blockcount][1]=this.vecDelay.length;
     }
     else
     {
       this.Blocks[this.Blockcount][1]=tmpP;
     } 
  }
  RegisterGrad(Obj)
  {
    this.Blocks[this.Blockcount][1+Obj.axis]=Obj.nID;
    if (this.LookUp(Obj.nID,1+Obj.axis)==0)
    {
      this.vecGrad.push(Obj);    
    }
  }
  RegisterADC(Obj)
  {
    this.Blocks[this.Blockcount][6]=Obj.nID;
    
    if (this.LookUp(Obj.nID,6)==0)
    {
      this.vecADC.push(Obj);    
    }
  }
  RegisterRF(Obj)
  {
    this.Blocks[this.Blockcount][2]=Obj.nID;
    if (this.LookUp(Obj.nID,2)==0)
    {
      this.vecRF.push(Obj);    
    }
  }

  LookUp(nID,type)
  {
    if(this.Blockcount==0)
    {
        return 0;
    }
    for(let p=this.Blockcount-1;p>=0;p--)
    {
       if(this.Blocks[p][type]==nID)
       {
         return p;
       }
    }
    return 0;
  }
  write2file()
  {
    let writer = createWriter('test.seq');
    ////// VERSION ///////
    let tmpText="[VERSION]";
    writer.print(tmpText);
    tmpText="major 1";
    writer.print(tmpText);
    tmpText="minor 1";
    writer.print(tmpText);
    tmpText="revision 1";
    writer.print(tmpText);
    
    ////// DEFINITIONS /////
    tmpText="[DEFINITIONS]";
    writer.print(tmpText);
    tmpText="FOV "+String(this.FOV[0])+" "+String(this.FOV[1])+" "+String(this.FOV[2]);
    writer.print(tmpText);
    tmpText="Name "+this.SeqName;
    writer.print(tmpText);
    
    ////// BLOCKS /////
    tmpText="[BLOCKS]";
    writer.print(tmpText);
    //writer.print(i * i);
    for (let p = 0; p < this.Blocks.length; p++)
    {
      tmpText=String(this.Blocks[p]).replace(new RegExp(',', "g"),'\t');
      writer.print(tmpText);
    }
    
     ////// RF /////
    tmpText="[RF]";
    writer.print(tmpText);
    for (let p = 0; p < this.vecRF.length; p++)
    {
      tmpText=String(this.vecRF[p].nID+" "+(-this.vecRF[p].amp)+" "+this.vecRF[p].nID+" "+0+" "+0+" "+this.vecRF[p].freq+" "+this.vecRF[p].phase+" ");
      writer.print(tmpText);
    }
     ////// TRAP /////
    tmpText="[TRAP]";
    writer.print(tmpText);
    for (let p = 0; p < this.vecGrad.length; p++)
    {
      tmpText=String(this.vecGrad[p].nID+" "+this.vecGrad[p].amp+" "+this.vecGrad[p].ramp1+" "+this.vecGrad[p].flat+" "+this.vecGrad[p].ramp2+" "+0);
      writer.print(tmpText);
    }
    
     ////// ADC /////
    tmpText="[ADC]";
    writer.print(tmpText);
    for (let p = 0; p < this.vecADC.length; p++)
    {
      tmpText=String(this.vecADC[p].nID+" "+this.vecADC[p].num+" "+this.vecADC[p].dwell+" "+0+" "+this.vecADC[p].freq+" "+this.vecADC[p].phase);
      writer.print(tmpText);
    }
  
     ////// ADC /////
    tmpText="[DELAYS]";
    writer.print(tmpText);
    for (let p = 1; p < this.vecDelay.length; p++)
    {
      tmpText=String(p+" "+this.vecDelay[p]);
      writer.print(tmpText);
    }
    
    ////// Shapes /////
    tmpText="[SHAPES]";
    writer.print(tmpText);
    for (let p = 0; p < this.vecRF.length; p++)
    {
      tmpText=String("shape_id"+this.vecRF[p].nID)
      writer.print(tmpText);
      tmpText=String("num_samples"+this.vecRF[p].nPoint)
      writer.print(tmpText);
      for (let pt = 0; pt < this.vecRF[p].nPoint; pt++)
      {
        tmpText=String(this.vecRF[p].py[pt]);
        writer.print(tmpText);
      }
    }
    writer.close();
    writer.clear();
  }
}
class Event
{
  constructor(vect)
  {
    Event.content=vect;
  }
}
  