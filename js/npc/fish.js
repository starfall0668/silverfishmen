import Animation from '../base/animation'
import DataBus from '../databus'

const FISH_IMG_SRC = 'images/fish.png'
const FISH_WIDTH = 60
const FISH_HEIGHT = 60

const __ = {
  speed: Symbol('speed')
}

const databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Fish extends Animation {
  constructor() {
    super(FISH_IMG_SRC, FISH_WIDTH, FISH_HEIGHT)

    this.initDeadAnimation()
  }
   //鱼的出现及速度
  init(speed) {
    this.x = 360
    this.y = rnd(120, window.innerHeight - FISH_HEIGHT)

    this[__.speed] = 5

    this.visible = true
  }

  // 预定义捕获的帧动画
  initDeadAnimation() {
    const frames = []

    const EXPLO_IMG_PREFIX = 'images/dead'
    const EXPLO_FRAME_COUNT = 9

    for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
      frames.push(`${EXPLO_IMG_PREFIX + (i + 1)}.png`)
    }

    this.initFrames(frames)
  }

  // 每一帧更新鱼钩位置
  update() {
    this.x -= this[__.speed]

    // 对象回收
    if (this.y > window.innerHeight + this.height) databus.removeEnemey(this)
  }
}
