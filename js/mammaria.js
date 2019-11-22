// main game

var config =
{
    type: Phaser.AUTO,
    parent: "content",
    width: 1280,
    height: 720,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
    scene: [
        StartupScene
    ]
}

var game = new Phaser.Game(config)
