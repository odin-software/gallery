/**
  Milo II
  by: Kendry Grullón
**/

import P5 from "p5";

import { Poly } from "./poly.js";
import { CONSTANTS, CONFIG } from "../consts.js";

let width = 1000;
const rotationSpeed = 0.005;
const maxSides = 12;

export const options = {
  ...CONFIG,
  width: 1000,
  height: 1000,
  fillOutline: false, // Controls whether the lines/curves are contained.
  transparency: true, // Controls whether it has radial transparency.
  explore: true, //eflejools if the end result is random.
  rndFixedSeed: true, // Controls if the random seed will be fixed.
  noiseFixedSeed: true, // Controls if the noise seed will be fixed.
  saveGif: false, // Controls if we are saving the gif.
  animate: true, // Controls if animation is happening.
  maybe: false, // maybe

  // randomness
  rngSize: width / ((Math.random() * width) / 2),
  rngSides: 4 + Math.floor((Math.random() * maxSides) / 2) * 2,
  rngMult: 0.001 + Math.random() * 2,
  rngHue: Math.random() * 360,

  // particular seeding
  setSize: 30, // Size of polygons.
  setSides: 8, // Sides of polygons.
  setMult: 1.2, // How far away are the extra polygons from center.
  setHue: 160, // starting hue color.
  setRVariance: 80,
  rotationSpeed: rotationSpeed,
  framesAmount: 2 / rotationSpeed,
};

const sketch = (p5: P5) => {
  const polis: Poly[] = [];

  p5.setup = () => {
    let w = options.width;
    let h = options.height;
    if (options.FOR_PRINT) {
      w = CONSTANTS.SIZE.PRINT_WIDTH;
      h = CONSTANTS.SIZE.PRINT_HEIGHT;
    }
    p5.createCanvas(w, h);
    p5.strokeJoin(p5.ROUND);
    p5.colorMode(p5.HSL);
    polis.length = 0;
    if (options.explore) {
      for (let i = w; i > 0; i -= options.rngSize) {
        const p = new Poly(p5, w / 2, h / 2, i, options.rngSides);
        polis.push(p);
      }
    } else {
      for (let i = w; i > 0; i -= options.setSize) {
        const p = new Poly(p5, w / 2, h / 2, i, options.setSides);
        polis.push(p);
      }
    }
    if (options.saveGif) {
      p5.saveGif("newGif", options.framesAmount, {
        units: "frames",
      });
    }
  };

  p5.draw = () => {
    if (options.FOR_PRINT) {
      p5.background(0);
    } else {
      p5.background(27);
    }

    for (let i = 0; i < polis.length; i++) {
      polis[i].draw();
    }

    if (!options.animate) {
      p5.noLoop();
    }
  };

  p5.keyPressed = () => {
    if (p5.key === "s") {
      p5.setup();
      p5.saveGif("newgif", options.framesAmount, {
        units: "frames",
      });
    } else if (p5.key === "p") {
      p5.save("milo2.png");
    }
  };
};

new P5(sketch);
