const fs = require('fs')
const rootDirectory = require('../utility/directory')
const path = require('path')

const PATH = path.join(rootDirectory, 'data', 'cart.json')

module.exports = class Cart {
    static addItem(id, itemPrice) {
        fs.readFile(PATH, (err, content) => {
            let cart = {items: [], price: 0}
            if (!err) {
                cart = JSON.parse(content)
            }
            const existingItemIndex = cart.items.findIndex(item => item.id === id)
            const existingItem = cart.items[existingItemIndex]
            let updatedItem;
            if(existingItem) {
                updatedItem = {...existingItem};
                updatedItem.quantity = updatedItem.quantity +1;
                cart.items = [...cart.items]
                cart.items[existingItemIndex] = updatedItem
            }
            else {
                updatedItem = {id: id, quantity: 1}
                cart.items = [...cart.items, updatedItem];
            }
            cart.price = cart.price + +itemPrice;
            fs.writeFile(PATH, JSON.stringify(cart), (err) => {
                console.log(err)
            })
        })
    }

    static deleteItem(id, cost) {
        fs.readFile(PATH, (err, content) => {
            if (err) {
                return;
            }
            const newCart = {...JSON.parse(content) }
            const item = newCart.items.find(item => item.id === id)
            const itemQuantity = item.quantity
            newCart.items = newCart.items.filter(item => item.id !== id)
            newCart.price = newCart.price - cost * itemQuantity

            fs.writeFile(PATH, JSON.stringify(newCart), (err) => {
                console.log(err)
            })
        })
    }
}