const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/jwt');

const signup = async (req, res = response) => {
    const { email, password } = req.body;
    try {

        let usuario = await User.findOne({ email });
        if (usuario)
            return res.status(400).json({
                ok: false,
                message: "Ese email ya esta registrado."
            });

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id);

        res.status(200).json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Contacte al administrador."
        });
    }
}

const signin = async (req, res = response) => {
    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });

        if (!user)
            return res.status(400).json({
                ok: false,
                message: "Usuario o constraseña incorrectos."
            });


        const pass = bcrypt.compareSync(password, user.password);

        if (!pass)
            return res.status(400).json({
                ok: false,
                message: "Usuario o constraseña incorrectos."
            });

        const token = await generateJWT(user.id);

        res.status(200).json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Contacte al administrador."
        });
    }
}

const renewJWT = async (req, res = response) => {
    let user = await User.findById(req.uid);
    const token = await generateJWT(user.id);
    res.status(200).json({
        ok: true,
        user,
        token
    });
}

module.exports = { signup, signin, renewJWT };