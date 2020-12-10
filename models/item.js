const getDb = require("../utility/nosql").getDb;
const mongodb = require("mongodb");

class Item {
  constructor(title, price, description, imageUrl) {
    (this.title = title),
      (this.price = price),
      (this.description = description),
      (this.imageUrl = imageUrl);
  }

  save() {
    const db = getDb();
    return db
      .collection("items")
      .insertOne(this)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getAll() {
    //.find({title: 'Mikheil'}) will filter
    const db = getDb();
    return db
      .collection("items")
      .find({})
      .toArray()
      .then((items) => {
        console.log(items);
        return items;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getDetail(id) {
    const db = getDb();
    return db
      .collection("items")
      .find({ _id: new mongodb.ObjectID(id) })
      .next()
      .then((item) => {
        return item;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Item;
