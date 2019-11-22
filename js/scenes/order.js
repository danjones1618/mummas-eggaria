// order scene
class OrderScene extends Phaser.Scene {
    constructor() {
        super({ key: "OrderScene" })
    }

    init() {
        console.log("order::init")
        this.worldWidth = 640
        this.worldHeight = 480*3
        this.viewportWidth = 640
        this.viewportHeight = 480
    }

    preload() {
        console.log("order::init")
        this.load.image("main_background", "/res/scenes/main_scene.png")
        this.load.image("nav_arrow", "/res/props/arrow.png")
        this.load.image("stove_off", "/res/props/hob_off.png")
        this.load.image("pan", "/res/props/Pan.gif")
        //this.cameras.default
    }

    create() {
        console.log("order::init")
        //this.physics.startSystem(Phaser.Physics.ARCADE)
        //var backgroundImage = this.cache.getImage("main_background")
        this.background = this.add.sprite(
            0, 0, //x, y
            "main_background"
        ).setOrigin(0)

        this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight)

        this.createCookButtons()
        this.createNavButtons()
    }

    createCookButtons(){
        var startX = 100
        var startY = this.viewportHeight*2
        // Create hob
        var hobScale = 2
        for (var x = startX; x <= startX + (32*3*hobScale); x+=(32*hobScale)) {
            for (var y = startY + startX; y <= startY + startX + (32*3*hobScale); y+= (32*hobScale)){
                this.add.sprite(x,y, "stove_off").setScale(2)
                this.createPan(x,y)
            }
        }
    }

    createPan(x, y){
        this.pans = 
        this.add.sprite(x,y, "pan").setScale(2)
    }

    createNavButtons() {
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

    createNavArrow(index, rotation, x, y, f) {
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

    switchToOrder() {
        this.cameras.main.setScroll(0, this.viewportHeight * 0)
    }

    switchToPrep() {
        this.cameras.main.setScroll(0, this.viewportHeight * 1)
    }

    switchToCook() {
        this.cameras.main.setScroll(0, this.viewportHeight * 2)
    }

    // called every frame
    update(time, delta)
    {
        //this.cameras.default.scrollY = 0.05
    }

    createOrderSprites() {
        // create sprites for all the orders
    }
}
