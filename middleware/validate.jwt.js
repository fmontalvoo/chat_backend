const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token)
        return res.status(401).json({
            ok: false,
            message: "No existe el token"
        });

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: "Token no valido"
        });
    }
}

module.exports = { validateJWT };