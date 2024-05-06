const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

const UserModel = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const ToDoModel = sequelize.define("ToDo", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    dataEntrega: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

ToDoModel.belongsTo(UserModel, {foreignKey: 'userId'});

module.exports = {
    sequelize: sequelize,
    UserModel: UserModel,
    ToDoModel: ToDoModel
}
