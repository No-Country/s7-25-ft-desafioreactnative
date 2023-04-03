const { db, DataTypes } = require("../utils/database.util");

const Track = db.define("track", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  download_url: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  }
});

module.exports = { Track };