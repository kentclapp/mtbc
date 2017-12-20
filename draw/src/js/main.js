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
  //What shape are we drawing
  shape='';

  //ending x,y coords

  return{

    //Sets the shape to the drawing
    setShape(shp){
      shape = shp;
    },

      //Set the x,y coords
    setXY: function(evt) {
      x = (evt.clientX - rect.left) - canvas.offsetLeft;
      y = (evt.clientY - rect.top);
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
    drawRect: function(x,y,h,w) {
      ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
      ctx.fillRect(x1,y1,(x2-x1),(y2-y1));
    },
//Returns the canvas object
    getCanvas: function(){
      return canvas;
    },

    //Draws a selected setShape
    draw: function() {
      if(shape==='rectangle'){
        this.drawRect();
      }else{
        alert('Please choose a shape');
      }
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
document.getElementById('btnRect').addEventListener('click', function(evt) {
  draw.setShape('rectangle');
}, false);

//Track  x,y position
draw.getCanvas().addEventListener('mousemove', function(evt) {
  draw.setXY(evt);
  draw.writeXY();
}, false);


//Set the starting  x,y position
draw.getCanvas().addEventListener('mousedown', function() {
  draw.setStart();
}, false);

//Set the ending  x,y position
draw.getCanvas().addEventListener('mouseup', function() {
  draw.setEnd();
  draw.drawRect();
}, false);

draw.draw();
