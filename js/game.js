class Game {

    constructor() {
        this.startScreen = document.getElementById('title-screen')
        this.gameContainer = document.getElementById('game-container')
        this.gameScreen = document.getElementById('game-screen')
        this.gameEndScreen = document.getElementById('end-screen')
        this.pScoreElement = document.getElementById("Pscore")
        this.oScoreElement = document.getElementById("Oscore")
        this.defeatImage = document.getElementById('defeat')
        this.victoryImage = document.getElementById('victory')
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
        this.playerScoreChanged = false
        this.opponentScoreChanged = false
        this.deuce = false
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

        if (this.ball.top < 350 && this.ball.isOut) {
            
            this.opponentScore++
            this.opponentScoreChanged = true
            this.ball.isOut = false

            if (this.side == 'deuce') {
                console.log("it was deuce")
                this.player.element.remove()
                this.player = new Player(this.gameScreen, 380, 610, 100, 20)
                this.ball.element.remove()
                this.ball = new Ball(this.gameScreen, this.player.element, this.opponentElement, 'ad')
                this.side = 'ad'
            }
            else {
                console.log('it was ad')
                this.player.element.remove()
                this.player = new Player(this.gameScreen, 750, 610, 100, 20)
                this.ball.element.remove()
                this.ball = new Ball(this.gameScreen, this.player.element, this.opponentElement, 'deuce')
                this.side = 'deuce'
            }

        }

        if (this.ball.top > this.height - 70 || this.ball.top <= 105) {

            if (this.ball.top > this.height - 70) {
                console.log('opponent scored')
                this.opponentScore++
                this.opponentScoreChanged = true
            }
            if (this.ball.top <= 105) {
                console.log('player scored')
                this.playerScore++
                this.playerScoreChanged = true
            }

            console.log("out")

            if (this.side == 'deuce') {
                console.log("it was deuce")
                this.player.element.remove()
                this.player = new Player(this.gameScreen, 380, 610, 100, 20)
                this.ball.element.remove()
                this.ball = new Ball(this.gameScreen, this.player.element, this.opponentElement, 'ad')
                this.side = 'ad'
            }
            else {
                console.log('it was ad')
                this.player.element.remove()
                this.player = new Player(this.gameScreen, 750, 610, 100, 20)
                this.ball.element.remove()
                this.ball = new Ball(this.gameScreen, this.player.element, this.opponentElement, 'deuce')
                this.side = 'deuce'
            }

        }

        if ((this.playerScoreChanged || this.opponentScoreChanged) && !this.deuce) {
            if (this.opponentScore == 1) {
                this.oScoreElement.innerHTML = '15'
            }
            if (this.playerScore == 1) {
                this.pScoreElement.innerHTML = '15'
            }
            if (this.opponentScore == 2) {
                this.oScoreElement.innerHTML = '30'
            }
            if (this.playerScore == 2) {
                this.pScoreElement.innerHTML = '30'
            }
            if (this.opponentScore == 3) {
                this.oScoreElement.innerHTML = '40'
            }
            if (this.playerScore == 3) {
                this.pScoreElement.innerHTML = '40'
            }
            if (this.opponentScore == 4) {
                this.gameIsOver = true
            }
            if (this.playerScore == 4) {
                this.gameIsOver = true
            }
            if(this.opponentScore == 3 && this.playerScore == 3) {
                this.deuce = true
            }
            this.opponentScoreChanged = false
            this.playerScoreChanged = false
        }

        if (this.deuce) {
            if (this.opponentScoreChanged && (this.opponentScore-1 == this.playerScore)) {
                console.log('a')
                this.oScoreElement.innerHTML = 'adv'
            }
            else if (this.playerScoreChanged && (this.opponentScore == this.playerScore-1)) {
                console.log('b')
                this.pScoreElement.innerHTML = 'adv'
            }
            else if (this.opponentScoreChanged && this.pScoreElement.innerHTML == 'adv') {
                console.log('c')
                this.pScoreElement.innerHTML = '40'
            }
            else if (this.playerScoreChanged && this.oScoreElement.innerHTML == 'adv') {
                console.log('d')
                this.oScoreElement.innerHTML = '40'
            }
            else if (this.playerScoreChanged && this.pScoreElement.innerHTML == 'adv') {
                console.log('e')
                this.gameIsOver = true
            }
            else if (this.opponentScoreChanged && this.oScoreElement.innerHTML == 'adv') {
                console.log('f')
                this.gameIsOver = true
            }

            this.opponentScoreChanged = false
            this.playerScoreChanged = false
        }

        window.requestAnimationFrame(() => this.gameLoop())

        if (this.gameIsOver) {
            this.gameOver()
        }
    }

    gameOver() {
        console.log("Game over")
        this.player.element.remove()
        this.opponentElement.remove()
        this.ball.element.remove()
        this.gameScreen.style.display = 'none'
        this.stats.style.display = 'none'
        this.gameEndScreen.style.display = 'inherit'
        //this.gameEndScreen.style.flexDirection = 'column'
        this.gameContainer.style.display = 'none'
        if (this.playerScore > this.opponentScore) {
            console.log("Won")
            this.victoryImage.style.display = 'block'
            this.endMessage.innerText = 'Game, Set, Match! You Won!'
            // this.endMessage.style.height = '40px'
            // this.endMessage.style.width = '100px'
        } else {
            console.log("Lost")
            this.defeatImage.style.display = 'block'
            this.endMessage.innerText = 'Game, Set, Match! You Lost!'
            // this.endMessage.style.height = '40px'
            // this.endMessage.style.width = '100px'
        }
    }

}