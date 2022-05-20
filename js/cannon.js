class Cannon{

    constructor(x,y,w,h,angle){
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.angle = angle;
      this.imageBase = loadImage("assets/cannonBase.png");
      this.imageCannon = loadImage("assets/cannon.png");
    }

  display() {
    if (keyIsDown(RIGHT_ARROW) && this.angle < 70) {
      this.angle += 1;
    }

    if (keyIsDown(LEFT_ARROW) && this.angle > -30) {
      this.angle -= 1;
    }

    push();
    translate(this.x,this.y);
    rotate(this.angle);
    image(this.imageCannon, 0,0,this.w,this.h);
    pop();

    image(this.imageBase, 170,130,200,200);
    
  }


}