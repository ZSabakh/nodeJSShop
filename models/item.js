// const fileSystem = require("fs");
// const path = require("path");
// const Path = path.join(rootDirectory, "data", "items.json");
// const Cart = require("./cart");

const rootDirectory = require("../utility/directory");
const sql = require("../utility/sql");

// const getItemsFromFile = (callBack) => {
//   fileSystem.readFile(Path, (err, content) => {
//     if (err) {
//       return callBack([]);
//     }
//     callBack(JSON.parse(content));
//   });
// };

module.exports = class Item {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return sql.execute(
      "INSERT INTO items (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
    // getItemsFromFile((items) => {
    //   if (this.id) {
    //     const existingItemIndex = items.findIndex(
    //       (item) => item.id === this.id
    //     );
    //     const updatedItems = [...items];
    //     updatedItems[existingItemIndex] = this;
    //     fileSystem.writeFile(Path, JSON.stringify(updatedItems), (err) => {
    //       console.log(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     items.push(this);
    //     fileSystem.writeFile(Path, JSON.stringify(items), (err) => {
    //       console.log(err);
    //     });
    //   }
    // });
  }

  static deleteId(id) {
    // getItemsFromFile((items) => {
    //   const item = items.find((item) => item.id === id);
    //   const newItems = items.filter((item) => item.id !== id);
    //   fileSystem.writeFile(Path, JSON.stringify(newItems), (err) => {
    //     if (!err) {
    //       Cart.deleteItem(id, item.price);
    //     }
    //   });
    // });
  }

  static getAll() {
    // getItemsFromFile(callBack);
    return sql.execute("SELECT * FROM items");
  }

  static getById(id) {
    return sql.execute("SELECT * FROM items WHERE items.id = ?", [id]);

    // getItemsFromFile((items) => {
    //   const item = items.find((item) => item.id === id);
    //   callBack(item);
    // });
  }
};
