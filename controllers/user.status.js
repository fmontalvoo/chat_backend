const User = require('../models/user.model');

const userOnline = async (uid = '') => {
    const user = await User.findById(uid);
    user.online = true;
    user.save();
    return user;
}

const userOffline = async (uid = '') => {
    const user = await User.findByIdAndUpdate(uid, { 'online': false });
}

module.exports = { userOnline, userOffline }