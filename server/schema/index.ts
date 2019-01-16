import { buildSchema } from 'graphql'

export const schema = buildSchema(`
    type Query {
        message: String
        add(num1: Int!, num2: Int!): Int
        events: [Event!]!
        users: [User!]!
        bookings: [Booking!]!
    }

    type Mutation {
        createEvent(title: String!, description: String!, price: Float!, date: String!): Event
        createUser(email: String!, password: String!): User
        bookEvent(eventId: ID!): Event!
        cancelBooking(bookingId: ID!): Event!
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
    }

    input UserInput {
        email: String!
        password: String!
    }

    type Booking {
        _id: ID!
        event: Event!
        user: User!
        createdAt: String!
        updatedAt: String!
    }
`)

// createUser(userInput: UserInput): User
