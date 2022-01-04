class Link{
    constructor(bodyA,bodyB)
    {
      var lastlink = bodyA.body.bodies.length-2;
     this.link = Constraint.create(
        {
          bodyA:bodyA.body.bodies[lastlink],
          //bodyA id the rope's last rectangle
         // pointA:{x:0,y:0},
          bodyB:bodyB,
          //pointB:{x:0,y:0},
          //bodyB is the melon
          length:-10,
          stiffness:0.01
        });
        World.add(world,this.link);
    } 
    detach(){
      World.remove(world,this.link);
    }
}
