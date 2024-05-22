const express = require('express');
const {sequelize} = require('./model/bd');
const todoService = require("./helpers/todoService");
const userService = require("./helpers/userService");
const rotas = require('./routes/routes');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

//Leitura de JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json())

app.get("/install", async (req, res) => {

    //Instalação
    await sequelize.sync({force: true});

    //Criação de novo usuário
    let user = await userService.new({
        name: "Leandro",
        senha: "abc12345"
    });
    
    //Update de um novo usuário
    await userService.update({
        name: "Vitoria"
    }, "Leandro")

    //Criação de Todo's para testes
    let toDo1 = await todoService.newToDo({
        titulo: "Minha primeira tarefa",
        descricao: "Projeto competência",
        dataEntrega: null,
        userId: user.id
    })

    let toDo2 = await todoService.newToDo({
        titulo: "Minha segunda tarefa",
        descricao: "Projeto competência",
        dataEntrega: null,
        userId: user.id
    })

    let toDo3 = await todoService.newToDo({
        titulo: "Minha terceira tarefa",
        descricao: "Projeto competência",
        dataEntrega: null,
        userId: user.id
    })

    //Encontrar um usuário por chave primária
    let findUser = await userService.findByPK(user.id)

    //Listar as tarefas de determinado usuário
    let list = await todoService.listByUser(findUser.id);

    //Excluir um tarefa
    await todoService.deleteById(user.id, toDo1.id)

    //Listar novamente as tarefas de um usuário
    newList = await todoService.listByUser(findUser.id)

    //Encontrar uma tarefa por ID
    let findToDo = await todoService.findByID(toDo3.id);

    res.json({msg: "Worked!", list: list, newList: newList, findToDo: findToDo});
})

app.use('/api', rotas);

app.listen(port, () => {
    console.log("Server is running on port 3000");
})
