// order scene
const OrderState = {COMPLETE: 1, COOKING: 2, PLATING: 3, NOT_STARTED: 4,}
const EggType ={FRIED: 1, OMELETTE: 2, SCRAMBLED: 3,}
const Toppings = {PEPPERS: 1,HAM: 2,CHEESE: 3,RED_ONION: 4,TOMATOES: 5,MUSHROOM: 6,}
const Salads = {LETTUCE: 1,RED_ONION: 2,PEPPERS: 3,TOMATOES: 4,SLICED_BREAD: 5,KETCHUP: 6,}
const Cursors = {
    POINTER:    'auto',
    SPATULA:    'url("/res/cursors/Spatula.gif"), pointer',
    WHISK:      'url("/res/cursors/Whisk.gif"), pointer',
    BREAD:      'url("/res/ingredients/Bread.gif"), pointer',
    CHEESE:     'url("/res/ingredients/Cheese.gif"), pointer',
    EGG:        'url("/res/ingredients/egg.png"), pointer',
    HAM:        'url("/res/ingredients/Ham.gif"), pointer',
    KETCHUP:    'url("/res/ingredients/Ketchup.gif"), pointer',
    LETTUCE:    'url("/res/ingredients/Lettuce.gif"), pointer',
    MUSHROOMS:  'url("/res/ingredients/Mushrooms.gif"), pointer',
    PEPPERS:    'url("/res/ingredients/Peppers.gif"), pointer',
    TOMATO:     'url("/res/ingredients/Tomato_slice.gif"), pointer',
    ONION:      'url("/res/ingredients/Red_onion.gif"), pointer',
    FRIED:      'url("/res/cursors/Egg_fried.gif"), pointer',
    SCRAMBLED:  'url("/res/cursors/Egg_scrambled_plate.png"), pointer',
    OMLETTE:    'url("/res/cursors/Egg_omlette.gif"), pointer',
    BFRIED:     'url("/res/cursors/burnt_fried.png"), pointer',
    BSCRAMBLED: 'url("/res/cursors/burnt_scrambled.png"), pointer',
    BOMLETTE:   'url("/res/cursors/burnt_omlette.png"), pointer',
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
        this.buttonScale = 3.0
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
        this.load.image("image_spatula", "/res/cursors/Spatula.gif")
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
        //this.load.image("image_egg_fried", "/res/props/Egg_fried.gif")
        //this.load.image("image_egg_omelette", "/res/props/Egg_omlette.gif")
        this.load.image("image_egg_scrambled_piece", "/res/props/Egg_scrambled_piece.gif")
        //this.load.image("image_egg_scrambled_plate", "/res/props/Egg_scrambled_plate.gif")
        this.load.image("image_egg_fried", "/res/cursors/Egg_fried.gif")
        this.load.image("image_egg_omelette", "/res/cursors/Egg_omlette.gif")
        this.load.image("image_egg_scrambled_plate", "/res/cursors/Egg_scrambled_plate.png")
        this.load.image("image_hob_on", "/res/props/hob_on.png")
        this.load.image("image_hob_off", "/res/props/hob_off.png")
        this.load.image("image_order", "/res/props/Order.gif")
        this.load.image("image_plate", "/res/props/plate.png")
        this.load.image("image_ketchup_drop", "/res/ingredients/Ketchup_drop.gif")
        this.load.image("image_bin", "/res/props/bin.png")
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
        this.plateImages = {
            [Cursors.BREAD]:    "image_bread",
            [Cursors.CHEESE]:   "image_cheese",
            [Cursors.HAM]:      "image_ham",
            [Cursors.KETCHUP]:  "image_ketchup_drop",
            [Cursors.LETTUCE]:  "image_lettuce",
            [Cursors.MUSHROOMS]:"image_mushrroms",
            [Cursors.PEPPERS]:  "image_peppers",
            [Cursors.TOMATO]:   "image_tomato",
            [Cursors.ONION]:    "image_onion",
            [Cursors.FRIED]:    "image_egg_fried",
            [Cursors.SCRAMBLED]: "image_egg_scrambled_plate",
            [Cursors.OMLETTE]:  "image_egg_omelette",
        }

        this.buttons = []

        this.createCookButtons()
        this.createSaladButtons()
        this.createNavButtons()
        this.addPlate()
        this.addBins()
        
        this.initOrders()
        this.setCursor(Cursors.POINTER)
    }
    
    createSaladButtons(){
        var plateRadius = 128
        var startX = plateRadius + 75
        var startY = this.viewportHeight + plateRadius + 100
        var saladXOffset = 100
        var saladYOffset = 90
        this.saladImages = [
            "image_lettuce",
            "image_onion",
            "image_peppers",
            "image_tomato",
            "image_bread",
            "image_ketchup"
        ]
        
        for (let i = 0; i < this.saladImages.length; i++){
            let x = (plateRadius * 2) + 25 + (saladXOffset * ((i %2) + 1))
            let y = this.viewportHeight + (saladYOffset * ((i % 3) + 1))
            this.createButtons(x, y, this.saladImages[i])
        }
    }

    addBins(){
        let b1 = this.add.image(60, this.viewportHeight * 2 - 60,"image_bin")
        b1.setInteractive({ useHandCursor: false }).setScale(this.buttonScale)
        b1.on("pointerup", () => this.setCursor(Cursors.POINTER))
        let b2 = this.add.image(60, this.viewportHeight * 3 - 60,"image_bin")
        b2.setInteractive({ useHandCursor: false }).setScale(this.buttonScale)
        b2.on("pointerup", () => this.setCursor(Cursors.POINTER))
    }

    resetPlateItems(){
        this.plateItems = {
          [Cursors.BREAD]:      0,    
          [Cursors.CHEESE]:     0,   
          [Cursors.EGG]:        0,      
          [Cursors.HAM]:        0,      
          [Cursors.KETCHUP]:    0,  
          [Cursors.LETTUCE]:    0,  
          [Cursors.MUSHROOMS]:  0,
          [Cursors.PEPPERS]:    0,  
          [Cursors.TOMATO]:     0,   
          [Cursors.ONION]:      0,    
          [Cursors.FRIED]:      0,    
          [Cursors.SCRAMBLED]:  0,
          [Cursors.OMLETTE]:    0,  
        }
    }

    addPlate(){
        var plateRadius = 128
        var startX = plateRadius + 75
        var startY = this.viewportHeight + plateRadius + 100
        let plate = this.add.image(startX, startY, "image_plate")
                        .setInteractive({ useHandCursor: false })
        this.resetPlateItems()
        plate.on("pointerup", () => {
            let image = this.plateImages[this.getCursor()]
            if (image !== undefined){
                let topping = this.add.image(
                    this.input.mousePointer.x,
                    this.viewportHeight + this.input.mousePointer.y,
                    image).setScale(this.buttonScale)
                this.plateItems[this.getCursor()] += 1
                // Prevent adding multiple eggs
                this.setCursor(Cursors.POINTER)
            }
        })
    }

    createButtons(x, y, image){
        let scale = this.buttonScale
        let b = this.add.image(x, y, image)
            .setScale(scale)
            .setInteractive({ useHandCursor: false })
        b.on("pointerdown", () => {
            this.updateButtons(image, scale)
        })
        b.on("pointerup", () => {
            this.updateButtons(image, scale)
        })
        b.on("pointerover", () => {
            b.setScale(scale * 1.25)
        })
        b.on("pointerout", () => {
            b.setScale(scale)
        })
        this.buttons.push(b)
    }
    
    updateButtons(imageString, scale){
        if (this.getCursor() !== Cursors.POINTER)
            return
        let imageToCursor = {
            "image_lettuce": Cursors.LETTUCE,
            "image_onion":   Cursors.ONION,
            "image_peppers": Cursors.PEPPERS,
            "image_tomato":  Cursors.TOMATO,
            "image_bread":   Cursors.BREAD,
            "image_ketchup": Cursors.KETCHUP,
            "image_egg":     Cursors.EGG,
            "image_whisk":   Cursors.WHISK,
            "image_spatula": Cursors.SPATULA,
        }
        for (let i = 0; i < this.buttons.length; i++){
            if (imageString == this.buttons[i].texture.key){
                this.buttons[i].setScale(scale * 1.25)
                this.setCursor(imageToCursor[imageString])
            } else {
                this.buttons[i].setScale(scale)
            }
        }
    }

    createCookButtons(){
        var startX = 100
        var startY = this.viewportHeight*2
        // Create hob
        for (let x = 1; x <= 3; x++) {
            for (let y = 1; y <= 3; y++){
                let h = this.add.image(startX + x * this.hobScale, startY + y * this.hobScale, "image_stove_off").setScale(this.hobSizeScale)
                this.createPan(startX + x * this.hobScale, startY + y * this.hobScale, h)
            }
        }
        let y = startY + (4 * this.hobScale)
        let width = 32 * this.buttonScale
        this.createButtons(startX + this.hobScale, y, "image_egg")
        this.createButtons(startX + this.hobScale + width, y, "image_whisk")
        this.createButtons(startX + this.hobScale + width * 2, y, "image_spatula")
    }

    panLoop(p, h){
        let cursorToEgg = {
            [Cursors.EGG]:     "fried",
            [Cursors.WHISK]:   "scrambled",
            [Cursors.SPATULA]: "omlette",
        }
        let cursorNext = {
            "fried":        [Cursors.FRIED],
            "scrambled":    [Cursors.SCRAMBLED],
            "omlette":      [Cursors.OMLETTE],
            "bfried":       [Cursors.BFRIED],
            "bscrambled":   [Cursors.BSCRAMBLED],
            "bomlette":     [Cursors.BOMLETTE],
        }
        p.once("pointerup", () => {
            let type = cursorToEgg[this.getCursor()]
            if (type === undefined)
                this.panLoop(p, h)
            else{
                h.setTexture("image_hob_on")
                p.play("pan_egg_crack")
                this.setCursor(Cursors.POINTER)
                p.once("animationcomplete", () => {
                    p.play("pan_" + type + "_shake")
                    p.once("animationcomplete", () => {
                        p.play("pan_" + type + "_flip")
                        p.once("animationcomplete", () => {
                            p.play("pan_" + type + "_shake")
                            p.on("pointerup", () => {
                                if (this.getCursor() !== Cursors.POINTER)
                                    return
                                p.removeAllListeners("animationcomplete")
                                p.removeAllListeners("pointerup")
                                p.anims.stop()
                                p.setFrame("pans_36")
                                h.setTexture("image_hob_off")
                                this.setCursor(cursorNext[type])
                                this.panLoop(p, h)
                            })
                            p.once("animationcomplete", () => {
                                p.play("pan_" + type + "_burnt")
                                p.removeAllListeners("pointerup")
                                p.on("pointerup", () => {
                                    if (this.getCursor() !== Cursors.POINTER)
                                        return
                                    p.anims.stop()
                                    p.setFrame("pans_36")
                                    h.setTexture("image_hob_off")
                                    this.setCursor(cursorNext["b" + type])
                                    this.panLoop(p, h)
                                })
                            })
                        })
                    })
                })
            }
        })
    }

    createPan(x, y, h){
        var p = this.add.sprite(x,y, "pans", "pans_36").setScale(this.hobSizeScale)
        p.setInteractive({ useHandCursor: false })
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
        let arrow = this.add.image(
            x, y,
            "image_nav_arrow"
        )

        arrow.setInteractive({ useHandCursor: true })
        .setScale(this.navArrowScale)
        .setAngle(rotation)
        .on("pointerover", () => {
            arrow.setScale(this.navArrowScale * 1.25)
        }).on("pointerdown", () => {
            // clicked
            this.arrows.arrowsClicked[index] = true
        }).on("pointerup", () => {
            if (this.arrows.arrowsClicked[index]) {
                this.arrows.arrowsClicked[index] = false
                this[f]()
            }
        }).on("onpointerout", () => {
            if (this.arrows.arrowsClicked[index]) {
                this.arrows.arrowsClicked[index] = false
            }
            arrow.setScale(this.navArrowScale)
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
            if (Cursors[prop] === c)
                return Cursors[prop]
        }
    }
}
