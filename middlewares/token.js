const jwt = require("jsonwebtoken");

const validaToken = (req, res, next) => {

    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).send({ msg: "O token não foi inserido." });
        }

        const tokenComBearer = token.replace("Bearer ", "");

        if (!tokenComBearer) {
            return res.status(401).json({  msg: "O token não foi inserido corretamente."});
        }

        const decoded = jwt.verify(tokenComBearer, process.env.SECRET);

        if (!decoded) {
            return res.status(401).json({ msg: "Usuário não autenticado!" });
        }

        next();

    } catch (error) {
        return res.status(403).json({ msg: "Token expirado ou inválido" });
    }
};

module.exports = {
    validaToken
}