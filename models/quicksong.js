module.exports = function (sequelize, DataTypes) {
  return sequelize.define ('QuickSong', {
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Anonymous"
    },
    song: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 1,
          msg: "Song must be at least 1 characters in length."
        }
      }
    }
  });
}