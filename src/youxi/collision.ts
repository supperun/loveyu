import { Bady } from './bady'
import { calLength2 } from './utils'
import { Fruit } from './fruit'
import { GameData } from './gameData'
import { Helo } from './helo'
import { Mom } from './mom'
import { Wave } from './wave'

//判断大鱼和果实的距离
export function momFruitsCollision(
  fruit: Fruit,
  mom: Mom,
  wave: Wave,
  gameData: GameData
) {
  if (gameData.gameOver) return
  for (let i = 0; i < fruit.num; ++i) {
    if (fruit.alive[i]) {
      //calculate length
      let l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y)
      if (l < 900) {
        //fruit eaten
        fruit.dead(i)
        gameData.fruitNum++
        mom.bigBodyCount++
        if (mom.bigBodyCount > 7) mom.bigBodyCount = 7
        if (fruit.fruitType[i] == 'blue') {
          //blue
          gameData.double = 2
        }
        wave.born(fruit.x[i], fruit.y[i])
      }
    }
  }
}
//mom baby collision
export function momBabyCollision(
  baby: Bady,
  mom: Mom,
  helo: Helo,
  gameData: GameData
) {
  if (gameData.gameOver || gameData.fruitNum <= 0) return
  let l = calLength2(mom.x, mom.y, baby.x, baby.y)

  if (l < 900) {
    //baby recover
    baby.babyBodyCount = 0
    //data=>0;
    mom.bigBodyCount = 0
    //score update
    gameData.addScore()
    //draw halo
    helo.born(baby.x, baby.y)
  }
}
