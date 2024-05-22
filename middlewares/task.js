const userService = require("../helpers/userService");

const validaTask = async (req, res, next) => {
    const { titulo, descricao, dataEntrega } = req.body;
    
    const id = req.query.id;

    const user = await userService.findByPK(id);
    
    if (!user) {
        return res.status(404).json({ msg: "Usuário não registrado para inserir uma nova tarefa!" });
    }

    if (!titulo) {
        return res.status(400).json({ msg: "O título não foi inserido!" });
    }

    if (descricao.length < 5) {
        return res.status(400).json({ msg: "A descrição não pode ser menor que 5 caracteres!" });
    }

    const dataRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!dataEntrega || !dataRegex.test(dataEntrega)) {
        return res.status(400).json({ msg: "Data de entrega inválida. Use o formato DD/MM/YYYY." });
    }

    const [ day, month, year ] = dataEntrega.split('/');

    const dataEntregaDate = new Date(`${year}-${month}-${day}`);

    const dataAtual = new Date();

    if (dataEntregaDate < dataAtual) {
        return res.status(400).json({ msg: "A data de entrega não pode ser anterior â data atual." });
    }

    next();
};

module.exports = {
    validaTask
};