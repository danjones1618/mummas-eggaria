// main game

var config =
{
    type: Phaser.AUTO,
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
                y: 0
            }
        }
    },
    scene: [StartupScene, OrderScene, PlatingScene, CookingScene],
    disableContextMenu: true
}

var game = new Phaser.Game(config)
