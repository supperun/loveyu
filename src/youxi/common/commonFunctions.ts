//刷新程序
export let requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    function (
      /* function FrameRequestCallback */ callback: TimerHandler,
      /* DOMElement Element */ element: any
    ) {
      return window.setTimeout(callback, 1000 / 60)
    }
  )
})()

export function calLength2(x1: number, y1: number, x2: number, y2: number) {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
}

export function lerpAngle(a: number, b: number, t: number) {
  let d = b - a
  if (d > Math.PI) d = d - 2 * Math.PI
  if (d < -Math.PI) d = d + 2 * Math.PI
  return a + d * t
}

export function lerpDistance(aim: number, cur: number, ratio: number) {
  let delta = cur - aim
  return aim + delta * ratio
}

export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  l: number
) {
  let x = Math.abs(x1 - x2)
  let y = Math.abs(y1 - y2)
  if (x < l && y < l) {
    return true
  }
  return false
}
