// Models
const { User } = require('./user.model');
const { Profile } = require('./profile.model');

const initModels = () => {
	User.hasOne(Profile);
	Profile.belongsTo(User);
};

module.exports = { initModels };
