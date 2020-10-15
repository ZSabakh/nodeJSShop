const fileSystem = require('fs')
const path = require('path')
const rootDirectory = require('../utility/directory')
const Path = path.join(rootDirectory, 'data', 'items.json')

const getItemsFromFile = (callBack) => {
    fileSystem.readFile(Path, (err, content) => {
        if(err) {
            return callBack([])
        }
        callBack(JSON.parse(content))
    })
}

module.exports = class Item {
    constructor(title, imageUrl,description,price) {
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    save() {
        this.id = Math.random().toString();
        getItemsFromFile(items => {
            items.push(this)
            fileSystem.writeFile(Path, JSON.stringify(items), (err) => {
                console.log(err)
            })
        })


    }

    static getAll(callBack){
       getItemsFromFile(callBack)
    }

    static getById(id, callBack) {
        getItemsFromFile(items => {
            const item = items.find(item => item.id === id)
            callBack(item)
        })
    }
}