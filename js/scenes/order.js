// order scene
class OrderScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: "OrderScene" })
    }

    init(state)
    {
        console.log("order::init")
        this.state = state
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
            0, 0, //x, y
            "main_background"
        )
    }

    // called every frame
    update()
    {
        
        this.cameras.default.scrollY = 0.05
    }

    createOrderSprites()
    {
        // create sprites for all the orders
    }
}
