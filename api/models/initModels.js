// import Models for use it
const { User } = require("./user.model");
const { Track } = require('./track.model');

// Establish your models relations inside this function
const initModels = () => {
  User.hasMany(Track, { foreignKey: "user_id" });
  Track.belongsTo(User, { foreignKey: "user_id" });
};

module.exports = { initModels, User, Track };
