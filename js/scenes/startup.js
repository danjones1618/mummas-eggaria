// startup scene
class StartupScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: "StartupScene" , active: true})
    }

    preload()
    {
        //this.load.image("startup-logo", "res/")
        this.load.image("defaultTexture", "res/startup/Play_button.gif")
        this.load.image("pressedTexture", "res/startup/Play_button_pressed.gif")
        this.load.image("splash", "res/website/Mummas_eggaria.png")
        this.load.image("dark", "res/startup/Dark_button.gif")
        this.load.image("darkPressed", "res/startup/dark_button_pressed.gif")
    }

    init()
    {
        // this is the global game "state"
        this.state =
        {
            orders: [],
            customers: []
        }
    }

    create()
    {
        var graphics = this.add.graphics()
        graphics.fillStyle(0xfa5353, 1)
        graphics.fillRect(0, 0, this.game.config.width, this.game.config.height)

        //this.scene.launch("OrderScene", this.state)
        //To keep track of our pressed state
        var isPressed = false;
        var isPressedDark = false;

        var title = this.add.image(this.game.config.width/2, this.game.config.height/2 - 64, 'splash')
        var spr = this.add.image(this.game.config.width/2, this.game.config.height/2 + 64, 'defaultTexture').setInteractive();
        spr.setScale(5)
        title.setScale(0.49)

        //Make the button change image when pressed
        spr.on('pointerdown', () => {
            isPressed = true;
            spr.setTexture('pressedTexture');
        });

        //Make the button change image back when the mouse is moved outside while clicking
        spr.on('pointerout', () => {
            spr.setTexture('defaultTexture');
        });

        //Make the button change image back to pressed state when moved back after moving outside
        spr.on('pointerover', () => {
            if (isPressed)
                spr.setTexture('pressedTexture');
        });

        /*
        * Make the button change image back to default when the mouse is released outside.
        * Assuming "this" is the context of the current scene.
        */ 
        this.input.on('pointerup', () => {
            if(isPressed)
                this.scene.start("GameScene", this.state)
            else {
                isPressed = false;
                spr.setTexture('defaultTexture');
            }
            if(isPressedDark){
                document.getElementsByTagName("body")[0].classList.toggle('dark')
                dark.setTexture('dark');
            }
            else {
                isPressedDark = false;
                dark.setTexture('dark');
            }
        });

        var dark = this.add.image(this.game.config.width/2, this.game.config.height/2 + 64 + 64 + 32, 'dark').setInteractive();
        dark.setScale(5)
        //dark.on("pointerup", () => document.getElementsByTagName("body")[0].classList.toggle('dark'));

        //Make the button change image when pressed
        dark.on('pointerdown', () => {
            isPressedDark = true;
            dark.setTexture('darkPressed');
        });

        //Make the button change image back when the mouse is moved outside while clicking
        dark.on('pointerout', () => {
            dark.setTexture('dark');
        });

        //Make the button change image back to pressed state when moved back after moving outside
        dark.on('pointerover', () => {
            if (isPressedDark)
                dark.setTexture('dark');
        });
    }
}
