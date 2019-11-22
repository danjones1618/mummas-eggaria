// startup scene
class StartupScene extends Phaser.Scene
{
    constructor()
    {
        super()
    }

    preload()
    {
        //this.load.image("startup-logo", "/res/")
    }

    create()
    {
        this.scene.start("OrderScene")
    }
}
