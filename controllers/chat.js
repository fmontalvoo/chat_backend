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

module.exports = { saveMessage }