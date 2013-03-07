var orm = require ('../sequelize-singleton')
  , seq = orm.Seq ();

module.exports = {
  model: {
    id: {
      type: seq.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: seq.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        len: {
          args: 3,
          msg: "Name must be at least 3 characters in length."
        }
      }
    },
    password: {
      type: seq.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 3
        }
      }
    }
  }
}
