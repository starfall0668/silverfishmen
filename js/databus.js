import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if (instance) return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.frame = 0
    this.score = 0
    this.hooks = []
    this.fishs = []
    this.animations = []
    this.gameOver = false
  }

  /**
   * 回收鱼，进入对象池
   * 此后不进入帧循环
   */
  removeFishs(fish) {
    const temp = this.fishs.shift()

    temp.visible = false

    this.pool.recover('fish', fish)
  }

  /**
   * 回收鱼钩，进入对象池
   * 此后不进入帧循环
   */
  removeHooks(hook) {
    const temp = this.hooks.shift()

    temp.visible = false

    this.pool.recover('hook', hook)
  }
}

