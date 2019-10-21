import React, {Component} from "react";
import Matter from 'matter-js';

class DrawFlippers {

  movePaddles() {
    let leftFlipperUp = false;
    let rightFlipperUp = false;



    function keyPress(e) {
      if(e.key === "Left" || e.key === "ArrowLeft") {
        console.log("left flipper up");
        leftFlipperUp = true;
      } else if (e.key === "Right" || e.key === "ArrowRight") {
        console.log("right flipper up");
        rightFlipperUp = true;
      }
    }

    function keyRelease(e) {
      if(e.key === "Left" || e.key === "ArrowLeft") {
        console.log("left flipper down");
        leftFlipperUp = false;
      } else if(e.key === "Right" || e.key === "ArrowRight") {
        console.log("right flipper down");
        rightFlipperUp = false;
      }
    }
  }
}


export default DrawFlippers;
