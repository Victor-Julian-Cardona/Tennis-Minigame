class Player {

    constructor(gameScreen, left, top, width, height) {
        this.gameScreen = gameScreen
        this.left = left
        this.top = top
        this.width = width
        this.height = height
        this.directionX = 0
        this.element = document.createElement('div')
        this.element.style.position = 'absolute'
        this.element.style.height = `${this.height}px`
        this.element.style.width = `${this.width}px`
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
        this.element.style.backgroundColor = 'black'
        this.gameScreen.appendChild(this.element)
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
}