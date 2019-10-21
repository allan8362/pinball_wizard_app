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

    const canvasWidth = 500;
    const canvasHeight = 700;

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

    let leftFlipperUp = false;
    let rightFlipperUp = false;

    World.add(engine.world, [
      rect(0, 0, canvasWidth*2, 50, "Top Wall", 0, 0, "#4B0082"),
      rect(0, 0, 50, canvasHeight*2, "Left Wall", 0, 0, "#4B0082"),
      rect(0, canvasHeight, canvasWidth*2, 50, "Bottom Wall", 0, 0, "#4B0082"),
      rect(canvasWidth, 0, 50, canvasHeight*2, "Right Wall", 0, 0, "#4B0082"),
      rect(50, 550, 200, 20, "Left Ledge", 0, 10, "#4B0082"),
      rect(360, 550, 150, 20, "Right Ledge", 0, 10, "#4B0082"),
      rect(430, 575, 20, 750, "Ball Release wall", 0, 10, "#4B0082"),
      rect(450, 45, 10, 85, "Top Right angled wall", -45, 0, "#4B0082"),
      rect(375, 620, 10, 150, "Bottom Right slope", 0.7, 0, "#4B0082"),
      rect(55, 610, 10, 165, "Bottom Left slope", -0.6, 0, "#4B0082"),
      Bodies.circle(140, 140, 15, {isStatic: true, label: "Red Bumper", render: {fillStyle: "#B22222"}}),
      Bodies.circle(200, 140, 15, {isStatic: true, label: "Red Bumper", render: {fillStyle: "#B22222"}}),
      Bodies.circle(260, 140, 15, {isStatic: true, label: "Red Bumper", render: {fillStyle: "#B22222"}}),
      Bodies.circle(170, 200, 15, {isStatic: true, label: "Red Bumper", render: {fillStyle: "#B22222"}}),
      Bodies.circle(230, 200, 15, {isStatic: true, label: "Red Bumper", render: {fillStyle: "#B22222"}}),

    ]);

// these var are NOT USED anywhere in game but using to log out options for rectangle
    var triangleWall = rect(345, 30, 5, 250, "Triangle Wall", 0, 0, "#000");
    console.log("Rectangle: ", triangleWall);
    var bumper = Bodies.circle(140, 140, 50, {isStatic: true, label: "Red Bumper", render: {fillStyle: "#B22222"}});
    console.log("bumper: ", bumper);
// above can be removed later when finished debugging

  //Creating the flippers
  //Containers needed to keep flippers in place so isStatic option does not need to be used
    let leftContainerTop = Bodies.circle(200, 475, 40, {isStatic: true, render: {visible: false}});
    let leftContainerBottom = Bodies.circle(210, 600, 30, {isStatic: true,
      render: {fillStyle: "#B22222", visible: false}});

    World.add(engine.world, [leftContainerTop, leftContainerBottom]);

  // Left Flipper:
  // (x, y, width, height, slope, [options])
    let leftFlipper = Bodies.trapezoid(183, 560, 20, 70, 0.23, {
      label: "Left Flipper",
      // isStatic: true,
      render: {fillStyle: "#B22222"},
      angle: 1.9,
      chamfer: {}}); //chamfer allows for rounded edges on the flippers

  //Left flipper hinge
    leftFlipper.hinge = Bodies.circle(153, 550, 2, {
      label: "Left Flipper Hinge",
      isStatic: true,
      render: {fillStyle: "#ffffff"}
    });
  //Hold flipper in place
    leftFlipper.constraint = Constraint.create ({
      bodyA: leftFlipper,
      pointA: {x:-23.7, y: 0},
      bodyB: leftFlipper.hinge,
      length: 0,
      stiffness: 0
    });

    // Body.rotate(leftFlipper, -0.5) {}

  // Right Flipper:
    let rightFlipper = Bodies.trapezoid(252, 560, 20, 70, 0.23, {
      label: "Right Flipper",
      isStatic: true,
      render: {fillStyle: "#B22222"},
      angle: -1.9,
      chamfer: {}});

  //Right flipper hinge
    rightFlipper.hinge = Bodies.circle(280, 551, 2, {
      label: "Right Flipper Hinge",
      isStatic: true,
      render: {fillStyle: "#ffffff"}
    });


    World.add(engine.world, [leftFlipper, leftFlipper.hinge, leftFlipper.constraint, rightFlipper, rightFlipper.hinge]);
    console.log(leftFlipper);
    //Functionality needed for moving flippers when key is pressed
    // Left Flipper
      const leftKeyPress = function (event){
        if(event.keyCode===37){
          console.log("left flipper");
          Matter.Body.setVelocity(leftFlipper, { x: 0, y: 0});
  		    Matter.Body.setAngularVelocity(leftFlipper, -0.5);
        };
      };

    //Right Flipper
    const rightKeyPress = function (event){
      if(event.keyCode===39){
        console.log("right flipper");
        Matter.Body.setVelocity(rightFlipper, { x: 0, y: 0});
        Matter.Body.setAngularVelocity(rightFlipper, 0.5);
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
    var pinball = Bodies.circle(440, 540, 10, ballOptions);
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
    var score = 0;

    Matter.Events.on(engine, 'collisionStart', function(event) {

      console.log("Evento: ", event)
      var pairs = event.pairs;
      console.log("Pair no visible: ", pairs)
      console.log("Pair visible: ", pairs[0]);
      console.log("collision between " + pairs[0].bodyA.label + " - " + pairs[0].bodyB.label);
      if(pairs[0].bodyA.label==="Red Bumper" && pairs[0].bodyB.label==="Pinball"){
        score += 10;
        console.log("Score ", score);
      }
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
