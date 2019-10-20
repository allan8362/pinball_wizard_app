import React, {Component} from "react";
import Matter from 'matter-js';

class DrawFlippers extends Component {
  //Same issue as with DrawStatic.js - nothing showing in GameTable so code in there now
  drawLeftFlipper() {

    console.log("Flipper Helper!");
    var Engine = Matter.Engine;
    var World = Matter.World;
    var Bodies = Matter.Bodies;
    var Body = Matter.Body;
    var engine = Engine.create({});

    // (x, y, width, height, slope, [options])
    let leftFlipper = Bodies.rectangle(100, 200, 100, 20, {fillStyle: "#000000"});
    console.log("left flipper");

    World.add(engine.world, leftFlipper);
  }
}

export default DrawFlippers;
