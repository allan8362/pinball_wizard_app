import React, {Component} from "react";
import Matter from "matter-js";
import MatterAttractors from "matter-attractors";
// import DrawStatic from "../helpers/DrawStatic";
// import DrawFlippers from "../helpers/DrawFlippers.js";

class GameTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create({});
    console.log("engine: ", engine);

    const canvasWidth = 450;
    const canvasHeight = 600;

    var render = Render.create({
      element: this.refs.game,
      engine: engine,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        background: "#E0FFFF",
        currentbackground: "#E0FFFF"
      }
    });
    console.log("render:", render);

    function rect(x, y, width, height, label, angle, chamferRadius, color){
      return Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        restitution: 1,
        label: label,
        angle: angle,
        chamfer :{ radius: chamferRadius},
        render: {fillStyle: color}
      });
    }

    World.add(engine.world, [
      rect(0, 0, 900, 50, "Top Wall", 0, 0, "#4B0082"),
      rect(0, 0, 50, 1200, "Left Wall", 0, 0, "#4B0082"),
      rect(0, 600, 900, 50, "Bottom Wall", 0, 0, "#4B0082"),
      rect(450, 0, 50, 1200, "Right Wall", 0, 0, "#4B0082"),
      rect(50, 450, 100, 20, "Left Ledge", 0, 10, "#4B0082"),
      rect(300, 450, 100, 20, "Right Ledge", 0, 10, "#4B0082"),
      rect(345, 575, 20, 750, "Ball Release wall", 0, 10, "#4B0082"),
      rect(390, 50, 5, 100, "Top Right angled wall", -45, 0, "#4B0082"),
      Bodies.circle(140, 140, 50, {isStatic: true, label: "Red Bumper", render: {fillStyle: "#B22222"}})
    ]);

// these var are NOT USED anywhere in game but using to log out options for rectangle
    var triangleWall = rect(345, 30, 5, 250, "Triangle Wall", 0, 0, "#000");
    console.log("Rectangle: ", triangleWall);
    var bumper = Bodies.circle(140, 140, 50, {isStatic: true, label: "Red Bumper", render: {fillStyle: "#B22222"}});
    console.log("bumper: ", bumper);
// above can be removed later when finished debugging

  //Creating the flippers
  //Containers needed to keep flippers in place so isStatic option does not need to be used

  // Left Flipper:
  // (x, y, width, height, slope, [options])
    let leftFlipper = Bodies.trapezoid(135, 460, 20, 70, 0.23, {
      label: "Left Flipper",
      isStatic: true,
      render: {fillStyle: "#B22222"},
      angle: 1.9,
      chamfer: {}}); //chamfer allows for rounded edges on the paddles

  //Left flipper hinge
    leftFlipper.hinge = Bodies.circle(107, 450, 2, {
      label: "Left Flipper Hinge",
      isStatic: true,
      render: {fillStyle: "#ffffff"}
    });

  // Right Flipper:
    let rightFlipper = Bodies.trapezoid(215, 460, 20, 70, 0.23, {
      label: "Right Flipper",
      isStatic: true,
      render: {fillStyle: "#B22222"},
      angle: -1.9,
      chamfer: {}});

  //Right flipper hinge
    rightFlipper.hinge = Bodies.circle(242, 450, 2, {
      label: "Left Flipper Hinge",
      isStatic: true,
      render: {fillStyle: "#ffffff"}
    });


    World.add(engine.world, [leftFlipper, leftFlipper.hinge, rightFlipper, rightFlipper.hinge]);

    //Functionality needed for moving flippers when key is pressed
    //

  //End of flipper creation

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

    World.add(engine.world, mouseConstraint);

    Matter.Events.on(mouseConstraint, "mousedown", function(event) {
      console.log("x: ", event.mouse.position.x);
      console.log("y: ", event.mouse.position.y);
    });

    var ballOptions = {restitution: 0.5, label: "Pinball", render: {fillStyle: "#C0C0C0"}}
    // circles - x, y, radius, {options}
    var pinball = Bodies.circle(390, 540, 20, ballOptions);
    console.log("Pinball: ", pinball);

    const launchPinball = function (event){
      if(event.keyCode===32){
        World.add(engine.world, [pinball]);
        Matter.Body.setVelocity(pinball, { x: 0, y: -30});
		    Matter.Body.setAngularVelocity(pinball, 0);
      };
    };

    document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', launchPinball, false);
    });

    Engine.run(engine);
    Render.run(render);
    console.log("Bumper totalContacts: ", bumper.parent.totalContacts);
  }

  render() {
    return <div ref="game" />;
  }
}
export default GameTable;
