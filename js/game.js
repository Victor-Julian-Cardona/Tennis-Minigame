class Game {

    constructor() {
        this.startScreen = document.getElementById('title-screen')
        this.gameContainer = document.getElementById('game-container')
        this.gameScreen = document.getElementById('game-screen')
        this.gameEndScreen = document.getElementById('end-screen')
        this.pScoreElement = document.getElementById("Pscore")
        this.oScoreElement = document.getElementById("Oscore")
        this.side = 'deuce'
        this.player = new Player(this.gameScreen, 750, 610, 100, 20)
        this.height = 700
        this.width = 1228
        this.playerScore = 0
        this.opponentScore = 0
        this.gameIsOver = false
        this.frames = 0
        this.stats = document.getElementById('stats-container')
        this.endMessage = document.getElementById('end-message')
        this.opponentElement = document.createElement('div')
        this.opponentLeft = 510
        this.opponentVelocity = 3
        this.opponentElement.id = 'opponent'
        this.ball = new Ball(this.gameScreen, this.player.element, this.opponentElement, 'deuce')
        this.gameScreen.appendChild(this.opponentElement)
        this.netBall = false
        this.longBall = false
    }

    start() {
        console.log("Starting")
        this.gameContainer.style.display = 'flex'
        this.gameScreen.style.height = `${this.height}px`
        this.gameScreen.style.width = `${this.width}px`
        this.gameEndScreen.style.display = 'none'
        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'inherit'
        this.stats.style.display = 'block'
        this.opponentElement.style.top = '100px'
        this.opponentElement.style.left = `${this.opponentLeft}px`
        this.opponentElement.style.width = '200px'
        this.opponentElement.style.height = '20px'
        this.gameLoop()
    }

    gameLoop() {

        if (this.gameIsOver) {
            return
        }

        this.frames++

        this.opponentLeft += this.opponentVelocity
        this.opponentElement.style.left = `${this.opponentLeft}px`

        if (this.opponentLeft + 200 >= 921) {
            this.opponentVelocity *= -1
        }

        if (this.opponentLeft <= 307) {
            this.opponentVelocity *= -1
        }

        this.player.move()
        this.ball.move()

        if (this.frames % 60) {
            this.ball.inPlay()
        }

        if (this.ball.top > this.height - 70 || this.ball.top <= 105) {

            console.log("out")

            if (this.side == 'deuce') {
                console.log("it was deuce")
                this.ball.element.remove()
                this.ball = new Ball(this.gameScreen, this.player.element, this.opponentElement, 'ad')
                this.player.element.remove()
                this.player = new Player(this.gameScreen, 380, 610, 100, 20)
                this.side = 'ad'
            }
            else {
                console.log('it was ad')
                this.ball.element.remove()
                this.ball = new Ball(this.gameScreen, this.player.element, this.opponentElement, 'deuce')
                this.player.element.remove()
                this.player = new Player(this.gameScreen, 750, 610, 100, 20)
                this.side = 'deuce'
            }

        }

        window.requestAnimationFrame(() => this.gameLoop())

    }
}