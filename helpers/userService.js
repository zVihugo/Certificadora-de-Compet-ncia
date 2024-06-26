const {UserModel} = require('../model/bd');

module.exports = {
    new: async (user) => {
        return await UserModel.create(user);
    },
    findByPK: async(id) => {
        return await UserModel.findByPk(id)
    },
    findByName: async (name) => {
        return await UserModel.findOne({ where: {name: name} });
    },
    update: async(user, name) => {
        return await UserModel.update(user, {where: {name: name}});
    },
    delete: async(id) => {
        return await UserModel.destroy({where: {id: id}})
    }

}