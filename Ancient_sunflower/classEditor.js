class Editor {
  constructor(x, y) 
  {
    this.posX=x
    this.posY=y
    this.content=[];
    this.spacingX=20;
    this.spacingY=30;
    this.dy=0;
    
    
    this.divTL = createDiv("test <\n> tes1 <\n> test3");
    this.divTL.class('editor');
    this.divTL.position(this.posX+20, this.posY);
    this.divTL.attribute('contentEditable', 'true');
    this.divTL.style('height', 200 + 'px');
    this.divTL.style('width',300 + 'px');
    this.divTL.style('background-color','white');
    this.divTL.style('border-color', 'green');
    this.divTL.style('border-style', 'solid');
    this.divTL.style('overflow','auto');
    this.compileButton = createButton('compile');
    this.compileButton.position(this.posX+20, this.posY+220);
    this.compileButton.mousePressed(compileScript);
    
    this.currentName="";
    //this.divTL.style('focus:outline','none');
    //this.divTL.style.focus('outline','none');
    this.contentEmpty();
    //this.contentFill(' potato patato ');
  }
  contentError()
  {
    this.divTL.style('border-color', 'red');
  }
  contentEmpty()
  {
    this.divTL.html('');
    this.currentName='';
    this.content='';
    this.divTL.style('border-color', 'white');
    this.divTL.attribute('contentEditable', 'false');
    this.compileButton.style('visibility', 'hidden');
  }
  contentFill(data)
  {
    this.content=data;
   /* this.currentName=data.name;
   // text=text+'name='+data.name+';<br>';
    this.content=this.content+'Obj(\''+data.name+'\').amp='+(data.Eq1)+';<br>';
    this.content=this.content+'Obj(\''+data.name+'\').ramp1='+(data.Eq2)+';<br>';
    this.content=this.content+'Obj(\''+data.name+'\').flat='+(data.Eq3)+';<br>';
    this.content=this.content+'Obj(\''+data.name+'\').ramp2='+(data.Eq4)+';<br>';
    this.content=this.content+'Obj(\''+data.name+'\').start='+(data.Eq5)+';<br>';*/
    this.divTL.html(this.content);
    this.divTL.style('border-color', 'green');
    this.divTL.attribute('contentEditable', 'true');
    this.compileButton.style('visibility', 'visible');
  
  }
  contentGood()
  {
     this.divTL.style('border-color', 'green');
  }
  position(dx,dy)
  {
    this.divTL.position(dx, dy);
    this.compileButton.position(dx, dy+220);
  }
  getContent()
  {
     this.content= this.divTL.html();
     return this.content;
  }
  
}