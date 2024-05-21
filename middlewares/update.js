const userService = require("../helpers/userService");

const updateUser = async (req, res, next) => {
    const { nomeUserAntigo } = req.params;
    
    const nomeAntigo = await userService.findByName(nomeUserAntigo);

    if (!nomeAntigo) {
        return res.status(400).json({ msg: "Usuário não existe!"});
    }
    next();
};

module.exports = { 
    updateUser
}