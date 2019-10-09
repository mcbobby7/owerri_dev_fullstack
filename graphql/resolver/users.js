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
    user: async (args, req) => {
        try {
            const user = await User.findOne({ _id: req.userId });
            return  { ...user._doc, createdEvents: events.bind(this, user._doc.createdEvents) };
        } catch (err) {
            throw err;
        }
    },
    updateUser: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('unauthenticated');
        }
        try {
            const user = await User.findByIdAndUpdate({ _id: req.userId }, {$set: 
                {   email: args.updateUserInput.email,
                    firstName: args.updateUserInput.firstName,
                    lastName: args.updateUserInput.lastName,
                    occupation: args.updateUserInput.occupation,
                    github: args.updateUserInput.github,
                    twitter: args.updateUserInput.twitter,
                    linkedIn: args.updateUserInput.linkedIn
                }},
                {multi: true, new: true});
            return  { ...user._doc };
        } catch (err) {
            throw err;
        }
    },
};