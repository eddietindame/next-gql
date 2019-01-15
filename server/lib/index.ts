import { Event } from '../models/Event'
import { User } from '../models/User'

export const getUser = userId => User.findById(userId)
    .then(user => ({
        ...(<any>user)._doc,
        _id: user.id,
        createdEvents: getEvents.bind(this, (<any>user)._doc.createdEvents)
    }))
    .catch(error => { throw error })

export const getEvents = eventIds => Event.find({
    _id: { $in: eventIds }
})
    .then(events => events.map(
        event => ({
            ...(<any>event)._doc,
            _id: event.id,
            creator: getUser.bind(this, (<any>event).creator)
        })
    ))
    .catch(error => { throw error })
