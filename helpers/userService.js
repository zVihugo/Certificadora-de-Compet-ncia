const {UserModel} = require('../model/bd');

module.exports = {
    new: async (user) => {
        return await UserModel.create(user);
    },
    findByPK: async(id) => {
        return await UserModel.findByPk(id)
    },
    update: async(user, name) => {
        return await UserModel.update(user, {where: {name: name}});
    }

}