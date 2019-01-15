import { events } from './events'
import { users } from './users'
import { createEvent } from './createEvent'
import { createUser } from './createUser'

export const rootValue = {
    events,
    users,
    createEvent,
    createUser,
    message: () => 'Hello World!',
    add: ({ num1, num2 }) => num1 + num2
}
