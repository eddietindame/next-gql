import { Event } from '../models/Event'
import { User } from '../models/User'
import { mapEvent } from '../lib'

export const createEvent = async (
    {
        title,
        description,
        price,
        date
    },
    {
        isAuth,
        userId
    }
) => {
    if (!isAuth) throw new Error('Unauthenticated')
    try {
        const event = await new Event({
            title,
            description,
            price,
            date: new Date(date),
            creator: userId
        }).save()
        const user = await User.findById(userId)

        await User.findByIdAndUpdate(
            userId,
            {
                createdEvents: [
                    ...(<any>user)._doc.createdEvents,
                    event
                ]
            },
            { new: true },
            error => {
                if (error) throw new Error('User does not exist.')
            }
        )
        return mapEvent(event)
    } catch (error) { throw error }
}
