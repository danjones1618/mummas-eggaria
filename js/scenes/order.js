// order scene
const OrderState = {COMPLETE: 1, COOKING: 2, PLATING: 3, NOT_STARTED: 4,}
const EggType ={FRIED: 1, OMELETTE: 2, SCRAMBLED: 3,}
const Toppings = {PEPPERS: 1,HAM: 2,CHEESE: 3,RED_ONION: 4,TOMATOES: 5,MUSHROOM: 6,}
const Salads = {LETTUCE: 1,RED_ONION: 2,PEPPERS: 3,TOMATOES: 4,SLICED_BREAD: 5,KETCHUP: 6,}
    //ALL: [EggType.FRIED, EggType.OMELETTE, EggType.SCRAMBLED]
	//ALL: [Toppings.PEPPERS, Toppings.HAM, Toppings.CHEESE, Toppings.RED_ONION, Toppings.TOMATOES, Toppings.MUSHROOM]
    //ALL: [Salads.LETTUCE, Salads.RED_ONION, Salads.PEPPERS, Salads.TOMATOES, Salads.SLICED_BREAD, Salads.KETCHUP]
const Cursors = {
    POINTER:    'auto',
    SPATULA:    'url("/res/cursors/Spatula.gif"), pointer',
    WHISK:      'url("/res/cursors/Whisk.gif"), pointer',
    BREAD:      'url("/res/ingredients/Bread.gif"), pointer',
    CHEESE:     'url("/res/ingredients/Cheese.gif"), pointer',
    EGG:        'url("/res/ingredients/egg.png"), pointer',
    HAM:        'url("/res/ingredients/Ham.gif"), pointer',
    KETCHUP:    'url("/res/ingredients/Ketchup.gif"), pointer',
    LETTUCE:    'url("/res/ingredients/LETTUCE.gif"), pointer',
    MUSHROOMS:  'url("/res/ingredients/Mushrooms.gif"), pointer',
    PEPPERS:    'url("/res/ingredients/Peppers.gif"), pointer',
    TOMATO:     'url("/res/ingredients/Tomato_slice.gif"), pointer',
}

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
        this.hobScale = 3 * 32
        this.hobSizeScale = 3
		this.saladScale = 3.0
        this.navArrowScale = 2
    }

    preload() {
        console.log("order::init")

        // create a progress bar
        var width = 300
        var height = 40
        var margin = 5

        var startX = this.viewportWidth / 2 - width / 2
        var startY = this.viewportHeight / 2 - height / 2
        var progressBox = this.add.graphics()
        var progressBar = this.add.graphics()

        progressBox.fillStyle(0x0000cc)
        progressBar.fillStyle(0x4db8ff)
        progressBox.fillRect(
            startX, startY,
            width, height
        )

        this.load.on("progress", (val) => {
            // val is a percentage
            progressBar.clear()
            progressBar.fillStyle(0x4db8ff)
            progressBar.fillRect(
                startX + margin, startY + margin,
                (width - (margin * 2)) * val, height - (margin * 2)
            )
            //console.log("loading::progress(" + val + ")")
        })

        this.load.on("complete", () => {
            progressBar.destroy()
            progressBox.destroy()
            console.log("loading::complete")
        })

        this.load.image("image_main_background", "/res/scenes/main_scene.png")
        this.load.image("image_nav_arrow", "/res/props/arrow.png")
        this.load.image("image_stove_off", "/res/props/hob_off.png")
        this.load.image("image_pan", "/res/props/Pan.gif")
        this.load.image("image_spatula", "/res/props/Spatula.gif")
        this.load.image("image_whisk", "/res/cursors/Whisk.gif")
        this.load.image("image_spatula", "/res/cursors/Spatula.gif")
        this.load.image("image_bread", "/res/ingredients/Bread.gif")
        this.load.image("image_cheese", "/res/ingredients/Cheese.gif")
        this.load.image("image_egg", "/res/ingredients/egg.png")
        this.load.image("image_ham", "/res/ingredients/Ham.gif")
        this.load.image("image_ketchup", "/res/ingredients/Ketchup.gif")
        this.load.image("image_lettuce", "/res/ingredients/Lettuce.gif")
        this.load.image("image_mushrooms", "/res/ingredients/Mushrooms.gif")
        this.load.image("image_peppers", "/res/ingredients/Peppers.gif")
        this.load.image("image_onion", "/res/ingredients/Red_onion.gif")
        this.load.image("image_tomato", "/res/ingredients/Tomato_slice.gif")
        this.load.image("image_egg_fried", "/res/props/Egg_fried.gif")
        this.load.image("image_egg_omelette", "/res/props/Egg_omlette.gif")
        this.load.image("image_egg_scrambled_piece", "/res/props/Egg_scrambled_piece.gif")
        this.load.image("image_egg_scrambled_plate", "/res/props/Egg_scrambled_plate.gif")
        this.load.image("image_hob_on", "/res/props/hob_on.png")
        this.load.image("image_hob_off", "/res/props/hob_off.png")
        this.load.image("image_order", "/res/props/Order.gif")
        this.load.image("image_plate", "/res/props/plate.png")
        this.load.atlas('pans', '/res/props/pans.png', '/res/props/pans_atlas.json')
        //this.cameras.default
    }

    create() {
        console.log("order::init")
        //this.physics.startSystem(Phaser.Physics.ARCADE)
        //var backgroundImage = this.cache.getImage("main_background")
        this.res = {}
        this.res.background = this.add.sprite(
            0, 0, //x, y
            "image_main_background"
        ).setOrigin(0)

        this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight)

        this.anims.create({key: 'pan_fried_flip',frames:
            this.anims.generateFrameNames('pans', {
                start: 0,end: 16,prefix: 'pans_',}),
            frameRate: 6,repeat: 0,})
        this.anims.create({key: 'pan_fried_shake',frames:
            this.anims.generateFrameNames('pans', {
                start: 0,end: 1,prefix: 'pans_',}),
            frameRate: 1,repeat: 5,})
        this.anims.create({key: 'pan_fried_burnt',frames:
            this.anims.generateFrameNames('pans', {
                start: 17,end: 17,prefix: 'pans_',}),
            frameRate: 6,repeat: -1,})
        this.anims.create({key: 'pan_omlette_flip',frames:
            this.anims.generateFrameNames('pans', {
                start: 18,end: 34,prefix: 'pans_',}),
            frameRate: 6,repeat: 0,})
        this.anims.create({key: 'pan_omlette_shake',frames:
            this.anims.generateFrameNames('pans', {
                start: 18,end: 19,prefix: 'pans_',}),
            frameRate: 1,repeat: 15,})
        this.anims.create({key: 'pan_omlette_burnt',frames:
            this.anims.generateFrameNames('pans', {
                start: 35,end: 35,prefix: 'pans_',}),
            frameRate: 6,repeat: -1,})
        this.anims.create({key: 'pan_egg_crack',frames:
            this.anims.generateFrameNames('pans', {
                start: 36,end: 52,prefix: 'pans_',}),
            frameRate: 6,repeat: 0,})
        this.anims.create({key: 'pan_scrambled_flip',frames:
            this.anims.generateFrameNames('pans', {
                start: 53,end: 69,prefix: 'pans_',}),
            frameRate: 6,repeat: 0,})
        this.anims.create({key: 'pan_scrambled_shake',frames:
            this.anims.generateFrameNames('pans', {
                start: 53,end: 54,prefix: 'pans_',}),
            frameRate: 1,repeat: 10,})
        this.anims.create({key: 'pan_scrambled_burnt',frames:
            this.anims.generateFrameNames('pans', {
                start: 70,end: 70,prefix: 'pans_',}),
            frameRate: 6,repeat: -1,})
        this.createCookButtons()
		this.createSaladButtons()
        this.createNavButtons()
		
		this.initOrders()
    }
	
	createSaladButtons(){
		var plateRadius = 128
		var startX = plateRadius + 75
		var startY = this.viewportHeight + plateRadius + 100
		var saladXOffset = 100
		var saladYOffset = 90
		this.add.image(startX, startY, "image_plate")
		//this.add.image(saladOffset, )
		const saladImages = [
			"image_lettuce",
			"image_onion",
			"image_peppers",
			"image_tomato",
			"image_bread",
			"image_ketchup"
		]
		
		this.saladStatuses = [false, false, false, false, false, false]
		
		for (let i = 0; i < saladImages.length; i++){
            let x = (plateRadius * 2) + 25 + (saladXOffset * ((i %2) + 1))
            let y = this.viewportHeight + (saladYOffset * ((i % 3) + 1))
			let salad = this.add.image(x, y, saladImages[i])
				.setScale(this.saladScale)
				.setInteractive({ userHandCursor: true })
			salad.on("pointerover", () => {
				salad.setScale(this.saladScale * 1.25)
			})
            salad.on("pointerout", () => {
                salad.setScale(this.saladScale)
            })
        }
	}
	
	updateSaladStatus(imageString){
		for (let i = 0; i < this.saladImages.length; i++){
			if (imageString == this.saladImages[i]){
				this.saladStatuses[i] = true
			} else {
				this.saladStatuses[i] = false
			}
		}
	
	}

    createCookButtons(){
        var startX = 100
        var startY = this.viewportHeight*2
        // Create hob
        for (var x = 1; x <= 3; x++) {
            for (var y = 1; y <= 3; y++){
                var h = this.add.image(startX + x * this.hobScale, startY + y * this.hobScale, "image_stove_off").setScale(this.hobSizeScale)
                this.createPan(startX + x * this.hobScale, startY + y * this.hobScale, h)
            }
        }
    }

    panLoop(p, h){
        var type = "omlette"
        p.once("pointerup", () => {
            this.setCursor(Cursors.SPATULA)
            h.setTexture("image_hob_on")
            p.play("pan_egg_crack")
            p.once("animationcomplete", () => {
                p.play("pan_" + type + "_shake")
                p.once("animationcomplete", () => {
                    p.play("pan_" + type + "_flip")
                    p.once("animationcomplete", () => {
                        p.play("pan_" + type + "_shake")
                        p.once("pointerup", () => {
                            console.log("cooked boi")
                            p.removeAllListeners("animationcomplete")
                            p.anims.stop()
                            p.setFrame("pans_36")
                            h.setTexture("image_hob_off")
                            this.setCursor(Cursors.POINTER)
                            this.panLoop(p)
                        })
                        p.once("animationcomplete", () => {
                            p.play("pan_" + type + "_burnt")
                            p.removeAllListeners("pointerup")
                            p.once("pointerup", () => {
                                console.log("Burnt boi")
                                p.anims.stop()
                                p.setFrame("pans_36")
                                h.setTexture("image_hob_off")
                                this.panLoop(p)
                            })
                        })
                    })
                })
            })
        })
    }

    createPan(x, y, h){
        var p = this.add.sprite(x,y, "pans", "pans_36").setScale(this.hobSizeScale)
        p.setInteractive({ userHandCursor: true })
        p.on("pointerover", () => {
            p.setScale(this.hobSizeScale * 1.25)
        }).on("pointerout", () => {
            p.setScale(this.hobSizeScale)
        })
        this.panLoop(p, h)
    }

    createNavButtons() {
        this.arrows = {}
        this.arrows.arrowsClicked = [false, false, false, false]

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
        var arrow = this.add.image(
            x, y,
            "image_nav_arrow"
        )

        arrow.setInteractive({ useHandCursor: true })
        .setScale(this.navArrowScale)
        .setAngle(rotation)
        .on("pointerdown", () => {
            // clicked
            this.arrows.arrowsClicked[index] = true
            arrow.setScale(this.navArrowScale * 1.1)
        }).on("pointerup", () => {
            if (this.arrows.arrowsClicked[index]) {
                this.arrows.arrowsClicked[index] = false
                arrow.setScale(this.navArrowScale)
                this[f]()
            }
        }).on("onpointerout", () => {
            if (this.arrows.arrowsClicked[index]) {
                this.arrows.arrowsClicked[index] = false
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

    initOrders() {
        this.orders = []
    }

    onOrderCreated(order) {
        this.orders.push(order)

        // create the sprite group
        group = this.add.group()
        background = this.add.image(
            0, 0,
            "image_order"
        )
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
        this.onOrderCreated(order)
    }

    setCursor(cursor){
        this.input.setDefaultCursor(cursor)        
    }

    getCursor(){
        for (var prop in Cursors) {
            let c = document.getElementsByTagName("canvas")[0].style.cursor
            console.log(prop, Cursors[prop], c)
            if (Cursors[prop] === c)
                return prop
        }
    }
}
