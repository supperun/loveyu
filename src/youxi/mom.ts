import { draw } from "./common";
import { lerpDistance, lerpAngle } from "./common/commonFunctions";
import { GameData } from "./gameData";

export class Mom implements draw {
  x;
  y;
  angle;
  bigEyeTimer = 0;
  bigEyeCount = 0;
  bigEyeInternal = 800;
  bigBodyCount = 0;
  bigTailTimer = 0;
  bigTailCount = 0;
  cxt1: CanvasRenderingContext2D;
  momTail: HTMLImageElement[] = [];
  momEye: HTMLImageElement[] = [];
  momBodyOra: HTMLImageElement[] = [];
  momBodyBlue: HTMLImageElement[] = [];
  gameData: GameData;

  constructor(
    cxt1: CanvasRenderingContext2D,
    gameData: GameData,
    canHeight: number,
    canWidth: number
  ) {
    this.cxt1 = cxt1;
    this.gameData = gameData;
    this.x = canWidth / 2 - 50;
    this.y = canHeight / 2 + 50;
    this.angle = 0;
    this.init();
  }
  private init() {
    for (let i = 0; i < 8; i++) {
      this.momTail[i] = new Image();
      this.momTail[i].src = "./assets/bigTail" + i + ".png";
    }
    for (let i = 0; i < 2; i++) {
      this.momEye[i] = new Image();
      this.momEye[i].src = "./assets/bigEye" + i + ".png";
    }
    for (let i = 0; i < 8; i++) {
      this.momBodyOra[i] = new Image();
      this.momBodyBlue[i] = new Image();
      this.momBodyOra[i].src = "./assets/bigSwim" + i + ".png";
      this.momBodyBlue[i].src = "./assets/bigSwimBlue" + i + ".png";
    }
  }
  draw(deltaTime: number, my: number, mx: number): void {
    //lerp x,y
    //commonFunction
    this.x = lerpDistance(mx, this.x, 0.98);
    this.y = lerpDistance(my, this.y, 0.98);

    //delta angle
    //Math.atan2(y,x)
    let deltay = my - this.y;
    let deltax = mx - this.x;
    let beta = Math.atan2(deltay, deltax) + Math.PI;
    //lerp angle
    this.angle = lerpAngle(beta, this.angle, 0.6);
    //tail
    this.bigTailTimer += deltaTime;
    if (this.bigTailTimer > 50) {
      this.bigTailCount += 1;
      this.bigTailCount %= 8;
      this.bigTailTimer %= 50;
    }
    //eye
    this.bigEyeTimer += deltaTime;
    if (this.bigEyeTimer > this.bigEyeInternal) {
      this.bigEyeCount = (this.bigEyeCount + 1) % 2;
      this.bigEyeTimer %= this.bigEyeInternal;
      if (this.bigEyeCount == 0) {
        this.bigEyeInternal = Math.random() * 1000 + 500;
      } else this.bigEyeInternal = 200;
    }
    this.cxt1.save();
    this.cxt1.translate(this.x, this.y);
    this.cxt1.rotate(this.angle);
    let be = this.bigEyeCount;
    let bb = this.bigBodyCount;
    let bt = this.bigTailCount;
    this.cxt1.drawImage(
      this.momTail[bt],
      -this.momTail[bt].width / 2 + 30,
      -this.momTail[bt].height / 2
    );

    if (this.gameData.double == 1) {
      //orange
      this.cxt1.drawImage(
        this.momBodyOra[bb],
        -this.momBodyOra[bb].width / 2,
        -this.momBodyOra[bb].height / 2
      );
    } else {
      this.cxt1.drawImage(
        this.momBodyBlue[bb],
        -this.momBodyBlue[bb].width / 2,
        -this.momBodyBlue[bb].height / 2
      );
    }
    this.cxt1.drawImage(
      this.momEye[be],
      -this.momEye[be].width / 2,
      -this.momEye[be].height / 2
    );
    this.cxt1.restore();
  }
}
