import { draw } from "./common";

export class Ane implements draw {
  num = 50;
  rootx: number[] = [];
  headx: any[] = [];
  heady: any[] = [];
  amp: number[] = [];
  alpha = 0;
  isExisted: boolean[] = [];
  canHeight: number;
  cxt2: CanvasRenderingContext2D;
  constructor(cxt2: CanvasRenderingContext2D, canHeight: number) {
    this.cxt2 = cxt2;
    this.canHeight = canHeight;
    this.init();
  }

  private init() {
    for (let i = 0; i < this.num; i++) {
      this.rootx[i] = i * 16 + Math.random() * 20;
      this.headx[i] = this.rootx[i];
      this.heady[i] = this.canHeight - (200 + Math.random() * 50);
      this.isExisted[i] = false;
      this.amp[i] = Math.random() * 50 + 50;
    }
  }
  public draw(deltaTime: number) {
    this.alpha += deltaTime * 0.0008;
    let l = Math.sin(this.alpha);
    this.cxt2.save();
    this.cxt2.globalAlpha = 0.6;
    this.cxt2.lineWidth = 20;
    this.cxt2.lineCap = "round";
    this.cxt2.strokeStyle = "#3b154e";
    for (let i = 0; i < this.num; ++i) {
      this.cxt2.beginPath();
      this.cxt2.moveTo(this.rootx[i], this.canHeight);
      this.headx[i] = this.rootx[i] + l * this.amp[i];
      this.cxt2.quadraticCurveTo(
        this.rootx[i],
        this.canHeight - 100,
        this.headx[i],
        this.heady[i]
      );
      this.cxt2.stroke();
    }
    this.cxt2.restore();
  }
}
