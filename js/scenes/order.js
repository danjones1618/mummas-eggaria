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
        this.viewportWidth = 640
        this.viewportHeight = 480
    }

    preload()
    {
        console.log("order::init")
        this.load.image("main_background", "/res/scenes/main_scene.png")
        this.load.image("nav_arrow", "/res/props/arrow.png")
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
        ).setOrigin(0)

        this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight)

        this.createNavButtons()
    }

    createNavButtons()
    {
        this.navArrowScale = 2
        this.arrowsClicked = [false, false, false, false]

        this.createNavArrow(0, 180,
            this.viewportWidth - 40,
            this.viewportHeight - 40,
            "switchToPrep"
        )

        this.createNavArrow(1, 0,
            this.viewportWidth - 40,
            this.viewportHeight + 40,
            "switchToOrder"
        )

        this.createNavArrow(2, 180,
            this.viewportWidth - 40,
            this.viewportHeight * 2 - 40,
            "switchToCook"
        )

        this.createNavArrow(3, 0,
            this.viewportWidth - 40,
            this.viewportHeight * 2 + 40,
            "switchToPrep"
        )
    }

    createNavArrow(index, rotation, x, y, f)
    {
        // top arrow
        var arrow = this.add.sprite(
            x, y,
            "nav_arrow"
        )

        arrow.setInteractive().setScale(this.navArrowScale).setAngle(rotation)
        .on("pointerdown", () => {
            // clicked
            this.arrowsClicked[index] = true
            arrow.setScale(this.navArrowScale * 1.1)
        }).on("pointerup", () => {
            if (this.arrowsClicked[index]) {
                this.arrowsClicked[index] = false
                arrow.setScale(this.navArrowScale)
                this[f]()
            }
        }).on("onpointerout", () => {
            if (this.arrowsClicked[index]) {
                this.arrowsClicked[index] = false
                arrow.setScale(this.navArrowScale)
            }
        })

        return arrow
    }

    switchToOrder()
    {
        console.log("order::switchToOrder")
        this.cameras.main.setScroll(0, this.viewportHeight * 0)
    }

    switchToPrep()
    {
        console.log("order::switchToPrep")
        //this.cameras.default.setViewport(0, this.viewportHeight * 2, this.viewportWidth, this.viewportHeight)
        this.cameras.main.setScroll(0, this.viewportHeight * 1)
    }

    switchToCook()
    {
        console.log("order::switchToCook")
        this.cameras.main.setScroll(0, this.viewportHeight * 2)
    }

    // called every frame
    update(time, delta)
    {
        //this.cameras.default.scrollY = 0.05
    }

    createOrderSprites()
    {
        // create sprites for all the orders
    }
}
