import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg.jpg'
const BG_WIDTH = 512
const BG_HEIGHT = 1000

/*
游戏背景
使用update和render函数实现无限滚动的背景功能
*/
 
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.left = 0

    this.render(ctx)
  }

  update() {
    this.lef += 2

    if (this.left >= screenWidth) this.left = 0
  }

/*
 背景图重绘函数
 绘制两张图片，图片的大小与屏幕大小相同
*/
  render(ctx) {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      screenHeight,
      -screenWidth+ this.left,
      screenHeight
    )

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      this.left,
      screenWidth,
      screenHeight
    )
  }
}
