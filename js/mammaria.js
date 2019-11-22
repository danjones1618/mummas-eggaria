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
                y: 0,
                x: 0
            }
        }
    },
    scene: OrderScene,
    disableContextMenu: true
}

var game = new Phaser.Game(config)
