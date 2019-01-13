import { events } from './events'
import { createEvent } from './createEvent'
import { createUser } from './createUser'

export const rootValue = {
    events,
    createEvent,
    createUser,
    message: () => 'Hello World!',
    add: ({ num1, num2 }) => num1 + num2
}
