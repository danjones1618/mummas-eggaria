// order scene
class OrderScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: "OrderScene" , active: true})
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
        this.background = this.add.tileSprite(
            0, 0, //x, y
            640, 480*3, //w, h
            "main_background"
        )
        this.cameras.default.scrollY = 0.5
    }

    // called every frame
    update()
    {
        
    }

    createOrderSprites()
    {
        // create sprites for all the orders
    }
}
