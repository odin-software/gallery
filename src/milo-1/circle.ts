import P5 from "p5";
import { options } from "./milo-1.js";
import { CONSTANTS } from "../consts.js";

export class ShadedCircle {
  p5: P5;
  radius: number;
  halfRadius: number;
  hv: boolean;

  vC: number;
  vA: number;
  vL: number;
  hC: number;
  hA: number;
  hL: number;

  constructor(p5: P5, r: number, hv: boolean, off: number) {
    this.p5 = p5;
    this.radius = r;
    this.halfRadius = r / 2;
    this.hv = hv;
    const lerpStart = options.explore
      ? this.p5.map(off, 0, options.ringsRnd, 0, 1)
      : this.p5.map(off, 0, options.ringsAmt, 0, 1);

    // Rotation
    this.vC = 1;
    this.vA = 0;
    this.vL = lerpStart;
    this.hC = 1;
    this.hA = 0;
    this.hL = lerpStart;
  }

  draw() {
    this.outline();
    this.curves();
  }

  verticalCurves(portion: number) {
    this.p5.push();
    if (options.FOR_PRINT) {
      this.p5.translate(
        CONSTANTS.SIZE.PRINT_WIDTH / 2,
        CONSTANTS.SIZE.PRINT_HEIGHT / 2,
      );
    } else {
      this.p5.translate(options.width / 2, options.height / 2);
    }
    let phase = (this.p5.PI / 2) * this.vC;
    let animLerp = Math.pow(this.vL, 4);
    let finalLerp = this.p5.lerp(this.vA, phase, animLerp);
    if (this.vL >= 1) {
      this.vC += 1;
      this.vL = 0;
      this.vA = phase;
    }
    this.vL += options.rotationSpeed;
    if (options.animation) {
      this.p5.rotate(finalLerp);
    }
    for (
      let i = this.p5.PI / 2 + portion;
      i <= (3 * this.p5.PI) / 2 - portion;
      i += portion
    ) {
      let j = this.p5.PI - i;
      let p1 = this.p5.createVector(
        this.p5.cos(i) * this.halfRadius,
        this.p5.sin(i) * this.halfRadius,
      );
      let p2 = this.p5.createVector(
        this.p5.cos(j) * this.halfRadius,
        this.p5.sin(j) * this.halfRadius,
      );
      let a1 = 2 * this.p5.PI - i;
      let a2 = 2 * this.p5.PI - j;
      const p = this.p5.createVector(0, 0).sub(p1);
      const newy = p1.y - p.y;
      this.p5.strokeWeight(2);
      this.p5.noFill();
      if (this.p5.dist(0, p1.y, 0, 0) > this.halfRadius / 3) {
        if (p1.y < 0) {
          this.p5.arc(0, newy, this.radius, this.radius, a2, a1);
        } else {
          this.p5.arc(0, newy, this.radius, this.radius, a1, a2);
        }
      } else if (options.lines) {
        this.p5.line(p1.x, p1.y, p2.x, p2.y);
      }
    }
    this.p5.pop();
  }

  horizontalCurves(portion: number) {
    this.p5.push();
    if (options.FOR_PRINT) {
      this.p5.translate(
        CONSTANTS.SIZE.PRINT_WIDTH / 2,
        CONSTANTS.SIZE.PRINT_HEIGHT / 2,
      );
    } else {
      this.p5.translate(options.width / 2, options.height / 2);
    }
    let phase = (this.p5.PI / 2) * this.hC;
    let animLerp = Math.pow(this.hL, 4);
    let finalLerp = this.p5.lerp(this.hA, phase, animLerp);
    if (this.hL >= 1) {
      this.hC += 1;
      this.hL = 0;
      this.hA = phase;
    }
    this.hL += options.rotationSpeed;
    if (options.animation) {
      this.p5.rotate(-finalLerp);
    }
    for (
      let i = this.p5.PI + portion;
      i <= 2 * this.p5.PI - portion;
      i += portion
    ) {
      let j = 2 * this.p5.PI - i;
      let p1 = this.p5.createVector(
        this.p5.cos(i) * this.halfRadius,
        this.p5.sin(i) * this.halfRadius,
      );
      let p2 = this.p5.createVector(
        this.p5.cos(j) * this.halfRadius,
        this.p5.sin(j) * this.halfRadius,
      );
      let a1 = this.p5.PI - i;
      let a2 = this.p5.PI - j;
      const p = this.p5.createVector(0, 0).sub(p2);
      const newx = p1.x - p.x;
      this.p5.strokeWeight(2);
      this.p5.noFill();
      if (this.p5.dist(p1.x, 0, 0, 0) > this.halfRadius / 3) {
        if (p1.x < 0) {
          this.p5.arc(
            newx,
            0,
            this.halfRadius * 2,
            this.halfRadius * 2,
            a1,
            a2,
          );
        } else {
          this.p5.arc(
            newx,
            0,
            this.halfRadius * 2,
            this.halfRadius * 2,
            a2,
            a1,
          );
        }
      } else if (options.lines) {
        this.p5.line(p1.x, p1.y, p2.x, p2.y);
      }
    }
    this.p5.pop();
  }

  curves() {
    const portion = options.explore ? options.portion : options.fixedPortion;
    this.p5.strokeWeight(3);
    if (this.hv) {
      this.horizontalCurves(portion);
    } else {
      this.verticalCurves(portion);
    }
  }

  outline() {
    // Outline
    this.p5.strokeWeight(1);

    if (options.fillOutline) {
      if (options.FOR_PRINT) {
        this.p5.fill(0);
      } else {
        this.p5.fill(27);
      }
    } else {
      this.p5.noFill();
    }

    if (options.transparency) {
      if (options.FOR_PRINT) {
        const tr = this.p5.map(
          this.radius,
          CONSTANTS.SIZE.PRINT_HEIGHT,
          100,
          0.1,
          1,
        );
        this.p5.stroke(`rgba(244, 244, 244, ${tr})`);
      } else {
        const tr = this.p5.map(this.radius, options.height, 100, 0.1, 1);
        this.p5.stroke(`rgba(244, 244, 244, ${tr})`);
      }
    } else {
      this.p5.stroke(244);
    }

    if (options.FOR_PRINT) {
      this.p5.circle(
        CONSTANTS.SIZE.PRINT_WIDTH / 2,
        CONSTANTS.SIZE.PRINT_HEIGHT / 2,
        this.radius,
      ); //remove a
    } else {
      this.p5.circle(options.width / 2, options.height / 2, this.radius); //remove a
    }
  }
}
