import { Booking } from '../models/Booking'
import { Event } from '../models/Event'
import { mapEvent } from '../lib'

export const bookEvent = async ({ user = '5c3bb2db0102845784749714', eventId }) => {
    try {
        const event = await Event.findOne({ _id: eventId })
        const booking = new Booking({ user, event })
        await booking.save()
        return mapEvent(event)
    } catch (error) { throw error }
}
