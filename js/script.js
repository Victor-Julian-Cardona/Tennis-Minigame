window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const defeatImage = document.getElementById("defeat")
    const victoryImage = document.getElementById("victory")

    let game

    startButton.addEventListener("click", function () {
        game = new Game()
        startGame();
    });

    restartButton.addEventListener("click", function () {
      victoryImage.style.display = 'none'
      defeatImage.style.display = 'none'
        game = new Game()
        startGame();
    });

    function startGame() {
        console.log("start game");
        game.start()
    }


    document.addEventListener('keydown', (e) => {

      if (game) {

        if (e.key === 'ArrowLeft') {
          if (game.player.directionX > -4) {
            game.player.directionX -= 1
          }
  
        }
  
        if (e.key === 'ArrowRight') {
          if (game.player.directionX < 4) {
            game.player.directionX += 1
          }
        }
  
        if (e.key === ' ') {
          if (game.ball.directionY == 0) {
            game.ball.serveBall()
          }
        }


      }
      
  
  
      })


}