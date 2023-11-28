window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");

    let game

    startButton.addEventListener("click", function () {
        game = new Game()
        startGame();
    });

    restartButton.addEventListener("click", function () {
        game = new Game()
        startGame();
    });

    function startGame() {
        console.log("start game");
        game.start()
    }


    document.addEventListener('keydown', (e) => {
      
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
          if (game.ball.directionY == 1) {
            game.ball.checkShot()
          }
        }
  
  
      })


}