

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

basic.forever(function () {
    refresh(dData)
    console.log(dData[0])

})



let blockFalling: boolean = false
let height: number = 5


function block(display: Display):void {
    blockFalling = true
    let x: number = 2
    for (let y: number = 0; y < height; y++) {
 
        if (input.buttonIsPressed(Button.A)) {
            x -=1
            display [y-1][x+1] = false
        }
        if (input.buttonIsPressed(Button.B)) {
            x +=1
            display [y-1][x-1] = false
        }
        display[y][x] = true
        if (y >= 1) {
            display [y-1][x] = false
        }
        basic.pause(1000)
    }
    blockFalling = false
}



basic.forever(function() {
    
if (!blockFalling) {
    block(dData)
}



})