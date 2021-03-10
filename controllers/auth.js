const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const create = async (req, res = response) => {
    const { email, password } = req.body;
    try {

        let existeEmail = await User.findOne({ email });
        if (existeEmail)
            return res.status(400).json({
                ok: false,
                message: "Ese email ya esta registrado."
            });

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        res.json({
            ok: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Contacte al administrador."
        });
    }
}

module.exports = { create }