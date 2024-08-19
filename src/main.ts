import './global.css'
import '../public/favicon.ico'
import { momFruitsCollision, momBabyCollision } from './youxi/collision'
import { requestAnimFrame } from './youxi/common/commonFunctions'
import { Ane } from './youxi/ane'
import { Fruit } from './youxi/fruit'
import { Mom } from './youxi/mom'
import { GameData } from './youxi/gameData'
import { Bady } from './youxi/bady'
import { Helo } from './youxi/helo'
import { Wave } from './youxi/wave'
import { Dust } from './youxi/dust'
require.context('./assets', false)

class Main {
  gameData: GameData
  ane: Ane
  fruit: Fruit
  mom: Mom
  bady: Bady
  wave: Wave
  helo: Helo
  dust: Dust
  can1 = document.getElementById('canvas1') as HTMLCanvasElement
  can2 = document.getElementById('canvas2') as HTMLCanvasElement //backgroun.ane,fruits
  cxt1 = this.can1.getContext('2d') as CanvasRenderingContext2D
  cxt2 = this.can2.getContext('2d') as CanvasRenderingContext2D

  my: number = 0
  mx: number = 0
  bgPic: HTMLImageElement
  lastTime: number = Date.now()
  deltaTime: number = 0

  constructor() {
    let canWidth = this.can1.width
    let canHeight = this.can1.height
    this.gameData = new GameData(this.cxt1, canHeight, canWidth)
    this.ane = new Ane(this.cxt2, canHeight)
    this.fruit = new Fruit(this.cxt2, this.ane)
    this.mom = new Mom(this.cxt1, this.gameData, canHeight, canWidth)
    this.bady = new Bady(
      this.cxt1,
      this.mom,
      this.gameData,
      canHeight,
      canWidth
    )
    this.wave = new Wave(this.cxt1)
    this.helo = new Helo(this.cxt1)
    this.dust = new Dust(this.cxt1, canHeight, canWidth)
    this.mx = canWidth / 2
    this.my = canHeight / 2
    this.bgPic = new Image()
    this.bgPic.src = './assets/background.jpg'
    this.bgPic.style.borderRadius = '20px'
    this.can1.addEventListener(
      'mousemove',
      (e) => {
        this.onMouseMove(e)
      },
      false
    )
    this.cxt1.fillStyle = 'white'
    this.cxt1.font = '30px Verdana'
    this.cxt1.textAlign = 'center' //center/left/right
  }
  game() {
    this.gameloop()
  }
  private onMouseMove(e: any) {
    if (this.gameData.gameOver) return
    if (e.offSetX || e.layerX) {
      this.mx = e.offSetX == undefined ? e.layerX : e.offSetX
      this.my = e.offSetY == undefined ? e.layerY : e.offSetY
    }
  }

  private gameloop() {
    let now = Date.now()
    this.deltaTime = now - this.lastTime
    this.lastTime = now
    if (this.deltaTime > 40) this.deltaTime = 40
    this.drawbackground(
      this.cxt2,
      this.bgPic,
      this.can1.height,
      this.can1.width
    )
    this.ane.draw(this.deltaTime)
    this.fruit.fruitMonitor(this.fruit)
    this.fruit.draw(this.deltaTime)
    this.cxt1.clearRect(0, 0, this.can1.width, this.can1.height)

    this.mom.draw(this.deltaTime, this.my, this.mx)
    this.bady.draw(this.deltaTime)
    momFruitsCollision(this.fruit, this.mom, this.wave, this.gameData)
    momBabyCollision(this.bady, this.mom, this.helo, this.gameData)
    this.gameData.draw(this.deltaTime)
    this.wave.draw(this.deltaTime)
    this.helo.draw(this.deltaTime)
    this.dust.draw(this.deltaTime)
    requestAnimFrame(() => this.gameloop()) //setInterval, setTimeout
  }
  private drawbackground(
    cxt2: CanvasRenderingContext2D,
    bgPic: HTMLImageElement,
    canHeight: number,
    canWidth: number
  ) {
    cxt2.drawImage(bgPic, 0, 0, canWidth, canHeight)
  }
}

const gameDialog = document.querySelector('.game-dialog') as HTMLDialogElement
const gameBtn = document.querySelector('.button') as HTMLButtonElement

let main = new Main()
if (gameDialog) {
  gameDialog.showModal()
}
gameBtn.addEventListener('click', () => {
  main.game()
  gameDialog.close()
})
