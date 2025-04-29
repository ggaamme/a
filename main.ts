// Recolectar estrella
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (jugador, estrella) {
    estrella.destroy()
    info.changeScoreBy(1)
})
let estrella: Sprite = null
let jugador = sprites.create(img`
    . . . . f f f f . . . . 
    . . f f e e e e f f . . 
    . f f e e e e e e f f . 
    f f f f e e e e f f f f 
    f f e 4 4 e e 4 4 e f f 
    f e e 4 4 e e 4 4 e e f 
    f f e e e e e e e e f f 
    f f f 4 4 4 4 4 4 f f f 
    . f f 4 4 4 4 4 4 f f . 
    . . f f f f f f f f . . 
    . . . f f . . f f . . . 
    . . . f f . . f f . . . 
    `, SpriteKind.Player)
controller.moveSprite(jugador)
jugador.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(3)
// Crear estrellas cada 1000ms
game.onUpdateInterval(1000, function () {
    estrella = sprites.create(img`
        . . 5 . . 
        . 5 5 5 . 
        5 5 5 5 5 
        . 5 5 5 . 
        . . 5 . . 
        `, SpriteKind.Food)
    estrella.setPosition(randint(0, 160), 0)
    estrella.setVelocity(0, 50)
})
// Perder vida si estrella se cae
forever(function () {
    for (let estrella2 of sprites.allOfKind(SpriteKind.Food)) {
        if (estrella2.y > 120) {
            estrella2.destroy()
            info.changeLifeBy(-1)
        }
    }
})
// Condiciones de ganar o perder
forever(function () {
    if (info.score() == 10) {
        game.over(true, effects.confetti)
    }
    if (info.life() == 0) {
        game.over(false, effects.dissolve)
    }
})
