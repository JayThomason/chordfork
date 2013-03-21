var orm = require('../sequelize-singleton')
  , seq = orm.Seq ();

module.exports = {
  model: {
    identifier: {
      type: seq.STRING,
      allowNull: false,
      primaryKey: true
    },
    parent: {
      type: seq.STRING,
      allowNull: true
    },
    owner: {
      type: seq.STRING,
      defaultValue: 'Anonymous',
      allowNull: false
    },
    owner_id: {
      type: seq.STRING,
      allowNull: false
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
    },
    notes: {
      type: seq.STRING,
      allowNull: true
    },
    genre: {
      type: seq.STRING,
      allowNull: true
    },
    tags: {
      type: seq.STRING,
      allowNull: true
    }
  },
  options: {
    freezeTableName: true
  }
}
