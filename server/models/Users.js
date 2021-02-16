const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const Users = db.define("users", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	nombre: { type: Sequelize.STRING(60), allowNull: false },
	username: {
		type: Sequelize.STRING(30),
		allowNull: false,
		unique: {
			args: true,
			msg: "Usuario ya registrado",
		},
	},
	password: {
		type: Sequelize.STRING(60),
		allowNull: false,
		validate: {
			notEmpty: {
        msg: 'El password no puede ir vacío'
      },
		},
	},
}, {
  hooks: {
    beforeCreate(user){
      user.password = Users.prototype.hashPassword(user.password)
    }
  }
});
// Method to compare password and validate
Users.prototype.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}
// Method to hash password
Users.prototype.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null );
}

module.exports = Users