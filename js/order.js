const OrderState =
{
    COMPLETE: 1,
    COOKING: 2,
    PLATING: 3,
    NOT_STARTED: 4
}

const EggType =
{
    FRIED: 1,
    OMELETTE: 2,
    SCRAMBLED: 3,
    // ALL is used when generating random ones
    ALL: [EggType.FRIED, EggType.OMELETTE, EggType.SCRAMBLED]
}

const Toppings =
{
    LETTUCE: 1,
    RED_ONION: 2,
    PEPPERS: 3,
    TOMATOES: 4,
    SLICED_BREAD: 5,
    KETCHUP: 6,
    ALL: [Toppings.LETTUCE, Toppings.RED_ONION, Toppings.PEPPERS, Toppings.TOMATOES, Toppings.SLICED_BREAD, Toppings.KETCHUP]
}

class Order
{
    constructor(type, toppings)
    {
        this.type = type
        this.toppings = toppings
    }
}