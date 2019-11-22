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

    create()
    {
        var graphics = this.add.graphics()
        graphics.fillStyle(0xeef5ff, 1)
        graphics.fillRect(0, 0, this.game.world.width, this.game.world.height)

        this.scene.add("OrderScene", OrderScene, true)
        this.scene.add("PlatingScene", PlatingScene, true)
        this.scene.add("CookingScene", CookingScene, true)

        this.scene.launch("OrderScene")
    }
}
