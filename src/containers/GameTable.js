import React, {Component} from "react";
import Matter from "matter-js";
// import DrawStatic from "../helpers/DrawStatic";
import DrawFlippers from "../helpers/DrawFlippers.js";

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

    var render = Render.create({
      element: this.refs.game,
      engine: engine,
      options: {
        width: 450,
        height: 600,
        wireframes: false,
        background: "#E0FFFF",
        currentbackground: "#E0FFFF"
      }
    });
    console.log("render:", render);

    var wallOptions = { isStatic: true, render: {fillStyle: "#4B0082"}};

    World.add(engine.world, [
      // walls - x, y, width, height, {options}
      // Top
      Bodies.rectangle(0, 0, 900, 50, wallOptions),
      // Left
      Bodies.rectangle(0, 0, 50, 1200, wallOptions),
      // Bottom
      Bodies.rectangle(0, 600, 900, 50, wallOptions),
      // Right
      Bodies.rectangle(450, 0, 50, 1200, wallOptions),
      // Left Ledge
      Bodies.rectangle(50, 450, 100, 20, wallOptions),
      // Right Ledge
      Bodies.rectangle(300, 450, 100, 20, wallOptions),
      // Ball Release wall
      Bodies.rectangle(345, 575, 20, 750, wallOptions),
      // Top right angled wall
      Bodies.rectangle(345, 30, 5, 250, {angle: -45, isStatic: true, render: {fillStyle: "#4B0082"}}),
      // Bumper
      Bodies.circle(140, 140, 50, {isStatic: true, label: "Red Bumper", render: {fillStyle: "#B22222"}})
    ]);

// these var are NOT USED anywhere in game but using to log out options for rectangle
    wallOptions.label = "Triangle Wall";
    var triangleWall = Bodies.rectangle(345, 30, 5, 250, wallOptions);
    console.log("Rectangle: ", triangleWall);
    var bumper = Bodies.circle(140, 140, 50, {isStatic: true, label: "Red Bumper", render: {fillStyle: "#B22222"}});
    console.log("bumper: ", bumper);
// above can be removed later when finished debugging

  //Creating the flippers
  // Left Flipper:
    //Containers top keep flipper in place so isStatic does not need to be used
    //

    // (x, y, width, height, slope, [options])
    let leftFlipper = Bodies.trapezoid(135, 460, 20, 70, 0.23, {
      label: "Left Flipper",
      isStatic: true,
      render: {fillStyle: "#B22222"},
      angle: 1.9,
      chamfer: {}}); //chamfer allows for rounded edges on the paddles

  // Right Flipper:
    //Containers top keep flipper in place so isStatic does not need to be used
    //

    let rightFlipper = Bodies.trapezoid(215, 460, 20, 70, 0.23, {
      label: "Right Flipper",
      isStatic: true,
      render: {fillStyle: "#B22222"},
      angle: -1.9,
      chamfer: {}});


    World.add(engine.world, [leftFlipper, rightFlipper]);

    //Functionality for moving flippers when key is pressed
    //

  //end of flipper creation

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
