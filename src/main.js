var animate =
    window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) { window.setTimeout(callback, 1000 / FPS) }

var canvas = document.createElement('canvas')
canvas.width = WIDTH
canvas.height = HEIGHT
var context = canvas.getContext('2d')

window.onload = function () {
    if (!isCanvasSupported()) {
        print("No support for <canvas>")
        return
    }

    document.body.appendChild(canvas)
    animate(step)
}

// Input handling
var keysDown = {}

window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true
})

window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode]
})

// Checks canvas support
function isCanvasSupported() {
    var elem = document.createElement('canvas')
    return !!(elem.getContext && elem.getContext('2d'))
}


// Game states
var stateRoam = "Roam"
var stateBattle = "Battle"

// Game loop
var player = new Player(7, 12)
var map = new Map(new Map1())
var pokemon1 = new Pokemon(new Squirtle(7))
var battle

var step = function () {
    update()
    render()
    animate(step)
}

var update = function () {
    if (MODE === stateRoam) {
        map.update()
        player.update(map)
    } else if (MODE === stateBattle) {
        battle.update()
    }
}

var render = function () {
    context.beginPath()
    context.fillStyle = "#D3ECE5"
    context.fillRect(0, 0, WIDTH, HEIGHT)

    if (MODE === stateRoam) {
        if (GRAPHICS === "false") {
            map.render(player.x, player.y)
            player.render()
        } else {
            player.render()
            map.render(player.x, player.y)
        }
    } else if (MODE === stateBattle) {
        battle.render()
    }
}
