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
            firstName: String!
            lastName: String!
            profilePic: String
            occupation: String
            github: String
            twitter: String
            linkedIn: String
            createdEvents: [Event!]
        }


        type AuthData {
            userId: ID
            _id: ID
            token: String!
            email: String!
            tokenExpiration: Int!
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
            firstName: String!
            lastName: String!
            profilePic: String
            occupation: String
            github: String
            twitter: String
            linkedIn: String
        }
        input UpdateUserInput {
            email: String
            firstName: String
            lastName: String
            profilePic: String
            occupation: String
            github: String
            twitter: String
            linkedIn: String
        }

        type RootQuery {
            events: [Event!]!
            bookings: [Booking!]!
            users: [User!]!
            user: User!
            event(eventId: ID!): Event!
        }

        type RootMutation {
            createEvent(eventInput: EventInput!): Event
            createUser(userInput: UserInput!): AuthData!
            bookEvent(eventId: ID!): Booking!
            cancelBooking(bookingId: ID!): Event!
            login(email: String!, password: String!): AuthData!
            updateUser(updateUserInput: UpdateUserInput!): User!
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
        `)