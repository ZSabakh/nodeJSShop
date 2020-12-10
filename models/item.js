const getDb = require("../utility/nosql").getDb;

class Item {
  constructor(title, price, description, imageUrl) {
    (this.title = title),
      (this.price = price),
      (this.description = description),
      (this.imageUrl = imageUrl);
  }

  save() {
    const db = getDb();
    db.collection("items")
      .insertOne(this)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Item;
