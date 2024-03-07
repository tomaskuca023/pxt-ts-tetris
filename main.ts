

type Piece = {
    x: number,
    y: number
}

type Row = Array<boolean>
type Display = Array<Row>

const dData: Display = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
]
const dot: Piece = {
    x: 2, y: 0
}

function refresh(display: Display):void {
    for(let y: number = 0; y < 5; y++) {
        for (let x: number = 0; x < 5; x++) {
            if (display[y][x]) {
                led.plot(x,y)
            }
            else {
                led.unplot(x,y)
            }
        }
    }
}

let pieceExists: boolean = false

function pieceMovement(display: Display, piece: Piece):void {
    pieceExists = true
    if (input.buttonIsPressed(Button.A)) {
        display[piece.y][piece.x] = false
        piece.x -= 1
        display[piece.y][piece.x] = true
        basic.pause(100)
    }
    if (input.buttonIsPressed(Button.B)) {
        display[piece.y][piece.x] = false
        piece.x += 1
        display[piece.y][piece.x] = true
        basic.pause(100)
    }
    for (let i: number = 0; i < 5; i++) {
        display[piece.y][piece.x] = false
        piece.y += 1
        display[piece.y][piece.x] = true
        basic.pause(1000)
    }
    pieceExists = false
}


basic.forever(function () {
    refresh(dData)
    if (!pieceExists){
        pieceMovement(dData, dot)
    }

})