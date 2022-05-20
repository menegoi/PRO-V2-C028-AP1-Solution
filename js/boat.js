class Boat{

    constructor(x,y,w,h, boatPosition, boatAnimation){
        this.w = w;
        this.h = h;
        this.boatPosition = boatPosition;
        this.image = loadImage("assets/boat.png");
        this.animation = boatAnimation;
        this.speed = 0.05;
        this.isBroken = false;

        this.body = Bodies.rectangle(x,y,w,h);
        World.add(world,this.body);

    }
    animate(){
        this.speed += 0.05;
    }
    remove(index){
        this.animation = brokenBoatAnimation;
        this.speed = 0.05;
        this.w = 300;
        this.h = 300;

        this.isBroken = true;

        setTimeout(() => {
            Matter.World.remove(world,boats[index].body);
            delete boats[index];
    
        },2000);
    }

    display(){
        var angle = this.body.angle;
        var position = this.body.position;

        var index = floor(this.speed % this.animation.length);

        push();
        translate(position.x,position.y);
        rotate(angle);
        image(this.animation[index],0,this.boatPosition,this.w,this.h);
        pop();

    }


}