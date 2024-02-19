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

refresh(dData)


