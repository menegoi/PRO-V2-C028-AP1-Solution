class CannonBall{
    constructor(x,y,r){

        this.r = r;
        this.image = loadImage("assets/cannonBall.png");

        var options = {
            isStatic:true
        }
        this.body = Bodies.circle(x,y,r, options);
        World.add(world,this.body);

    }
    shoot(){
        var newAngle = cannon.angle -28;
        newAngle = newAngle*(3.14/180); 

        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);

        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body, {x: velocity.x*(180/3.14),y:velocity.y*(180/3.14)});
    }
    remove(index){

        Matter.Body.setVelocity(this.body, {x:0,y:0});
    
        setTimeout(() => {
            Matter.World.remove(world,this.body);
            delete balls[index];
    
        },0);
    }

    display(){
        var position = this.body.position;

        push();
        image(this.image, position.x,position.y, this.r,this.r);
        pop();

        
    }
}