import Matter from "matter-js";

class DrawStatic {
// cannot get this to work; by calling it in GameTable we end up with two engines; this one is not rendered
drawTable(){
  console.log("Helper has been called for help!");
  var Engine = Matter.Engine;
  var World = Matter.World;
  var Bodies = Matter.Bodies;
  var engine = Engine.create({});
  var wallOptions = { isStatic: true, label: "From Helper", render: {fillStyle: "#000"}};
  World.add(engine.world, [
    // walls - x, y, width, height, {options}
    // Top
    Bodies.rectangle(100, 250, 900, 50, wallOptions)])
  console.log("Helper engine: ", engine);
  }

}

export default DrawStatic;
