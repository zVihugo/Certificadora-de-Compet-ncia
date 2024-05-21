const userService = require("../helpers/userService");

const validaRegistro = async (req, res, next) => {
    const name = req.body.name;

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

    next();
};

module.exports = {
    validaRegistro
}