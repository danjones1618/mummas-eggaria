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
    //ALL: [EggType.FRIED, EggType.OMELETTE, EggType.SCRAMBLED]
}

const Toppings = {
	PEPPERS: 1,
	HAM: 2,
	CHEESE: 3,
	RED_ONION: 4,
	TOMATOES: 5,
	MUSHROOM: 6,
	//ALL: [Toppings.PEPPERS, Toppings.HAM, Toppings.CHEESE, Toppings.RED_ONION, Toppings.TOMATOES, Toppings.MUSHROOM]
}

const Salads =
{
    LETTUCE: 1,
    RED_ONION: 2,
    PEPPERS: 3,
    TOMATOES: 4,
    SLICED_BREAD: 5,
    KETCHUP: 6,
    //ALL: [Salads.LETTUCE, Salads.RED_ONION, Salads.PEPPERS, Salads.TOMATOES, Salads.SLICED_BREAD, Salads.KETCHUP]
}



class Order
{
    constructor(type, toppings, salads)
    {
        this.type = type
        this.toppings = toppings
		this.salads = salads
    }
}