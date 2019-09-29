const authResolver = require('./auth');
const eventResolver = require('./event');
const bookingResolver = require('./booking');
const userResolver = require('./users');

const rootResolver = {
    ...authResolver,
    ...bookingResolver,
    ...eventResolver,
    ...userResolver
};

module.exports = rootResolver;