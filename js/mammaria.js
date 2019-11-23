// main game

// set to true to skip startup scene
const skipToGame = false

var config =
{
    type: Phaser.CANVAS,
    parent: "content",
    width: 640,
    height: 480,
    render:
    {
        pixelArt: true,
        powerPreference: "high-performance"
    },
    physics:
    {
        default: "arcade",
        arcade:
        {
            gravity:
            {
                y: 0,
                x: 0
            }
        }
    },
    scene: skipToGame ? GameScene : [StartupScene, GameScene], 
    disableContextMenu: true
}

var game = new Phaser.Game(config)
