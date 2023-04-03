// Models
const { User } = require("./user.model");
const { Track } = require('./track.model');

const initModels = () => {
  User.hasMany(Track, { foreignKey: "user_id" });
  Track.belongsTo(User, { foreignKey: "user_id" });
};

module.exports = { initModels, User, Track };
