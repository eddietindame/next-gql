import { Booking } from '../models/Booking'
import { Event } from '../models/Event'
import { mapEvent } from '../lib'

export const bookEvent = async (
    { eventId },
    {
        isAuth,
        userId
    }
) => {
    if (!isAuth) throw new Error('Unauthenticated')
    try {
        const event = await Event.findOne({ _id: eventId })
        const booking = new Booking({ userId, event })
        await booking.save()
        return mapEvent(event)
    } catch (error) { throw error }
}
