const express = require('express');
var router = express.Router();
const todoService = require('../helpers/todoService');
const userService = require('../helpers/userService');
const jwt = require('jsonwebtoken');

const { validaRegistro } = require('../middlewares/registro');
const { updateUser } = require('../middlewares/update');
const { validaTask } = require('../middlewares/task');
const { validaToken } = require('../middlewares/token');

const dotenv = require('dotenv');
dotenv.config();

//Rota inicial
router.get('/', (req, res) => {
  res.status(200).json({ msg: 'Working api routes!' });
});

//Rota para registro de user
router.post('/registrar', validaRegistro, async (req, res) => {
  const { name, senha } = req.body;
  console.log(name);

  try {
    const newUser = await userService.new({ name: name, senha: senha });
    console.log(newUser);

    const token = jwt.sign({ name: name }, process.env.SECRET, {
      expiresIn: '12h',
    });

    return res
      .status(201)
      .json({ msg: 'Cadastrado', user: newUser, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Aconteceu um erro no servidor.' });
  }
});

//Rota para modificação de user
router.put(
  '/update/:nomeUserAntigo/:nomeUserUpdated',
  updateUser,
  validaToken,
  async (req, res) => {
    const { nomeUserAntigo, nomeUserUpdated } = req.params;

    try {
      const updatedUser = await userService.update(
        {
          name: nomeUserUpdated,
        },
        nomeUserAntigo,
      );
      console.log(userService.update);
      return res.status(200).json({ msg: 'Atualizado!', user: updatedUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Um erro aconteceu!' });
    }
  },
);

//Rota para obter um user
router.get('/listUser/:id', async (req, res) => {
  try {
    const foundUser = await userService.findByPK(req.params.id);
    if (foundUser) {
      return res.status(200).json({ msg: 'User encontrado!', user: foundUser });
    } else {
      return res.status(404).json({ msg: 'User não encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Um erro aconteceu.' });
  }
});

//Rota para exclusão de user
router.delete('/delete/:id', validaToken, async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userService.findByPK(id);

    if (user) {
      await userService.delete(id);
      return res.status(200).json({ msg: 'Deletado!' });
    } else {
      return res.status(400).json({ msg: 'Usuário não encotrado!' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Um erro aconteceu!' });
  }
});

//Rota para adição de uma tarefa
router.post('/newToDo', validaTask, async (req, res) => {
  const { titulo, descricao, dataEntrega } = req.body;

  if (!req.query.id) {
    return res
      .status(404)
      .json({ msg: 'Digite o ID da conta que irá criar o post' });
  }
  const [day, month, year] = dataEntrega.split('/');

  const dataEntregaDate = new Date(`${year}-${month}-${day}`);
  try {
    let newToDo = await todoService.newToDo({
      titulo: titulo,
      descricao: descricao,
      dataEntrega: dataEntregaDate,
      userId: req.query.id,
    });

    return res.status(200).json({ msg: 'Tarefa adicionada!', toDo: newToDo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
  }
});

//Rota para exclusão de uma tarefa
router.delete('/deleteToDo/:userId/:id', validaToken, async (req, res) => {
  const { userId, id } = req.params;

  try {
    const task = await todoService.findByID(id);

    if (task && task.userId) {
      await todoService.deleteById(userId, id);
      return res
        .status(200)
        .json({ msg: 'Tarefa encontrada e excluída!', taskDeleted: task });
    } else {
      return res.status(404).json({ msg: 'Tarefa não encontrada!' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
  }
});

//Rota para listagem da tarefa de determinado usuário
router.get('/allToDo/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    let found = await todoService.listByUser(userId);

    if (found && found.length > 0) {
      return res
        .status(200)
        .json({ msg: 'Tarefa encontrada!', tarefas: found });
    } else {
      return res.status(404).json({ msg: 'Tarefa não encontrada!' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
  }
});

//Rota para atualização da tarefa
router.put('/changeToDo/:userId/:id', validaToken, async (req, res) => {
  const { userId, id } = req.params;

  const { titulo, descricao, dataEntrega } = req.body;
  const [day, month, year] = dataEntrega.split('/');

  if (!titulo) {
    return res.status(404).json({ msg: 'titulo não foi inserido!' });
  }
  if (!descricao) {
    return res.status(404).json({ msg: 'descrição não foi inserido!' });
  }
  const dataRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!dataEntrega || !dataRegex.test(dataEntrega)) {
    return res
      .status(400)
      .json({ msg: 'Data de entrega inválida. Use o formato DD/MM/YYYY.' });
  }
  const dataEntregaDate = new Date(`${year}-${month}-${day}`);
  try {
    let change = todoService.updateById(userId, id, {
      titulo: titulo,
      descricao: descricao,
      dataEntrega: dataEntregaDate,
      userId: userId,
    });

    return res.status(200).json({ msg: 'Tarefa encontrada e modificada!' });
  } catch (error) {
    console.log(error);
    console.log(titulo);
    return res.status(500).json({ msg: 'Aconteceu um erro no servidor!' });
  }
});

module.exports = router;
