// order scene
const OrderState = {COMPLETE: 1, COOKING: 2, PLATING: 3, NOT_STARTED: 4,}
const EggType ={FRIED: 1, OMELETTE: 2, SCRAMBLED: 3,}
const Toppings = {PEPPERS: 1,HAM: 2,CHEESE: 3,RED_ONION: 4,TOMATOES: 5,MUSHROOM: 6,}
const Salads = {LETTUCE: 1,RED_ONION: 2,PEPPERS: 3,TOMATOES: 4,SLICED_BREAD: 5,KETCHUP: 6,}
    //ALL: [EggType.FRIED, EggType.OMELETTE, EggType.SCRAMBLED]
	//ALL: [Toppings.PEPPERS, Toppings.HAM, Toppings.CHEESE, Toppings.RED_ONION, Toppings.TOMATOES, Toppings.MUSHROOM]
    //ALL: [Salads.LETTUCE, Salads.RED_ONION, Salads.PEPPERS, Salads.TOMATOES, Salads.SLICED_BREAD, Salads.KETCHUP]

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
        this.hobScale = 2
        this.navArrowScale = 2
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
        for (var x = startX; x <= startX + (32*3*this.hobScale); x+=(32*this.hobScale)) {
            for (var y = startY + startX; y <= startY + startX + (32*3*this.hobScale); y += (32*this.hobScale)){
                this.add.image(x,y, "stove_off").setScale(2)
                this.createPan(x,y)
            }
        }
    }

    createPan(x, y){
        this.pans = 
        this.add.sprite(x,y, "pan").setScale(2)
    }

    createNavButtons() {
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

        arrow.setInteractive({ useHandCursor: true })
        .setScale(this.navArrowScale)
        .setAngle(rotation)
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
    update(time, delta) {
        //this.cameras.default.scrollY = 0.05
    }

    createOrderSprites() {
        // create sprites for all the orders
    }

    getRandomElementFromArray(array) {
        return array[Math.floor(Math.random() * array.length)]
    }

    // function to create a new order from a new customer
    createNewOrder() {
        // get a random type
        type = getRandomElementFromArray(EggType)
        toppings = []
        salads = []
        // add 1-3 random toppings
        for (var i = 0, r = Math.floor(Math.random() * 3 + 1); i < r; i++) {
            toppings.push(getRandomElementFromArray(Toppings))
        }
        // add 1-3 random salads
        for (var i = 0, r = Math.floor(Math.random() * 3 + 1); i < r; i++) {
            salads.push(getRandomElementFromArray(Salads))
        }

        order = new Order(type, toppings, salads)
        return order
    }
}
