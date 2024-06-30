const users = require("./mongo/users");

const models = {
  comerModel: require("./mongo/comercio"),
  userModel: require("./mongo/users"),
  postModel: require("./mongo/post"),
};
module.exports = models;
