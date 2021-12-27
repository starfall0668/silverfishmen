import Sprite from '../base/sprite'
import Hook from './hook'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量的设置
const PLAYER_IMG_SRC = 'images/hero.png'
const PLAYER_WIDTH = 150
const PLAYER_HEIGHT = 120

const databus = new DataBus()

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    // 玩家默认处于屏幕上方居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = 10

    // 用于在手指移动的时候标识手指是否已经在鱼钩上了
    this.touched = false

    this.hooks = []

    // 初始化事件监听
    this.initEvent()
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在鱼钩上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在鱼钩上的布尔值
   */
  checkIsFingerOnMan(x, y) {
    const deviation = 30

    return !!(x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation)
  }

  /**
   * 根据手指的位置设置鱼钩的位置
   * 保证手指处于鱼钩中间
   * 同时限定鱼钩的活动范围限制在屏幕中
   */
  setManPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2
    let disY = y - this.height / 2

    if (disX < 0) disX = 0

    else if (disX > screenWidth - this.width) disX = screenWidth - this.width

    if (disY <= 0) disY = 0

    else if (disY > screenHeight - this.height) disY = screenHeight - this.height

    this.x = disX
    this.y = disY
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变渔夫的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      const x = e.touches[0].clientX
      const y = e.touches[0].clientY

      //
      if (this.checkIsFingerOnMan(x, y)) {
        this.touched = true

        this.setManPosAcrossFingerPosZ(x, y)
      }
    }))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      const x = e.touches[0].clientX
      const y = e.touches[0].clientY

      if (this.touched) this.setManPosAcrossFingerPosZ(x, y)
    }))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      this.touched = false
    }))
  }

  /**
   * 玩家钓鱼操作
   * 钓鱼的时机由外部决定
   */
  shoot() {
    const hook = databus.pool.getItemByClass('hook', Hook)

    hook.init(
      this.x + this.width / 2 - hook.width / 2,
      this.y - 10,
      10
    )

    databus.hooks.push(hook)
  }
}
