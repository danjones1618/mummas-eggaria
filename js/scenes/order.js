// order scene
class OrderScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: "OrderScene" , active: true})
    }

    preload()
    {
        
    }

    create()
    {
        var graphics = this.add.graphics()
        graphics.fillStyle(0xccf5ff, 1)
        graphics.fillRect(0, 0, this.game.config.width, this.game.config.height)
    }
}
