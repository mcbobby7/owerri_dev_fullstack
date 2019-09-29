
const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { user, singleEvents } = require('./merge');




module.exports = {
    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('unauthenticated');
        }
        try {
            const bookings = await Booking.find();
            return bookings.map( booking => {
                return { ...booking._doc,
                        user: user.bind(this, booking._doc.user),
                        events: singleEvents.bind(this, booking._doc.event),
                        createdAt: new Date(booking._doc.createdAt).toISOString(), 
                        updatedAt: new Date(booking._doc.updatedAt).toISOString() 
                    };
            });
        } catch (err) {
            throw err;
        }
    }, 
    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('unauthenticated');
        }
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = {...booking.event._doc, _id: booking.event.id, creator: user.bind(this, booking.event._doc.creator)};
            await Booking.deleteOne({_id: args.bookingId});
            return event;
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('unauthenticated');
        }
        const fetchedEvent = await Event.findOne({_id: args.eventId});
        const booking = new Booking({
            user: '5d8eb31e6e61e61d9cf8cbac',
            event: fetchedEvent
        });
        const result = await booking.save();
        return { ...result._doc, 
                user: user.bind(this, booking._doc.user),
                events: singleEvents.bind(this, booking._doc.event),
                createdAt: new Date(result._doc.createdAt).toISOString(), 
                updatedAt: new Date(result._doc.updatedAt).toISOString() }
    },
};