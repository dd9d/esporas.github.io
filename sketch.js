const points = [];
let bg;
let y = 0
let dragPoint = null;

const numPoints = 1000;
const dragRadius = 10;

function setup() {
  bg = loadImage("esporas.png");
  createCanvas(windowWidth, windowHeight);
  strokeWeight(.2);
  stroke("#37eadc");
  textSize(100);
  
  for(let i = 0; i < numPoints; i ++) {
    points.push(createVector(random(width), random(height)));
  }
}

function draw() {
  //background(bg);
  
  fill(255,255,255,100);
  for(let p of points) {
    circle(p.x, p.y, dragRadius * 1);
  }
}

function mousePressed() {
  for(let i = points.length - 1; i >= 0; i --) {
    const isPressed = mouseInCircle(points[i], dragRadius);
      
    if(isPressed) {
      dragPoint = points.splice(i, 1)[0];
      points.push(dragPoint);

      break;
    }    
  }
}

function mouseDragged() {
  if(dragPoint) {
    dragPoint.x = mouseX;
    dragPoint.y = mouseY;
  }
}

function mouseReleased() {
  dragPoint = null;
}

function mouseInCircle(pos, radius) {
  return dist(mouseX, mouseY, pos.x, pos.y) < radius
}


// texto imagen

function mouseInBox(x, y, w, h) {
  return mouseX >= x && mouseX < x + w &&
          mouseY >= y && mouseY < y + h;
}

class TextDragObject {
  constructor(x, y, str) {
    this.x = x;
    this.y = y;
    this.str = str;
  }
  
  mouseInside() {
    const w = textWidth(this.str);
    const h = textSize();
    return mouseInBox(this.x, this.y - h, w, h);
  }
  
  show() {
    text(this.str, this.x, this.y);
  }
}

class ImageDragObject {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }
    
  mouseInside() {
    return mouseInBox(this.x, this.y, this.img.width, this.image.height);
  }
  
  show() {
    image(this.img, this.x, this.y);
  }
}