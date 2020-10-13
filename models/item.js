const fileSystem = require('fs')
const path = require('path')
const rootDirectory = require('../utility/directory')
const Path = path.join(rootDirectory, 'data', 'items.json')

module.exports = class Item {
    constructor(title) {
        this.title = title
    }

    save() {
        fileSystem.readFile(Path, (err, content) => {
            let items = []
            if (!err) {
                items = JSON.parse(content)
            }
            items.push(this)
            fileSystem.writeFile(Path, JSON.stringify(items), (err) => {
                console.log(err)
            })
        })

    }

    static getAll(callBack){
        fileSystem.readFile(Path, (err, content) => {
            if(err) {
                callBack([])
            }
            callBack(JSON.parse(content))
        })
    }
}