const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const Clearancescore=5  //定义通关分数
const atlas = new Image()
atlas.src = 'images/Common.png'

export default class GameInfo {
  renderGameScore(ctx, score) {
  
      ctx.fillStyle="#0000ff"
    ctx.font = '20px Arial'
 //分数、通关分数在游戏屏幕上的显示位置
    ctx.fillText(
      `分数: ${score}`,
      10,
      30
    )
    ctx.fillText(
      `通关分数: ${Clearancescore}`,
      10,
      50
    )
  }



  renderGameOver(ctx, score) {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    ctx.fillStyle = '#ffffff'
    ctx.font = '20px Arial'
 /*
对局结束后，根据游戏的分数进行判断
游戏结束，通关分数，重新开始
*/
    
    
   if(score<=Clearancescore){
    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )
    ctx.fillText(
      '重新开始',
      screenWidth/2-40,
      screenHeight/2-100+200
    )
  }
  
    if(score>Clearancescore){
      ctx.fillText(
        '恭喜你通过本关',
        screenWidth/3-10,
        screenHeight/2-100+50
      )
      ctx.fillText(
        '下一关',
        screenWidth/2-40,
        screenHeight/2-100+200
      )
      

     
    }
    ctx.fillText(
      `得分: ${score}`,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )
   
   /*
     重新开始按钮区域
      方便简易判断按钮点击
    */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX: screenWidth / 2 + 50,
      endY: screenHeight / 2 - 100 + 255
    }
  }
}
