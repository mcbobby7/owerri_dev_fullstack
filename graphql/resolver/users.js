const User = require('../../models/user');
const { events } = require('./merge');

module.exports = {
    users: async () => {
        try {
        const users = await User.find().populate('creator')
            return users.map(user =>  {
                return  { ...user._doc, createdEvents: events.bind(this, user._doc.createdEvents) };
        })
    } catch (err) {
            throw err;
        }
    },
};