type Piece = { x: number, y: number }
type Row = Array<boolean>
type Display = Array<Row>
music.setVolume(100)
const dData: Display = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
]

const dot: Piece = { x: 2, y: 0 }
let speed: number = 500;

function refresh(display: Display, dot: Piece): void {
    for (let y = 0; y < 5; y += 1)
        for (let x = 0; x < 5; x += 1)
            if (display[y][x]) led.plot(x, y)
            else led.unplot(x, y);
    if (!gameOver) {
        led.plot(dot.x, dot.y)     
    }
}
let filled: number = 0
let score: number = 0
let level: number = 0
let gameOver: boolean = false
let scoreMenu: boolean = false
basic.forever(function () {
    if (!gameOver) {
        refresh(dData, dot)
        if (dot.y <= 3 && dData[dot.y + 1][dot.x]) {
            dData[dot.y][dot.x] = true
            dot.y = -1
            dot.x = 2
        }
        if (dot.y == 4) {
            dData[dot.y][dot.x] = true
            dot.y = -1
            dot.x = 2
        }
        dot.y = (dot.y + 1) % 5
        if (dData[4][0] && dData[4][1] && dData[4][2] && dData[4][3] && dData[4][4]) {
            for (let i: number = 0; i < 5; i++) {
                dData[4][i] = false
                dData[4][i] = dData[3][i]
                dData[3][i] = dData[2][i]
                dData[2][i] = dData[1][i]
                dData[1][i] = dData[0][i]
                dData[0][i] = false
            }
            score += 1
        }
        for (let i: number = 0; i < dData.length; i++) {
            if (dData[0][i]) {
            if (!gameOver) {
                basic.showLeds(`
                . # . # .
                . # . # .
                . . . . .
                . # # # .
                # . . . #
                `)
            }
            
            gameOver = true}
        
        }
        level = score
        if (level > 19) level = 19
        console.log(score)
        console.log(speed-(level*25))
        console.log(scoreMenu)
        basic.pause(speed - (level * 25))
    }
    if (gameOver) {
        if (scoreMenu) {
            basic.showNumber(score)
        }
        else refresh(dData, dot)
    }
})
input.onButtonPressed(Button.A, function () {
    if (!gameOver) {
        if (dot.x > 0) {
            dot.x -= 1
            refresh(dData, dot)
        }
        if (dData[dot.y][dot.x]) {
            dot.x += 1
        }
    }
    else {
        if (scoreMenu) scoreMenu = false
        else scoreMenu = true
    }
})
input.onButtonPressed(Button.B, function () {
    if (!gameOver) {
        if (dot.x < 4) {
            dot.x += 1
            refresh(dData, dot)
        }
        if (dData[dot.y][dot.x]) {
            dot.x -= 1
        }
    }
    else {
        filled = 0
        score = 0
        level = 0
        dot.x = 2
        dot.y = 0
        gameOver = false
        scoreMenu = false
        for (let y = 0; y < 5; y += 1)
            for (let x = 0; x < 5; x += 1)
                dData[y][x] = false
    }
})