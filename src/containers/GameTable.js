import React, {Component} from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";

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

    var engine = Engine.create({
      // positionIterations: 20
    });

    var render = Render.create({
      element: this.refs.scene,
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
      Bodies.circle(140, 140, 50, {isStatic: true, render: {fillStyle: "#B22222"}})
    ]);
    var triangleWall = Bodies.rectangle(345, 30, 5, 5, wallOptions);
    console.log(triangleWall);

    var ballOptions = {restitution: 0.5, render: {fillStyle: "#C0C0C0"}}
    // circles - x, y, radius, {options}
    var pinball = Bodies.circle(390, 540, 20, ballOptions);
    // var ballA = Bodies.circle(200, 20, 30, ballOptions);
    // var ballB = Bodies.circle(110, 50, 30, ballOptions);
    // World.add(engine.world, [ballA, ballB]);

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
      // World.add(engine.world, Bodies.circle(150, 50, 20, ballOptions));
    });

    const launchPinball = function (event){
      if(event.keyCode===32){
        World.add(engine.world, [pinball]);
        Matter.Body.setVelocity(pinball, { x: 0, y: -30});
		    Matter.Body.setAngularVelocity(pinball, 0);
        console.log("Prepare to launch!!!");
      };
    };

    document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', launchPinball, false);
    });



    Engine.run(engine);
    Render.run(render);
  }

  render() {
    return <div ref="scene" />;
  }
}
export default GameTable;
