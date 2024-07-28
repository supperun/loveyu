import { draw } from "./common";
import { lerpDistance, lerpAngle } from "./common/commonFunctions";
import { GameData } from "./gameData";
import { Mom } from "./mom";

export class Bady implements draw {
  x: number;
  y: number;
  angle: number;
  babyTailTimer = 0;
  babyTailCount = 0;
  babyEyeTimer = 0;
  babyEyeCount = 0;
  babyEyeInternal = 1000;
  babyBodyTimer = 0;
  babyBodyCount = 0;
  cxt1: CanvasRenderingContext2D;
  mom: Mom;
  canHeight: number;
  canWidth: number;
  gameData: GameData;
  babyTail: HTMLImageElement[] = [];
  babyBody: HTMLImageElement[] = [];
  babyEye: HTMLImageElement[] = [];

  constructor(
    cxt1: CanvasRenderingContext2D,
    mom: Mom,
    gameData: GameData,
    canHeight: number,
    canWidth: number
  ) {
    this.mom = mom;
    this.gameData = gameData;
    this.cxt1 = cxt1;
    this.x = canWidth / 2 - 50;
    this.y = canHeight / 2 + 50;
    this.angle = 0;
    this.canHeight = canHeight;
    this.canWidth = canWidth;
    this.init();
  }
  private init() {
    for (let i = 0; i < 8; i++) {
      this.babyTail[i] = new Image();
      this.babyTail[i].src = "./assets/babyTail" + i + ".png";
    }
    for (let i = 0; i < 20; i++) {
      this.babyBody[i] = new Image();
      this.babyBody[i].src = "./assets/babyFade" + i + ".png";
    }
    for (let i = 0; i < 2; i++) {
      this.babyEye[i] = new Image();
      this.babyEye[i].src = "./assets/babyEye" + i + ".png";
    }
  }
  public draw(deltaTime: number) {
    //lerp x y
    this.x = lerpDistance(this.mom.x, this.x, 0.98);
    this.y = lerpDistance(this.mom.y, this.y, 0.98);

    //lerp angle;
    let deltay = this.mom.y - this.y;
    let deltax = this.mom.x - this.x;
    let beta = Math.atan2(deltay, deltax) + Math.PI;
    this.angle = lerpAngle(beta, this.angle, 0.6);
    //baby tail count
    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50) {
      this.babyTailCount = (this.babyTailCount + 1) % 8;
      this.babyTailTimer %= 50;
    }
    //baby eye count
    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInternal) {
      this.babyEyeCount = (this.babyEyeCount + 1) % 2;
      this.babyEyeTimer %= this.babyEyeInternal;
      {
        if (this.babyEyeCount == 0) {
          this.babyEyeInternal = Math.random() * 1500 + 2000;
        } else {
          this.babyEyeInternal = 200;
        }
      }
    }
    //baby body
    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 200) {
      this.babyBodyCount += 1;
      this.babyBodyTimer %= 200;
      if (this.babyBodyCount > 19) {
        this.babyBodyCount = 19;
        // game over;
        this.gameData.gameOver = true;
      }
    }

    this.cxt1.save();
    this.cxt1.translate(this.x, this.y);
    this.cxt1.rotate(this.angle);
    let count = this.babyTailCount;
    let eyecount = this.babyEyeCount;
    let bodycount = this.babyBodyCount;
    this.cxt1.drawImage(
      this.babyTail[count],
      -this.babyTail[count].width / 2 + 23,
      -this.babyTail[count].height / 2
    );
    this.cxt1.drawImage(
      this.babyBody[bodycount],
      -this.babyBody[bodycount].width / 2,
      -this.babyBody[bodycount].height / 2
    );
    this.cxt1.drawImage(
      this.babyEye[eyecount],
      -this.babyEye[eyecount].width / 2,
      -this.babyEye[eyecount].height / 2
    );

    this.cxt1.restore();
  }
}
