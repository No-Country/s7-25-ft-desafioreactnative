// Models
const { User } = require('./user.model');
const { Profile } = require('./profile.model');
const { Track } = require('./track.model');
const initModels = () => {
	User.hasOne(Profile);
	Profile.belongsTo(User);
  User.hasMany(Track, { foreignKey: "user_id" });
  Track.belongsTo(User, { foreignKey: "user_id" });
};

module.exports = { initModels, User, Track };
