var OrderState =
{
    COMPLETE: 1,
    COOKING: 2,
    PLATING: 3,
    NOT_STARTED: 4
}

var EggType =
{
    FRIED: 1,
    OMELETTE: 2,
    SCRAMBLED: 3
}

var Toppings =
{
    LETTUCE: 1,
    RED_ONION: 2,
    PEPPERS: 3,
    TOMATOES: 4,
    SLICED_BREAD: 5,
    KETCHUP: 6
}

class Order
{
    constructor(customer, type, toppings)
    {
        this.customer = customer
        this.type = type
        this.toppings = toppings
    }
}