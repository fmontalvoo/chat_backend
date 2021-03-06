const { response } = require('express');

const create = (req, res = response) => {
    res.json({
        ok: true,
        message: 'Registrar usuario'
    });
}

module.exports = { create }