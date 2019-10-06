const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Booking {
            _id: ID!
            event: Event!
            user: User!
            createdAt: String!
            updatedAt: String!
        }
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: String!
            date: String!
            creator: User!
        }

        type Users {
            _id: ID!
            email: String!
            password: String
        }

        type User {
            _id: ID!
            email: String!
            password: String
            createdEvents: [Event!]
        }


        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
            email: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: String!
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
            bookings: [Booking!]!
            users: [User!]!
            user(email: String!): User!
            event(eventId: ID!): Event!
        }

        type RootMutation {
            createEvent(eventInput: EventInput!): Event
            createUser(userInput: UserInput!): User
            bookEvent(eventId: ID!): Booking!
            cancelBooking(bookingId: ID!): Event!
            login(email: String!, password: String!): AuthData!
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
        `)