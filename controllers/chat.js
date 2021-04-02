const { response } = require("express");

const Chat = require('../models/chat.model');

const saveMessage = async (payload) => {
    try {

        const chat = Chat(payload);
        await chat.save();

        return true;
    } catch (error) {
        return false;
    }
}

const getChat = async (req, res = response) => {

    const myUID = req.uid;
    const fromUID = req.params.from;

    const chats = await Chat.find({
        $or: [{ from: myUID, to: fromUID }, { from: fromUID, to: myUID }]
    }).sort({ createdAt: 'desc' })
        .limit(35);

    res.status(200).json({
        ok: true,
        chats
    });

}

module.exports = { saveMessage, getChat }