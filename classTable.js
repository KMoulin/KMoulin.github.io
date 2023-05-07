class TableUI {
  constructor(x, y) 
  {
    this.posX=x
    this.posY=y
    this.isPopulated=false;
    this.divO = [];
    
      this.divT1 = [];
      this.divT2 = [];
     
      this.divT3 = [];
    
      this.divT4 = [];
    
      this.divT5 =[];
     
      
      this.inp0 =[];
  
      
      this.inp1 = [];
    
      
      this.inp3 = [];
    
      
      this.inp4 = [];
  }
  populate(dx,dy,Rf,Gx,Gy,Gz)
  {
    this.divO = createDiv('Timmings');
      this.divO.position(20, 320);
      
      this.divT1 = createDiv('Name');
      this.divT1.position(20, 340);
      this.divT2 = createDiv('Amp');
      this.divT2.position(60, 340);
      this.divT3 = createDiv('Rup');
      this.divT3.position(100, 340);
      this.divT4 = createDiv('Flat');
      this.divT4.position(140, 340);
      this.divT5 = createDiv('Rdw');
      this.divT5.position(190, 340);
      
      this.inp0 = createInput('');
      this.inp0.position(20, 360);
      this.inp0.size(30);
      this.inp0.color=this.c;
      this.inp0.input(myInputEvent);
      
      this.inp1 = createInput('');
      this.inp1.position(60, 360);
      this.inp1.size(30);
      this.inp1.color=this.c;
      this.inp1.input(myInputEvent);
      
      this.inp2 = createInput('');
      this.inp2.position(100, 360);
      this.inp2.size(30);
      this.inp2.color=this.c;
      this.inp2.input(myInputEvent);
      
      this.inp3 = createInput('');
      this.inp3.position(140, 360);
      this.inp3.size(40);
      this.inp3.color=this.c;
      this.inp3.input(myInputEvent);
      
      this.inp4 = createInput('');
      this.inp4.position(190, 360);
      this.inp4.size(30);
      this.inp4.color=this.c;
      this.inp4.input(myInputEvent);
    this.isPopulated=true;
  }
  destruct()
  {
    
    if(this.isPopulated)
    {  
      this.divO.remove();
      
      this.inp0.remove();
       this.inp1.remove();
       this.inp2.remove();
       this.inp3.remove();
       this.inp4.remove();
      this.divT1.remove();
      this.divT2.remove();
      this.divT3.remove();
      this.divT4.remove();
      this.divT5.remove();
      this.isPopulated=false;
    }
  }
}