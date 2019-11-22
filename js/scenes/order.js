// order scene
class OrderScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: "OrderScene" , active: true})
    }

    preload()
    {
        this.load.image("order-scene-background", "/res/order_scene.png")
    }

    create()
    {
        var graphics = this.add.graphics()
        graphics.fillStyle(0xaaccff, 1)
        graphics.fillRect(0, 0, this.game.config.width, this.game.config.height)
        graphics.fillStyle(0x663300, 1)
        var orderMenuHeight = this.game.config.height / 3
        graphics.fillRect(0, this.game.config.height - orderMenuHeight, this.game.config.width, orderMenuHeight)
    }

    renderOrders()
    {

    }

    createOrder()
    {

    }
}
