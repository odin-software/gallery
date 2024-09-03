/**
  Milo I
  by: Kendry Grullón
**/

import P5 from "p5";

import { ShadedCircle } from "./circle.js";
import { CONSTANTS, CONFIG } from "../consts.js";

const curvesLimit = 82;
const curvesAmt = 80;
const ringsLimit = 20;
let dff = 0;
let idx = 0;

export const options = {
  ...CONFIG,
  width: 1000,
  height: 1000,
  fillOutline: true, // Controls whether the lines/curves are contained.
  transparency: true, // Controls whether it has radial transparency.
  lines: false, // Controls if we show lines in the middle of the rings.
  animation: true, // Controls wheter it animates the sketch or not.
  explore: true, // Controls if the end result is random.
  rndFixedSeed: false, // Controls if the random seed will be fixed.
  noiseFixedSeed: false, // Controls if the noise seed will be fixed.
  saveGif: false, // Controls if we are saving the gif.

  // randomness
  ringsRnd: Math.random() * ringsLimit, // Random amount of rings.
  curvesLimit, // Max number of curves within rings.
  portion: Math.PI / Math.floor(Math.random() * curvesLimit), // Random amount of curves.
  randomNoiseVH: 0.4 + Math.random(), // Alternation between vertical and horizontal curves.

  // particular seeding
  ringsAmt: 16, // Fixed amount of rings.
  curvesAmt, // Exact amount of curves within rings.
  fixedPortion: Math.PI / curvesAmt, // Fixed amount of curves.
  rotationSpeed: 0.005, // Rotation speed of the rings.
  noiseVH: 0.2, // Alternation between vertical and horizontal curves.
  randomSeed: 18, // Controls the values of all the `random()` calls.
  noiseSeed: 11, // Controls the values of all the `noise()` calls.
};
const framesAmount = 2 / options.rotationSpeed;

// Circles prep

const sketch = (p5: P5) => {
  const circles: ShadedCircle[] = [];

  p5.setup = () => {
    if (options.FOR_PRINT) {
      p5.createCanvas(CONSTANTS.SIZE.PRINT_WIDTH, CONSTANTS.SIZE.PRINT_HEIGHT);
    } else {
      p5.createCanvas(options.width, options.height);
    }
    if (options.noiseFixedSeed) {
      p5.noiseSeed(options.noiseSeed);
    }
    if (options.rndFixedSeed) {
      p5.randomSeed(options.randomSeed);
    }

    circles.length = 0;
    dff = 0;
    idx = 0;

    if (options.FOR_PRINT) {
      const rings = options.explore
        ? CONSTANTS.SIZE.PRINT_HEIGHT / options.ringsRnd
        : CONSTANTS.SIZE.PRINT_HEIGHT / options.ringsAmt;
      for (let i = CONSTANTS.SIZE.PRINT_HEIGHT; i > 0; i -= rings) {
        dff += options.explore ? options.randomNoiseVH : options.noiseVH;
        circles.push(new ShadedCircle(p5, i, p5.noise(dff) > 0.5, idx));
        idx += 1;
      }
    } else {
      const rings = options.explore
        ? options.height / options.ringsRnd
        : options.height / options.ringsAmt;
      for (let i = options.height; i > 0; i -= rings) {
        dff += options.explore ? options.randomNoiseVH : options.noiseVH;
        circles.push(new ShadedCircle(p5, i, p5.noise(dff) > 0.5, idx));
        idx += 1;
      }
    }

    if (options.saveGif) {
      p5.saveGif("newGif", framesAmount, {
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
    circles.forEach((c) => {
      p5.stroke(25, 38, 88);
      c.draw();
    });
  };

  p5.keyPressed = () => {
    if (p5.key === "s") {
      p5.setup();
      p5.saveGif("newGif", framesAmount, {
        units: "frames",
      });
    } else if (p5.key === "p") {
      p5.save("milo1.png");
    }
  };
};

new P5(sketch);
