import { Booking } from '../models/Booking'
import { mapBooking } from '../lib'

export const bookings = () => Booking.find()
    .then(bookings => bookings.map(booking => mapBooking(booking)))
    .catch(error => { throw error })
