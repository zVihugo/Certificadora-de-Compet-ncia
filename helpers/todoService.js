const {ToDoModel} = require('../model/bd');

module.exports = {
    newToDo: async (tarefa) => {
        return await ToDoModel.create(tarefa);
    },
    findByID: async(id) => {
        return await ToDoModel.findByPk(id);
    },
    listByUser: async(userId) => {
        return await ToDoModel.findAll({where: {userId: userId}})
    },
    deleteById: async(userId, id) => {
        return await ToDoModel.destroy({where: {id: id, userId: userId}})
    },
    updateById: async(userId, id, tarefa) => {
        return await ToDoModel.update(tarefa, {where: {id: id, userId: userId}})
    }
}