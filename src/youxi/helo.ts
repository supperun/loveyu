import { draw } from "./common";

export class Helo implements draw {
  num = 5;
  x: number[] = [];
  y: number[] = [];
  alive: boolean[] = [];
  r: number[] = [];
  cxt1: CanvasRenderingContext2D;
  constructor(cxt1: CanvasRenderingContext2D) {
    this.cxt1 = cxt1;
    this.init();
  }
  private init() {
    for (var i = 0; i < this.num; ++i) {
      this.x[i] = 0;
      this.y[i] = 0;
      this.alive[i] = false;
      this.r[i] = 0;
    }
  }
  draw(deltaTime: number): void {
    this.cxt1.save();
    this.cxt1.lineWidth = 2;
    this.cxt1.shadowBlur = 10;
    this.cxt1.shadowColor = "rgba(203,91,0,1)";
    for (var i = 0; i < this.num; ++i) {
      if (this.alive[i]) {
        //draw
        this.r[i] += deltaTime * 0.05;
        if (this.r[i] > 50) {
          this.alive[i] = false;
          continue;
        }
        var alpha = 1 - this.r[i] / 50;
        this.cxt1.beginPath();
        this.cxt1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
        this.cxt1.closePath();

        this.cxt1.strokeStyle = "rgba(203,91,0," + alpha + ")";
        this.cxt1.stroke();
      }
    }
    this.cxt1.restore();
  }
  born(x: number, y: number) {
    for (var i = 0; i < this.num; ++i) {
      if (!this.alive[i]) {
        this.alive[i] = true;
        this.r[i] = 10;
        this.x[i] = x;
        this.y[i] = y;
      }
    }
  }
}
