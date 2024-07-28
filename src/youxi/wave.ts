import { draw } from "./common";

export class Wave implements draw {
  num = 10;
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
    for (let i = 0; i < this.num; ++i) {
      this.alive[i] = false;
      this.r[i] = 0;
    }
  }
  draw(deltaTime: number): void {
    this.cxt1.save();
    this.cxt1.lineWidth = 2;
    this.cxt1.shadowBlur = 10;
    this.cxt1.shadowColor = "white";
    for (var i = 0; i < this.num; ++i) {
      if (this.alive[i]) {
        //draw
        //api round arc strokeStyle linewidth
        this.r[i] += deltaTime * 0.04;
        if (this.r[i] > 50) {
          this.alive[i] = false;
          continue;
        }
        var alpha = 1 - this.r[i] / 50;
        this.cxt1.beginPath();
        this.cxt1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
        this.cxt1.closePath();
        this.cxt1.closePath();
        this.cxt1.strokeStyle = "rgba(255,255,255," + alpha + ")";
        this.cxt1.stroke();
      }
    }
    this.cxt1.restore();
  }
  born(x: number, y: number) {
    for (let i = 0; i < this.num; i++) {
      if (!this.alive[i]) {
        //born
        this.alive[i] = true;
        this.r[i] = 10;
        this.x[i] = x;
        this.y[i] = y;
        return;
      }
    }
  }
}
