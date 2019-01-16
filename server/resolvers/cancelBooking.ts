import { Booking } from '../models/Booking'
import { mapEvent } from '../lib'

export const cancelBooking = async ({ bookingId }) => {
    try {
        const booking = await Booking
            .findById(bookingId)
            .populate('event')
        const event = mapEvent((<any>booking).event)
        await Booking.deleteOne({ _id: bookingId })
        return event
    } catch (error) { throw error }
}
