const getDb = require("../utility/nosql").getDb;
const mongodb = require("mongodb");

class Item {
  constructor(title, price, description, imageUrl, id, userId) {
    (this.title = title),
      (this.price = price),
      (this.description = description),
      (this.imageUrl = imageUrl);
    this._id = id;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      dbOperation = db.collection("items").updateOne(
        { _id: new mongodb.ObjectID(this._id) },
        {
          $set: this,
          //Replace all fields, can be specified which too tho
        }
      );
    } else {
      dbOperation = db.collection("items").insertOne(this);
    }

    return dbOperation
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

  static delete(id) {
    const db = getDb();
    return db
      .collection("items")
      .deleteOne({ _id: new mongodb.ObjectID(id) })
      .then((response) => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Item;
