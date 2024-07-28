import { draw } from "./common";

export class Dust implements draw {
  num = 30;
  x: number[] = [];
  y: number[] = [];
  number: number[] = [];
  amp: number[] = [];
  alpha: number;
  canHeight: number;
  canWidth: number;
  cxt1: CanvasRenderingContext2D;
  dustPic: HTMLImageElement[] = [];
  constructor(
    cxt1: CanvasRenderingContext2D,
    canHeight: number,
    canWidth: number
  ) {
    this.cxt1 = cxt1;
    this.alpha = 0;
    this.canHeight = canHeight;
    this.canWidth = canWidth;
    this.init();
  }
  private init() {
    for (let i = 0; i < this.num; i++) {
      this.x[i] = Math.random() * this.canWidth;
      this.y[i] = Math.random() * this.canHeight;
      this.amp[i] = 20 + Math.random() * 25;
      this.number[i] = Math.floor(Math.random() * 7); //[0,6]
    }
    for (let i = 0; i < 7; i++) {
      this.dustPic[i] = new Image();
      this.dustPic[i].src = "./assets/dust" + i + ".png";
    }
  }
  draw(deltaTime: number): void {
    this.cxt1.save();
    this.alpha += deltaTime * 0.0008;
    let l = Math.sin(this.alpha);
    for (let i = 0; i < this.num; ++i) {
      var no = this.number[i];
      this.cxt1.drawImage(
        this.dustPic[no],
        this.x[i] + l * this.amp[i],
        this.y[i]
      );
    }
    this.cxt1.restore();
  }
}
