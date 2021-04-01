const { response } = require("express");

const User = require('../models/user.model');

const getUsers = async (req, res = response) => {

    const num = Number(req.query.num) || 0;

    const users = await User.find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(num)
        .limit(10);

    res.status(200).json({
        ok: true, users
    });
}

module.exports = { getUsers }