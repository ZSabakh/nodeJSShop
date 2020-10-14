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
    constructor(title) {
        this.title = title
    }

    save() {
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
}