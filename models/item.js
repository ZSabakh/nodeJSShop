const fileSystem = require("fs");
const path = require("path");
const rootDirectory = require("../utility/directory");
const Path = path.join(rootDirectory, "data", "items.json");
const Cart = require("./cart");

const getItemsFromFile = (callBack) => {
  fileSystem.readFile(Path, (err, content) => {
    if (err) {
      return callBack([]);
    }
    callBack(JSON.parse(content));
  });
};

module.exports = class Item {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getItemsFromFile((items) => {
      if (this.id) {
        const existingItemIndex = items.findIndex(
          (item) => item.id === this.id
        );
        const updatedItems = [...items];
        updatedItems[existingItemIndex] = this;
        fileSystem.writeFile(Path, JSON.stringify(updatedItems), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        items.push(this);
        fileSystem.writeFile(Path, JSON.stringify(items), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteId(id) {
    getItemsFromFile((items) => {
      const item = items.find((item) => item.id === id);
      const newItems = items.filter((item) => item.id !== id);
      fileSystem.writeFile(Path, JSON.stringify(newItems), (err) => {
        if (!err) {
          Cart.deleteItem(id, item.price);
        }
      });
    });
  }

  static getAll(callBack) {
    getItemsFromFile(callBack);
  }

  static getById(id, callBack) {
    getItemsFromFile((items) => {
      const item = items.find((item) => item.id === id);
      callBack(item);
    });
  }
};
