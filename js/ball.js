class Ball {

    constructor(gameScreen, player, opponent, side) {
        this.gameScreen = gameScreen
        this.player = player
        this.opponent = opponent
        this.side = side
        if (this.side == 'deuce') {
            this.left = 785
        }
        else {
            this.left = 425
        }
        this.top = 560
        this.width = 35
        this.height = 35
        this.directionX = 0
        this.directionY = 0
        this.courtSide = 'player'
        this.element = document.createElement('div')
        this.element.style.position = 'absolute'
        this.element.style.height = `${this.height}px`
        this.element.style.width = `${this.width}px`
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
        this.element.style.backgroundColor = 'black'
        this.element.style.borderRadius = "50%"
        this.gameScreen.appendChild(this.element)
        this.swung = false
    }

    move() {
        this.left += this.directionX
        this.top += this.directionY
        this.updatePosition()
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }

    inPlay() {
        let player = this.player.getBoundingClientRect()
        let opponent = this.opponent.getBoundingClientRect()
        let ball = this.element.getBoundingClientRect()

        //console.log("Ball properties", ball)

        if (ball.top <= opponent.bottom &&
            ball.left <= opponent.right &&
            ball.right >= opponent.left
            ) {
            this.top += 10
            this.directionY *= -1
            this.swung = false
            if (ball.left < opponent.left + opponent.width/2) {
                this.directionX = -0.4
            } else {
                this.directionX = 0.4
            }

            this.courtSide = 'opponent'

            // this.directionX *= -1
            console.log("PASSED****")
            
        }

        if (ball.bottom >= player.top &&
            ball.right >= player.left &&
            ball.left <= player.right
            ) {
            this.top -= 10
            this.directionY *= -1
            this.swung = true
            if (ball.left < player.left + player.width/2) {
                this.directionX = -0.4
            } else {
                this.directionX = 0.4
            }

            this.courtSide = 'player'

            // this.directionX *= -1
            console.log("PASSED****")

        }

        
    }

    serveBall() {
        if (this.side == 'deuce') {
            this.directionX = -.6
            this.directionY = -1
        }
        else {
            this.directionX = .6
            this.directionY = -1
        }
    }

    // checkShot() {
    //     console.log("swing")

    //     let tennisBall = this.element.getBoundingClientRect()

    //     if (tennisBall.bottom > 500 && !this.swung) {
    //         let strikePoint = 750 - tennisBall.bottom

    //         if (strikePoint > 50 && !this.swung) {
    //             console.log('long')
    //             this.swung = true
    //             return 'long'
    //         }
    //         else if (strikePoint < 10 && !this.swung) {
    //             console.log('net')
    //             this.swung = true
    //             return 'net'
    //         }
    //         else if (!swung) {
    //             console.log('good')
    //             this.swung = true
    //             return 'good'
    //         }
    //     }
    // }
}