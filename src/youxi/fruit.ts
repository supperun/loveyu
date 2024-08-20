import { Ane } from './ane'
import { draw } from './common'

export class Fruit implements draw {
  num = 30
  alive: boolean[] = [] //bool
  orange = new Image()
  blue = new Image()
  x: number[] = []
  y: number[] = []
  l: number[] = []
  speed: number[] = []
  aneid: number[] = []
  fruitType: string[] = []
  cxt2: CanvasRenderingContext2D
  ane: Ane
  constructor(cxt2: CanvasRenderingContext2D, ane: Ane) {
    this.ane = ane
    this.cxt2 = cxt2
    this.init()
  }
  private init() {
    for (let i = 0; i < this.num; i++) {
      this.alive[i] = false
      this.x[i] = 0
      this.y[i] = 0
      this.l[i] = 0
      this.speed[i] = Math.random() * 0.017 + 0.003
      this.aneid[i] = -1
      this.fruitType[i] = ''
    }
    this.orange.src = './assets/fruit.png'
    this.blue.src = './assets/blue.png'
  }
  draw(deltaTime: number): void {
    this.cxt2.save()
    for (let i = 0; i < this.num; ++i) {
      //draw fruit
      //find an ane, grow, fly up
      //delta每两帧之间的时间间隔
      if (this.alive[i]) {
        let pic = this.fruitType[i] == 'blue' ? this.blue : this.orange

        if (this.l[i] <= 14) {
          //grouw
          this.l[i] += this.speed[i] * deltaTime
          this.x[i] = this.ane.headx[this.aneid[i]]
          this.y[i] = this.ane.heady[this.aneid[i]]
        } else {
          this.y[i] -= this.speed[i] * 6 * deltaTime
        }
        this.cxt2.drawImage(
          pic,
          this.x[i] - this.l[i] * 0.5,
          this.y[i] - this.l[i] * 0.5,
          this.l[i],
          this.l[i]
        )
        if (this.y[i] < 10) {
          this.alive[i] = false
        }
        if (this.y[i] < this.ane.heady[this.aneid[i]] - 10) {
          this.ane.isExisted[this.aneid[i]] = false
          this.aneid[i] = -1
        }
      }
      this.cxt2.stroke()
    }
    this.cxt2.restore()
  }
  dead(i: number) {
    this.alive[i] = false
    if (this.aneid[i] != -1) {
      this.ane.isExisted[this.aneid[i]] = false
      this.aneid[i] = -1
    }
  }
  born(i: number) {
    let aneid
    while (1) {
      aneid = Math.floor(Math.random() * this.ane.num)
      if (this.ane.isExisted[aneid] == false) {
        this.ane.isExisted[aneid] = true
        break
      }
    }
    this.aneid[i] = aneid as number
    this.l[i] = 0
    this.alive[i] = true
    let ran = Math.random()
    this.fruitType[i] = ran > 0.1 ? 'orange' : 'blue'
  }
  fruitMonitor(fruit: Fruit) {
    /* body... */
    let num = 0
    for (let i = 0; i < this.num; i++) {
      if (fruit.alive[i]) num++
    }
    if (num < 15) {
      //send fruit;
      this.sendFruit(fruit)
      return
    }
  }
  private sendFruit(fruit: Fruit) {
    for (let i = 0; i < fruit.num; i++) {
      if (!fruit.alive[i]) {
        fruit.born(i)
        return
      }
    }
  }
}
