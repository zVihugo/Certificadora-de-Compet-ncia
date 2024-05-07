const express = require('express');
var router  = express.Router();
const todoService = require('../helpers/todoService');
const userService = require('../helpers/userService');

//Rota inicial
router.get('/', (req, res) => {
    res.status(200).json({msg: "Working api routes!"})
})

//Rota para registro de user
router.post('/registrar', async (req, res) => {
    const nome = req.body.name
    console.log(nome)
    try {
        const newUser = await userService.new({name: nome});
        console.log(newUser)
        return res.status(200).json({ msg: "Cadastrado", user: newUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Um erro aconteceu!" });
    }
})

//Rota para modificação de user
router.put('/update/:nomeUserAntigo/:nomeUserUpdated', async(req, res) => {
    const {nomeUserAntigo, nomeUserUpdated} = req.params;

    try {
        const updatedUser = await userService.update({
            name: nomeUserUpdated
        }, nomeUserAntigo);
        console.log(userService.update)
        return res.status(200).json({ msg: "Atualizado!", user: updatedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Um erro aconteceu!" });
    }

})

//Rota para obter um user
router.get('/listUser/:id', async (req, res) => {
    const foundUser = await userService.findByPK(req.params.id);
    if(foundUser) {
        return res.status(200).json({msg: "User encontrado!", user: foundUser});
    } else{
        return res.status(404).json({ msg: "User não encontrado" });
    }
})

//Rota para exclusão de user
router.delete('/delete/:id', async(req, res) => {
    const id = req.params.id
    
    try {
        const deleted = await userService.delete(id);
        return res.status(200).json({ msg: "Deletado!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Um erro aconteceu!" });
    }

})

//Rota para adição de uma tarefa
router.post("/newToDo", async (req, res) => {
    const {titulo, descricao, dataEntrega} = req.body

    if(!req.query.id){
        return res.status(404).json({ msg: "Digite o ID da conta que irá criar o post"});
    }

    try{
        let newToDo = await todoService.newToDo({
            titulo: titulo,
            descricao: descricao,
            dataEntrega: dataEntrega,
            userId: req.query.id
        })
    
        return res.status(200).json({msg: "Tarefa adicionada!", toDo: newToDo})
    } catch (error) {
        console.log(error);
        return res.status(404).json({msg: "Um erro aconteceu!", error: error})
    }
    
})

//Rota para exclusão de uma tarefa
router.delete('/deleteToDo/:userId/:id', async(req, res) => {
    const {userId, id} = req.params;

    try{
        let deleted = await todoService.deleteById(userId, id)
        return res.status(200).json({msg: "Tarefa encontrada e excluída!", deleted: deleted})
    } catch (error) {
        console.log(error);
        return res.status(404).json({msg: "Um erro aconteceu!", error: error})
    }
    
})

//Rota para listagem da tarefa de determinado usuário
router.get('/allToDo/:userId', async(req, res) => {
    const userId = req.params.userId;

    try{
        let found = await todoService.listByUser(userId)
        return res.status(200).json({msg: "Tarefa encontrada!", tarefas: found})
    } catch (error) {
        console.log(error);
        return res.status(404).json({msg: "Um erro aconteceu!", error: error})
    }
})

//Rota para atualização da tarefa
router.put('/changeToDo/:userId/:id', async(req, res) => {
    const {userId, id} = req.params;

    const {titulo, descricao, dataEntrega} = req.body


    try{
        let change = todoService.updateById(userId, id, {
            titulo: titulo,
            descricao: descricao,
            dataEntrega: dataEntrega,
            userId: userId
        })

        return res.status(200).json({msg: "Tarefa encontrada e modificada!"})
    } catch (error) {
        console.log(error);
        console.log(titulo)
        return res.status(404).json({msg: "Um erro aconteceu!", error: error})
    }
})

module.exports = router;