// order scene
class OrderScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: "OrderScene" })
    }

    init()
    {
        console.log("order::init")
        this.worldWidth = 640
        this.worldHeight = 480*3
    }

    preload()
    {
        console.log("order::init")
        this.load.image("main_background", "/res/scenes/main_scene.png")
        //this.cameras.default
    }

    create()
    {
        console.log("order::init")
        //this.physics.startSystem(Phaser.Physics.ARCADE)
        //var backgroundImage = this.cache.getImage("main_background")
        this.background = this.add.sprite(
            this.worldWidth / 2, this.worldHeight / 2, //x, y
            "main_background"
        )

        this.cameras.default.setViewport(0, 0, 640, 480*3)
    }

    // called every frame
    update()
    {
        
        //this.cameras.default.scrollY = 0.05
    }

    createOrderSprites()
    {
        // create sprites for all the orders
    }
}
