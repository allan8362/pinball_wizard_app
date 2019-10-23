import React, {Component, Fragment} from "react";
import Matter from "matter-js";

class GameTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: "Player1",
      score: 0,
      lives: 1
    }

  }

  componentDidMount() {
    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Constraint = Matter.Constraint,
    Events = Matter.Events;


    var engine = Engine.create({});
    console.log("Engine: ", engine);

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
      }
    });

    console.log("Render:", render);

    const rect = (x, y, width, height, label, angle, chamferRadius, color) => {
      return Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        restitution: 1,
        friction: 0,
        label: label,
        angle: angle,
        chamfer: {radius: chamferRadius},
        render: {fillStyle: "#4B0082"}
      });
    }

    const bumper = (x, y, radius, label, color) => {
      return Bodies.circle(x, y, radius, {
        isStatic: true,
        restitution: 1,
        label: label,
        render: {fillStyle: color}
      });
    }

    const polygon = (x, y, sides, radius, angle, label, chamferRadius) => {
      return Bodies.polygon(x, y, sides, radius, {
        isStatic: true,
        angle: angle,
        label: label,
        chamfer: {radius: chamferRadius},
        render: {fillStyle: "#4B0082"}
      });
    }

    World.add(engine.world, [
      rect(canvasWidth/2, 0, canvasWidth, 50, "Top Wall", 0, 0),
      rect(0, canvasHeight/2, 50, canvasHeight, "Left Wall", 0, 0),
      rect(460, canvasHeight, 60, 50, "Bottom Release Wall", 0, 0),
      rect(220, canvasHeight, 405, 50, "Drop Zone", 0, 0),
      rect(canvasWidth, canvasHeight/2, 50, canvasHeight, "Right Wall", 0, 0),
      rect(90, canvasHeight-150, 165, 20, "Left Ledge", 0.4, 10),
      rect(360, canvasHeight-150, 165, 20, "Right Ledge", -0.4, 10),
      rect(430, 420, 20, 565, "Ball Release wall", 0, 10),
      bumper(164, 135, 15, "Red Bumper", "#B22222"), //top left
      bumper(canvasWidth/2.2, 122, 15, "Blue Bumper", "#0000FF"), //top middle
      bumper(290, 135, 15, "Red Bumper", "#B22222"), //top right
      bumper(151, 200, 15, "Red Bumper", "##B22222"), //middle left
      bumper(303, 200, 15, "Red Bumper", "#B22222"), //middle right
      bumper(164, 265, 15, "Red Bumper", "#B22222"), //bottom left
      bumper(canvasWidth/2.2, 278, 15, "Red Bumper", "#B22222"), // middle bottom
      bumper(290, 265, 15, "Red Bumper", "#B22222"), //bottom right left
      polygon(35, 35, 3, 40, 0.8, "Top Left Bumper", 0),
      polygon(470, 35, 3, 40, 0.3, "Top Right Bumper", 0)
    ]);

    // these are NOT USED anywhere in game but using to log out options for rectangle
    let triangleWall = rect(345, 30, 5, 250, "Triangle Wall", 0, 0, "#000");
    console.log("Rectangle: ", triangleWall);
    let bumperRed = bumper(140, 140, 50, "Red Bumper", "#B22222");
    console.log("Bumper: ", bumperRed);
    // above can be removed later when finished debugging

    //Creating the flippers
    //Containers needed to keep flippers in place so isStatic option does not need to be used
    let leftContainer = rect(100, canvasHeight-135, 200, 20, "Left Flipper Holder", 0.4, 10,
    {isStatic: true});

    let rightContainer = rect(345, canvasHeight-130, 170, 20, "Right Flipper Holder", -0.4, 10,
    {isStatic: true});

    World.add(engine.world, [leftContainer, rightContainer]);

    // Left Flipper:
    // (x, y, width, height, slope, [options])
    let leftFlipper = Bodies.trapezoid(170, 525, 20, 70, 0.23, {
      label: "Left Flipper",
      // isStatic: true,
      render: {fillStyle: "#B22222"},
      angle: 1.9,
      chamfer: {}}); //chamfer allows for rounded edges on the flippers

      //Left flipper hinge
      leftFlipper.hinge = Bodies.circle(165, 585, 2, {
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

      // Right Flipper:
      let rightFlipper = Bodies.trapezoid(260, 535, 20, 70, 0.23, {
        label: "Right Flipper",
        // isStatic: true,
        render: {fillStyle: "#B22222"},
        angle: -1.9,
        chamfer: {}});

        //Right flipper hinge
        rightFlipper.hinge = Bodies.circle(284, 585, 2, {
          label: "Right Flipper Hinge",
          isStatic: true,
          render: {fillStyle: "#ffffff"}
        });

        //Hold flipper in place
        rightFlipper.constraint = Constraint.create ({
          bodyA: rightFlipper,
          pointA: {x:23.7, y: 0},
          bodyB: rightFlipper.hinge,
          length: 0,
          stiffness: 0
        });

        World.add(engine.world, [leftFlipper, leftFlipper.hinge, leftFlipper.constraint,
          rightFlipper, rightFlipper.hinge, rightFlipper.constraint]);
        Body.setMass(leftFlipper, 5000);
        Body.setMass(rightFlipper, 5000);

        //Functionality needed for moving flippers when key is pressed
        // Left Flipper
        const leftKeyPress = function (event){
          if(event.keyCode===37){
            Matter.Body.setVelocity(leftFlipper, { x: 0, y: 0});
            Matter.Body.setAngularVelocity(leftFlipper, -0.45);
          };
        };

        //Right Flipper
        const rightKeyPress = function (event){
          if(event.keyCode===39){
            Matter.Body.setVelocity(rightFlipper, { x: 0, y: 0});
            Matter.Body.setAngularVelocity(rightFlipper, 0.45);
          };
        };
        //End of flipper creation

        //Create bumpers
        // Bottom left bumper above left flipper
        let bottomLeftBumper = rect(100, canvasHeight-220, 100, 20, "Bottom Bumper", 0.4, 10,
        {isStatic: true});

        // Bottom right bumper above right flipper
        let bottomRightBumper = rect(345, canvasHeight-220, 100, 20, "Bottom Bumper", -0.4, 10,
        {isStatic: true});

        // Middle left bumper
        //(x, y, sides, radius, [options])
        let middleLeftBumper = Bodies.polygon(30, canvasHeight-400, 5, 40, {
          label: "Middle Bumper",
          isStatic: true,
          render: {fillStyle: "#4B0082"},
          chamfer: {radius: 10}
        });

        //Middle right bumper
        let middleRightBumper = Bodies.rectangle(415, canvasHeight-400, 45, 100, {
          label: "Middle Bumper",
          isStatic: true,
          render: {fillStyle: "#4B0082"},
          chamfer: {radius: 20}
        });

        // Center polygon bumper
        let centerPolyBumper = Bodies.polygon(227, canvasHeight-500, 8, 35, {
          label: "Middle Bumper",
          isStatic: true,
          render: {fillStyle: "#4B0082"},
          chamfer: {radius: 10}
        });

        World.add(engine.world, [bottomLeftBumper, bottomRightBumper, middleLeftBumper, middleRightBumper, centerPolyBumper]);
        // End of create bumpers

        // add mouse control

        let mouse = Mouse.create(render.canvas),
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
        // end of mouse control

        // START pinball creation and launch functions
        let ballOptions = {restitution: 1, label: "Pinball", friction: 0.5, render: {fillStyle: "#2F4F4F"}}
        // circles - x, y, radius, {options}
        let pinball = Bodies.circle(450, 650, 10, ballOptions);
        console.log("Pinball: ", pinball);

        const launchPinball = function (event){
          if(event.keyCode===32){
            World.add(engine.world, [pinball]);
            Matter.Body.setVelocity(pinball, { x: 0, y: -35});
            Matter.Body.setAngularVelocity(pinball, 0);
            console.log("after pinball", engine);
          };
        };
        // END pinball creation and launch functions

        //Prevents pinball from going back down release area
        Events.on(engine, 'beforeUpdate', function(event) {
          if (pinball.position.x > 430 && pinball.velocity.y > 0) {
            Body.setVelocity(pinball, { x: 0, y: -10 });
          }
        });
        //End

        // OTHER event listeners
        document.addEventListener('DOMContentLoaded', () => {
          document.addEventListener('keydown', launchPinball, false);
          document.addEventListener('keydown', leftKeyPress, false);
          document.addEventListener('keydown', rightKeyPress, false);
        });
      // End of OTHER event listeners

      // START of Scoring Functions
        const scoreUpdate = (scoreEvent) => {
          if(scoreEvent==="Red"){
            this.setState(prevState => {
              return {score: prevState.score + 10}
            })
          } else if(scoreEvent==="Blue"){
            this.setState(prevState => {
              return {score: prevState.score + 50}
            })
          }
          else if(scoreEvent==="Bottom"){
            this.setState(prevState => {
              return {score: prevState.score + 10}
            })
          } else if(scoreEvent==="Middle"){
            this.setState(prevState => {
              return {score: prevState.score + 15}
            })
          };
        }

        const livesUpdate = () => {
          this.setState(prevState => {
            return {lives: prevState.lives - 1}
          });
          if(this.state.lives===0){
            const newScore = {
              id: Date.now(),
              player: this.state.player,
              score: this.state.score
            }

            alert('Game Over! You scored ' + this.state.score + ' points!');
            document.location.reload();

          }
        };

        Matter.Events.on(engine, 'collisionStart', function(event) {
          // console.log("Event: ", event)
          let pairs = event.pairs;
          // console.log("Pair no visible: ", pairs)
          // console.log("Pair visible: ", pairs[0]);
          // console.log("collision between " + pairs[0].bodyA.label + " - " + pairs[0].bodyB.label);
          if(pairs[0].bodyA.label==="Red Bumper" && pairs[0].bodyB.label==="Pinball"){
            scoreUpdate("Red");
          }
          if(pairs[0].bodyA.label==="Blue Bumper" && pairs[0].bodyB.label==="Pinball"){
            scoreUpdate("Blue");
          }
          if(pairs[0].bodyA.label==="Bottom Bumper" && pairs[0].bodyB.label==="Pinball"){
            scoreUpdate("Bottom");
          }
          if(pairs[0].bodyA.label==="Middle Bumper" && pairs[0].bodyB.label==="Pinball"){
            scoreUpdate("Middle");
          }
          if(pairs[0].bodyA.label==="Drop Zone" && pairs[0].bodyB.label==="Pinball"){
            engine.world.bodies.pop();
            window.setTimeout(livesUpdate(), 1000);
          }
        });
        // END of Scoring Functions

        Engine.run(engine);
        Render.run(render);
      }

      render(){
        return(
          <Fragment>
          <div className="scoreBar">
          <br/>
          <p>Player: {this.state.player}</p>
          <p>Score: {this.state.score}</p>
          <p>Lives: {this.state.lives}</p>
          <br/>
          </div>
          <div ref="game" />
          </Fragment>
        );
      }
    }

  export default GameTable;
