import { Event } from '../models/Event'
import { User } from '../models/User'
import { mapEvent } from '../lib'

const USER_ID = '5c3bb2db0102845784749714'

export const createEvent = async ({
    title,
    description,
    price,
    date
}) => {
    try {
        const event = await new Event({
            title,
            description,
            price,
            date: new Date(date),
            creator: USER_ID
        }).save()
        const user = await User.findById(USER_ID)

        await User.findByIdAndUpdate(
            USER_ID,
            {
                createdEvents: [
                    ...(<any>user)._doc.createdEvents,
                    event
                ]
            },
            {
                new: true
            },
            error => {
                if (error) throw new Error('User does not exist.')
            }
        )
        return mapEvent(event)
    } catch (error) { throw error }
}
