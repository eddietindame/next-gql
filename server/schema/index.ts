import { buildSchema } from 'graphql'

export const schema = buildSchema(`
    type Query {
        message: String
        add(num1: Int!, num2: Int!): Int
        events: [Event!]!
    }

    type Mutation {
        createEvent(title: String!, description: String!, price: Float!, date: String!): Event
        createUser(userInput: UserInput): User
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
`)
