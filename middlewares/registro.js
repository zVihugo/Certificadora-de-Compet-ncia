const userService = require("../helpers/userService");

const validaRegistro = async (req, res, next) => {
    const { name, senha } = req.body;

    if (!name) {
        return res.status(400).json({ msg: "Nome não informado!"});
    }

    if (name.length < 3) {
        return res.status(400).json({ msg: "O nome não pode ser menor que 3 caracteres!" });
    }
    
    const findName = await userService.findByName(name);

    if (findName) {
        return res.status(400).json({ msg: "O nome já foi registrado."});
    }

    if (!senha) {
        return res.status(400).json({  msg: "A senha é obrigatória."});
    }

    if (senha.length < 8) {
        return res.status(400).json({ msg: "A senha não pode ser menor que 8 caracteres!" });
    }

    next();
};

module.exports = {
    validaRegistro
}