const mongodb = require("mongodb");
const Client = mongodb.MongoClient;

let _db;

const connect = (cb) => {
  Client.connect(
    "mongodb+srv://zura:V9EOmNn7EVw1owW3@cluster0.dfb9s.mongodb.net/shop?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
    .then((access) => {
      _db = access.db();
      console.log("Connection successful!");
      cb();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "no db!";
};

exports.connect = connect;
exports.getDb = getDb;
