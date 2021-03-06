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

  getCart() {
    const db = getDb();
    const itemIds = this.cart.items.map((item) => {
      return item.itemId;
    });
    return db
      .collection("items")
      .find({ _id: { $in: itemIds } })
      .toArray()
      .then((itemData) => {
        return itemData.map((item) => {
          return {
            ...item,
            quantity: this.cart.items.find((i) => {
              return i.itemId.toString() === item._id.toString();
            }).quantity,
          };
        });
      });
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((items) => {
        const order = {
          items: items,
          user: {
            _id: new mongodb.ObjectID(this._id),
            name: this.username,
            email: this.email,
          },
        };
        db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new mongodb.ObjectID(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = getDb();
    // return db.collection('orders').find
  }

  deleteCartItem(id) {
    const newCartItems = this.cart.items.filter((item) => {
      return item.itemId.toString() !== id.toString();
    });
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectID(this._id) },
        { $set: { cart: { items: newCartItems } } }
      );
  }

  toCart(item) {
    const cartItem = this.cart.items.findIndex((prod) => {
      return prod.itemId.toString() === item._id.toString();
    });
    let newQuantity = 1;
    const newCartItems = [...this.cart.items];

    if (cartItem >= 0) {
      //then product exists
      newQuantity = this.cart.items[cartItem].quantity + 1;
      newCartItems[cartItem].quantity = newQuantity;
    } else {
      newCartItems.push({
        itemId: new mongodb.ObjectID(item._id),
        quantity: newQuantity,
      });
    }

    const newCart = {
      items: newCartItems,
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
