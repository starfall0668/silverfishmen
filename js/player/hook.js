import Sprite from '../base/sprite'
import DataBus from '../databus'

const HOOK_IMG_SRC = 'images/hook.png'
const HOOK_WIDTH = 40
const HOOK_HEIGHT = 40

const __ = {
  speed: Symbol('speed')
}

const databus = new DataBus()

export default class Hook extends Sprite {
  constructor() {
    super(HOOK_IMG_SRC, HOOK_WIDTH, HOOK_HEIGHT)
  }

  init(x, y, speed) {
    this.x = x-40
    this.y = y+50

    this[__.speed] = speed

    this.visible = true
  }

  // 每一帧更新鱼钩位置
  update() {
    this.y += this[__.speed]

    // 超出屏幕外回收鱼钩
    if (this.y > 500) for(1;this.y < 10;) {this.y -= this[__.speed]}
  }
}
