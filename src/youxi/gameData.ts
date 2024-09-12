import { draw } from './utils';

export class GameData implements draw {
  fruitNum = 0;
  double = 1;
  score = 0;
  gameStart = false;
  pause = false;
  gameOver = false;
  alpha = 0;
  canHeight: number;
  canWidth: number;
  cxt1: CanvasRenderingContext2D;
  constructor(
    cxt1: CanvasRenderingContext2D,
    canHeight: number,
    canWidth: number
  ) {
    this.cxt1 = cxt1;
    this.canHeight = canHeight;
    this.canWidth = canWidth;
  }
  draw(deltaTime: number): void {
    this.cxt1.save();
    this.cxt1.shadowBlur = 10;
    this.cxt1.shadowColor = 'white';
    // this.cxt1.fillText(
    //   'Score: ' + this.score,
    //   this.canWidth / 2,
    //   this.canHeight - 50
    // )
    if (this.gameOver) {
      // this.alpha += deltaTime * 0.0005
      // if (this.alpha > 1) this.alpha = 1
      this.cxt1.fillStyle = 'rgba(255,255,255,' + '1' + ')';
      this.cxt1.fillText('Game Over!', this.canWidth / 2, this.canHeight / 2);
    }
    this.cxt1.restore();
  }
  addScore() {
    this.score += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1;
  }
  reset() {
    this.fruitNum = 0;
    this.double = 1;
  }
}
