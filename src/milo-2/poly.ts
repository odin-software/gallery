import P5 from "p5";

import { options } from "./milo-2";

export class Poly {
  p5: P5;
  center: P5.Vector;
  offset: P5.Vector;
  radius: number;
  initialRadius: number;
  sides: number;
  vl: number;

  constructor(p5: P5, x: number, y: number, radius: number, sides: number) {
    this.p5 = p5;
    this.center = this.p5.createVector(x, y);
    this.offset = this.p5.createVector(0, 0);
    this.radius = radius;
    this.initialRadius = radius;
    this.sides = sides;
    this.vl = 0;
  }

  draw() {
    const rp =
      this.initialRadius +
      Math.abs(this.p5.sin(this.vl / 4) * options.setRVariance);
    let c1;
    if (options.explore) {
      c1 = this.p5.map(
        this.radius,
        options.width / 2,
        0,
        options.rngHue,
        options.rngHue * 2,
      );
    } else {
      c1 = this.p5.map(
        this.radius,
        options.width / 2,
        0,
        options.setHue,
        options.setHue * 2,
      );
    }
    const c2 = this.p5.map(this.radius, options.width / 2, 0, 0, 100);
    const c3 = this.p5.map(this.radius, options.width / 2, 0, 0, 80);

    if (print) {
      this.p5.fill(0);
    } else {
      this.p5.fill(27);
    }
    if (options.fillOutline) {
      this.p5.fill(c1, c2, c3);
    }
    this.p5.stroke(c1, c2, c3);
    if (options.maybe) {
      this.drawShape(this.p5.createVector(0, 0), "none", rp);
    } else {
      this.drawShape(this.p5.createVector(0, 0), "none", null);
    }
    // noFill();
    // if (i === width / 2) {
    let mult = options.setMult;
    if (options.explore) {
      mult = options.rngMult;
    }
    this.drawShape(
      this.p5.createVector(-this.radius * mult, -this.radius * mult),
      "left",
      null,
    );
    this.drawShape(
      this.p5.createVector(this.radius * mult, -this.radius * mult),
      "right",
      null,
    );
    this.drawShape(
      this.p5.createVector(this.radius * mult, this.radius * mult),
      "right",
      null,
    );
    this.drawShape(
      this.p5.createVector(-this.radius * mult, this.radius * mult),
      "left",
      null,
    );
  }

  drawShape(
    offset: P5.Vector,
    mode: "right" | "left" | "none",
    maybe: number | null,
  ) {
    if (mode === "none") {
      this.vl += (this.p5.TAU * 2) / options.framesAmount;
    }
    this.p5.push();
    this.p5.translate(this.center.x + offset.x, this.center.y + offset.y);
    if (mode === "right" && options.animate) {
      this.p5.rotate(this.vl);
    }
    if (mode === "left" && options.animate) {
      this.p5.rotate(-this.vl);
    }
    const side = this.p5.TAU / this.sides;
    this.p5.beginShape();
    if (maybe) {
      for (let a = side; a < this.p5.TAU + side; a += side) {
        this.p5.vertex(maybe * this.p5.cos(a), maybe * this.p5.sin(a));
      }
    } else {
      for (let a = side; a < this.p5.TAU + side; a += side) {
        this.p5.vertex(
          this.radius * this.p5.cos(a),
          this.radius * this.p5.sin(a),
        );
      }
    }
    this.p5.endShape(this.p5.CLOSE);
    this.p5.pop();
  }
}
