import { Event } from '../models/Event'
import { User } from '../models/User'

export const createEvent = ({ title, description, price, date }) => {
    const event = new Event({
        title,
        description,
        price,
        date: new Date(date),
        creator: '5c3bb2db0102845784749714'
    })

    return event.save()
        .then(async event => {
            await User.findByIdAndUpdate('5c3bb2db0102845784749714', { createdEvents: event }, error => {
                if (error) throw new Error('User does not exist.')
            })
            return {
                ...(<any>event)._doc,
                _id: (<any>event).id
            }
        })
        .catch(error => { throw error })
}
