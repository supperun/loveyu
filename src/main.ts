import './global.css';
import '../public/favicon.ico';
import { momFruitsCollision, momBabyCollision } from './youxi/collision';
import { requestAnimFrame, isMobile } from './youxi/utils';
import { Ane } from './youxi/ane';
import { Fruit } from './youxi/fruit';
import { Mom } from './youxi/mom';
import { GameData } from './youxi/gameData';
import { Bady } from './youxi/bady';
import { Helo } from './youxi/helo';
import { Wave } from './youxi/wave';
import { Dust } from './youxi/dust';
require.context('./assets', false);

class Main {
  gameData: GameData;
  ane: Ane;
  fruit: Fruit;
  mom: Mom;
  bady: Bady;
  wave: Wave;
  helo: Helo;
  dust: Dust;
  can1 = document.getElementById('canvas1') as HTMLCanvasElement;
  can2 = document.getElementById('canvas2') as HTMLCanvasElement; //backgroun.ane,fruits
  cxt1 = this.can1.getContext('2d') as CanvasRenderingContext2D;
  cxt2 = this.can2.getContext('2d') as CanvasRenderingContext2D;

  my: number = 0;
  mx: number = 0;
  bgPic: HTMLImageElement;
  lastTime: number = Date.now();
  deltaTime: number = 0;
  private randomMouseMoveInterval: any;

  constructor() {
    let canWidth = (this.can1.width = globalThis.innerWidth);
    let canHeight = (this.can1.height = globalThis.innerHeight);
    this.can2.width = globalThis.innerWidth;
    this.can2.height = globalThis.innerHeight;
    this.gameData = new GameData(this.cxt1, canHeight, canWidth);
    this.ane = new Ane(this.cxt2, canHeight);
    this.fruit = new Fruit(this.cxt2, this.ane);
    this.mom = new Mom(this.cxt1, this.gameData, canHeight, canWidth);
    this.bady = new Bady(
      this.cxt1,
      this.mom,
      this.gameData,
      canHeight,
      canWidth
    );
    this.wave = new Wave(this.cxt1);
    this.helo = new Helo(this.cxt1);
    this.dust = new Dust(this.cxt1, canHeight, canWidth);
    this.mx = canWidth / 2;
    this.my = canHeight / 2;
    this.bgPic = new Image();
    this.bgPic.src = './assets/background.jpg';
    this.bgPic.style.borderRadius = '20px';
    if (isMobile()) {
      this.can1.addEventListener(
        'touchmove',
        (e) => {
          this.onMouseMove(e);
        },
        false
      );
    } else {
      this.can1.addEventListener(
        'mousemove',
        (e) => {
          this.onMouseMove(e);
        },
        false
      );
    }
    this.cxt1.fillStyle = 'white';
    this.cxt1.font = '30px Verdana';
    this.cxt1.textAlign = 'center'; //center/left/right
    this.drawStartBackground(this.cxt2, this.can1.height, this.can1.width);
    // Add event listener for orientation change
    window.addEventListener(
      'orientationchange',
      this.handleOrientationChange.bind(this)
    );
    window.addEventListener('resize', this.handleOrientationChange.bind(this));
    this.startGeneratingRandomMouseCoordinates();
  }

  private getRandomCoordinate(max: number): number {
    const randomValue = Math.floor(Math.random() * max);
    const sign = Math.random() < 0.5 ? -1 : 1;
    return randomValue * sign;
  }

  private generateRandomMouseCoordinates() {
    let randomX = this.mx + this.getRandomCoordinate(150);
    let randomY = this.my + this.getRandomCoordinate(150);

    if (randomX > globalThis.innerWidth || randomX < 0) {
      randomX = this.mx;
    }

    if (randomY > globalThis.innerHeight || randomY < 0) {
      randomY = this.my;
    }

    const event = new MouseEvent('mousemove', {
      clientX: randomX,
      clientY: randomY,
      bubbles: true,
      cancelable: true,
      view: window,
    });

    this.can1.dispatchEvent(event);
  }

  onMouseMove(e: any) {
    if (e.offSetX || e.layerX) {
      this.mx = e.offSetX == undefined ? e.layerX : e.offSetX;
      this.my = e.offSetY == undefined ? e.layerY : e.offSetY;
    }
    // this.stopGeneratingRandomMouseCoordinates();
  }

  private startGeneratingRandomMouseCoordinates() {
    this.randomMouseMoveInterval = setInterval(
      this.generateRandomMouseCoordinates.bind(this),
      1000
    );
  }

  private stopGeneratingRandomMouseCoordinates() {
    if (this.randomMouseMoveInterval !== undefined) {
      clearInterval(this.randomMouseMoveInterval);
      this.randomMouseMoveInterval = undefined;
    }
  }

  private handleOrientationChange() {
    if (window.innerHeight > window.innerWidth) {
      // 竖屏模式
      (
        document.querySelector('.rotate-device') as HTMLDivElement
      ).style.display = 'flex';
    } else {
      // 横屏模式
      (
        document.querySelector('.rotate-device') as HTMLDivElement
      ).style.display = 'none';
    }
  }
  game() {
    this.gameloop();
  }

  gameloop() {
    let now = Date.now();
    this.deltaTime = now - this.lastTime;
    this.lastTime = now;
    if (this.deltaTime > 40) this.deltaTime = 40;
    if (this.deltaTime === 0) this.deltaTime = 40;
    this.drawbackground(
      this.cxt2,
      this.bgPic,
      this.can1.height,
      this.can1.width
    );
    this.ane.draw(this.deltaTime);
    this.fruit.fruitMonitor(this.fruit);
    this.fruit.draw(this.deltaTime);
    this.cxt1.clearRect(0, 0, this.can1.width, this.can1.height);
    this.mom.draw(this.deltaTime, this.my, this.mx);
    this.bady.draw(this.deltaTime);

    momFruitsCollision(this.fruit, this.mom, this.wave, this.gameData);
    momBabyCollision(this.bady, this.mom, this.helo, this.gameData);
    // this.gameData.draw(this.deltaTime);
    this.wave.draw(this.deltaTime);
    this.helo.draw(this.deltaTime);
    this.dust.draw(this.deltaTime);
    requestAnimFrame(() => {
      if (main.gameData.pause) {
        main.cxt1.fillStyle = 'rgba(255,255,255,' + '1' + ')';
        main.cxt1.fillText(
          'Game Pause!',
          main.can1.width / 2,
          main.can1.height / 2
        );
        return;
      }
      this.gameloop();
    });
  }
  private drawbackground(
    cxt2: CanvasRenderingContext2D,
    bgPic: HTMLImageElement,
    canHeight: number,
    canWidth: number
  ) {
    cxt2.drawImage(bgPic, 0, 0, canWidth, canHeight);
  }

  private drawStartBackground(
    cxt2: CanvasRenderingContext2D,
    canHeight: number,
    canWidth: number
  ) {
    if (isMobile()) {
      let startBg = new Image();
      startBg.src = './assets/cover.png';
      cxt2.drawImage(startBg, 0, 0, canWidth, canHeight);
    } else {
      this.drawbackground(
        this.cxt2,
        this.bgPic,
        this.can1.height,
        this.can1.width
      );
      this.ane.draw(this.deltaTime);
      this.fruit.fruitMonitor(this.fruit);
      this.fruit.draw(this.deltaTime);
      this.cxt1.clearRect(0, 0, this.can1.width, this.can1.height);
      this.mom.draw(this.deltaTime, this.my, this.mx);
      this.bady.draw(this.deltaTime);
    }

    let play = new Image();
    play.src = './assets/play.png';
    cxt2.drawImage(
      play,
      (canWidth - play.width) / 2,
      (canHeight - play.height) / 2
    );
  }
}

const gameDialog = document.querySelector('.game-dialog') as HTMLDialogElement;
const gameBtn = document.querySelector('.button') as HTMLButtonElement;

let main = new Main();

if (gameDialog) {
  gameDialog.showModal();
}

gameBtn.addEventListener('click', () => {
  gameDialog.close();
});

// 单击开始
main.can1.addEventListener('click', () => {
  if (!main.gameData.gameStart) {
    main.gameloop();
    main.gameData.gameStart = true;
  }
});

// 左键双击暂停
main.can1.addEventListener('dblclick', function (event) {
  if (main.gameData.gameOver) return;
  main.gameData.pause = !main.gameData.pause;
  if (!main.gameData.pause) {
    main.gameloop();
  }
});
globalThis.onresize = () => {
  let mainReset = new Main();
  mainReset.gameloop();
};
