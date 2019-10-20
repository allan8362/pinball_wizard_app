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
      Body = Matter.Body,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Constraint = Matter.Constraint;

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

    let leftFlipperUp = false;
    let rightFlipperUp = false;

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
  //Containers needed to keep flippers in place so isStatic option does not need to be used
    // let leftContainerTop = Bodies.circle(135, 400, 30, {isStatic: true, visible: false});
    // let leftContainerBottom = Bodies.circle(155, 500, 30, {isStatic: true, render: {fillStyle: "#B22222"}});

    // World.add(engine.world, [leftContainerTop, leftContainerBottom]);

  // Left Flipper:
  // (x, y, width, height, slope, [options])
    let leftFlipper = Bodies.trapezoid(135, 460, 20, 70, 0.23, {
      label: "Left Flipper",
      // isStatic: true,
      render: {fillStyle: "#B22222"},
      angle: 1.9,
      chamfer: {}}); //chamfer allows for rounded edges on the flippers

  //Left flipper hinge
    leftFlipper.hinge = Bodies.circle(107, 450, 2, {
      label: "Left Flipper Hinge",
      isStatic: true,
      render: {fillStyle: "#ffffff"}
    });

  // Right Flipper:
    let rightFlipper = Bodies.trapezoid(215, 460, 20, 70, 0.23, {
      label: "Right Flipper",
      // isStatic: true,
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
    // function keyPress(e) {
    //   if(e.key === "Left" || e.key === "ArrowLeft") {
    //     console.log("left flipper up");
    //     leftFlipperUp = true;
    //   } else if (e.key === "Right" || e.key === "ArrowRight") {
    //     console.log("right flipper up");
    //     rightFlipperUp = true;
    //   }

      const leftKeyPress = function (event){
        if(event.keyCode===37){
          console.log("left flipper");
          Matter.Body.setVelocity(leftFlipper, { x: 0, y: 0});
  		    Matter.Body.setAngularVelocity(leftFlipper, -0.10);
        };
      };

    // }
    // function keyRelease(e) {
    //   if(e.key === "Left" || e.key === "ArrowLeft") {
    //     console.log("left flipper down");
    //     leftFlipperUp = false;
    //   } else if(e.key === "Right" || e.key === "ArrowRight") {
    //     console.log("right flipper down");
    //     rightFlipperUp = false;
    //   }
    // }

    const rightKeyPress = function (event){
      if(event.keyCode===39){
        console.log("right flipper");
        Matter.Body.setVelocity(rightFlipper, { x: 0, y: 0});
        Matter.Body.setAngularVelocity(rightFlipper, 0.10);
      };
    };


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
    document.addEventListener('keydown', leftKeyPress, false);
    document.addEventListener('keydown', rightKeyPress, false);
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
