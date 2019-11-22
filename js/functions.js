// all functions which don't have their own places live here
function getRandomElementFromArray(array)
{
    return array[Math.floor(Math.random() * array.length)]
}

// function to create a new order from a new customer
function createNewOrder()
{
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

