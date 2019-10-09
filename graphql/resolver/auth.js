const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');



module.exports = {
    createUser: async (args) => {
        try {
        const existingUser = await User.findOne({ email: args.userInput.email })
            if (existingUser) {
                throw new Error('user exists already');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User ({
                email: args.userInput.email,
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                password: hashedPassword
            })
            const result = await user.save();
            const token = jwt.sign({userId: user._id, email: user.email}, 'secretKey', {
                expiresIn: '2h'
            });
            return { ...result._doc, token: token, tokenExpiration: 2, password: null };
        } catch (err) {
            throw err;
        };
    },
    login: async ({email, password}) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('user does not exist');
        }
        const isEqual = await  bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('password is incoreect');
        }
        const token = jwt.sign({userId: user.id, email: user.email}, 'secretKey', {
            expiresIn: '2h'
        });
        return { userId: user.id, token: token, tokenExpiration: 2, email: user.email };
    }

};