import { Booking } from '../models/Booking'
import { mapEvent } from '../lib'

export const cancelBooking = async (
    { bookingId },
    { isAuth }
) => {
    if (!isAuth) throw new Error('Unauthenticated')
    try {
        const booking = await Booking
            .findById(bookingId)
            .populate('event')
        const event = mapEvent((<any>booking).event)
        await Booking.deleteOne({ _id: bookingId })
        return event
    } catch (error) { throw error }
}
