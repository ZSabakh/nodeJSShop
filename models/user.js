const mongodb = require("mongodb");
const getDb = require("../utility/nosql").getDb;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  toCart(item) {
    // const cartItem = this.cart.items.findIndex(prod => {
    //   return prod._id === item._id;
    // })
    const newCart = {
      items: [{ itemId: new mongodb.ObjectID(item._id), quantity: 1 }],
    };

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectID(this._id) },
        { $set: { cart: newCart } }
      );
  }

  static findUser(id) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new mongodb.ObjectID(id) });
  }
}

module.exports = User;
