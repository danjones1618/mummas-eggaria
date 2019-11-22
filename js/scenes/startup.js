// startup scene
class StartupScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: "StartupScene" , active: true})
    }

    preload()
    {
        //this.load.image("startup-logo", "/res/")
    }

    init()
    {
        // this is the global game "state"
        this.state =
        {
            orders: [],
            customers: []
        }
    }

    create()
    {
        //var graphics = this.add.graphics()
        //graphics.fillStyle(0xccf5ff, 1)
        //graphics.fillRect(0, 0, this.game.config.width, this.game.config.height)

        this.scene.launch("OrderScene", this.state)
    }
}
