var orm = require('../sequelize-singleton')
  , seq = orm.Seq ();

module.exports = {
  model: {
    identifier: {
      type: seq.STRING,
      allowNull: false,
      primaryKey: true
    },
    owner: {
      type: seq.STRING,
      allowNull: false,
      defaultValue: "Anonymous"
    },
    song: {
      type: seq.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 1,
          msg: "Song must be at least 1 characters in length."
        }
      }
    }
  },
  options: {
    freezeTableName: true
  }
}
