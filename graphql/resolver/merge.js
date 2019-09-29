const Event = require('../../models/event');
const User = require('../../models/user');

const events = async eventIds => {
    try {
const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(event => {
        return { ...event._doc, date: new Date(event._doc.date).toISOString(), creator: user.bind(this, event.creator) }
    });
} catch (err) {
    throw err;
};
};
const singleEvents = async eventId => {
try {
const event = await Event.findById(eventId);
    return { ...event._doc, creator: user.bind(this, event.creator) }
} catch (err) {
throw err;
};
};
const user = async userId => {
try {
const user = await User.findById(userId)
    return { ...user._doc, createdEvents: events.bind(this, user._doc.createdEvents) };
}catch(err) {
    throw err;
};
};

exports.user = user;
exports.events = events;
exports.singleEvents = singleEvents;