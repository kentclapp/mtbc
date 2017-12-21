var draw = (function(){

  //Get the height and the width of the main element
  var mWidth = document.querySelector('main').offsetWidth,
      mHeight = document.querySelector('main').offsetHeight,

  //Create the Canvas
  canvas = document.createElement("canvas"),

  //create a drawing getContext
  ctx=canvas.getContext("2d"),

  //create the initial bounding box
  rect = canvas.getBoundingClientRect(),

  //current coords
  x=0,
  y=0,

  //starting x,y coords
  x1=0,
  y1=0,
  //ending x,y coords
  x2=0,
  y2=0,
  //previous x,y coords for path
  lx=0,
  ly=0,

  //What shape are we drawing
  shape='',

  // for path, have we started drawing yet?
   isDrawing=false;


  //ending x,y coords

  return{

    setIsDrawing: function(bool) {
      isDrawing = bool;
    },

    getIsDrawing: function() {
      return isDrawing;
    },

    getShape: function() {
      return shape;
    },

    //return a random color
    randColor: function() {
      return  '#'+Math.floor(Math.random()*16777215).toString(16);
    },

    //Sets the shape to the drawing
    setShape(shp){
      shape = shp;
      console.log(shape);
    },

      //Set the x,y coords
    setXY: function(evt) {
      //Set the previous coords
      lx=x;
      ly=y;

      x = (evt.clientX - rect.left) - canvas.offsetLeft;
      y = (evt.clientY - rect.top);

      console.log({'x':x, 'y':y, 'lx':lx, 'ly':ly})
    },

    //Write the co0rds back to the UI
    writeXY: function() {
      document.getElementById('trackX').innerHTML = 'X: ' + x;
      document.getElementById('trackY').innerHTML = 'Y: ' + y;
    },

    setStart: function() {
      x1=x;
      y1=y;
    },

    setEnd: function() {
      x2=x;
      y2=y;
    },



  //Draws a rectangle
    drawRect: function() {
      ctx.fillStyle = this.randColor();
      ctx.strokeStyle = this.randColor();
      ctx.fillRect(x1,y1,(x2-x1),(y2-y1));
      ctx.strokeRect(x1,y1,(x2-x1),(y2-y1));
    },

  //Draws a line
    drawLine: function() {
    ctx.strokeStyle = this.randColor();
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
  },


    //Draws a circle using multiple triangles and pathagrem therom
      drawCircle: function() {
        console.log('I\'m drawing a circle');
        ctx.fillStyle = this.randColor();
        ctx.strokeStyle = this.randColor();
        let a = (x1-x2);
        let b = (y1-y2);
        let radius = Math.sqrt(a*a+b*b);
        ctx.beginPath();
        ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    },

    //Draws a path
      drawPath: function() {
        console.log('I\'m drawing a path');
        ctx.strokeStyle = this.randColor();
        ctx.beginPath();
        ctx.moveTo(lx,ly);
        ctx.lineTo(x,y);
        ctx.stroke();

    },

//Returns the canvas object
    getCanvas: function(){
      return canvas;
    },

    //Draws a selected setShape
    draw: function() {
      console.log(shape);
      ctx.restore();
      if(shape==='rectangle'){
        this.drawRect();
      }else if(shape==='line'){
        this.drawLine();
      }else if(shape==='circle'){
        this.drawCircle();
      }else if(shape==='path'){
        this.drawPath();
      }else{
        alert('Please choose a shape');
      }
      console.log(shape);
      ctx.save();
    },

//Create the canvas
    init: function() {
      canvas.height = mHeight;
      canvas.width = mWidth;
      document.querySelector('main').appendChild(canvas);
    }

  };

})();

draw.init();

//Chose to draw a rectangle
document.getElementById('btnRect').addEventListener('click', function() {
  draw.setShape('rectangle');
}, );

//Chose to draw a line
document.getElementById('btnLine').addEventListener('click', function() {
  draw.setShape('line');
}, );


//Chose to draw a circle
document.getElementById('btnCircle').addEventListener('click', function() {
  draw.setShape('circle');
}, );

//Chose to draw a path
document.getElementById('btnPath').addEventListener('click', function() {
  draw.setShape('path');
}, );

//Track  x,y position
draw.getCanvas().addEventListener('mousemove', function(evt) {
  draw.setXY(evt);
  draw.writeXY();
  if(draw.getShape()==='path' && draw.getIsDrawing()===true) {
    draw.draw();
  }
}, );


//Set the starting  x,y position
draw.getCanvas().addEventListener('mousedown', function() {
  draw.setStart();
  draw.setIsDrawing(true);
}, );

//Set the ending  x,y position
draw.getCanvas().addEventListener('mouseup', function() {
  draw.setEnd();
  draw.draw();
  draw.setIsDrawing(false);
}, );
