const {ToDoModel} = require('../model/bd');

module.exports = {
    newToDo: async (tarefa) => {
        return await ToDoModel.create(tarefa);
    },
    findByID: async(id) => {
        return await ToDoModel.findByPk(id);
    },
    listByUser: async(id) => {
        return await ToDoModel.findAll({where: {userId: id}})
    },
    deleteById: async(id) => {
        return await ToDoModel.destroy({where: {id: id}})
    }
}