import { Event } from '../models/Event'
import { User } from '../models/User'

export const mapEvent = event => ({
    ...(<any>event)._doc,
    _id: event.id,
    creator: getUser.bind(this, (<any>event).creator)
})

export const mapUser = user => ({
    ...(<any>user)._doc,
    _id: user.id,
    createdEvents: getEvents.bind(this, (<any>user)._doc.createdEvents),
    password: null
})

export const mapBooking = booking => ({
    ...(<any>booking)._doc,
    _id: (<any>booking).id,
    createdAt: new Date((<any>booking)._doc.createdAt).toISOString(),
    updatedAt: new Date((<any>booking)._doc.updatedAt).toISOString(),
    event: getEvent.bind(this, (<any>booking)._doc.event),
    user: getUser.bind(this, (<any>booking)._doc.user)
})

export const getUser = userId => User.findById(userId)
    .then(user => mapUser(user))
    .catch(error => { throw error })

export const getEvent = eventId => Event.findById(eventId)
    .then(event => mapEvent(event))
    .catch(error => { throw error })

export const getEvents = eventIds => Event.find({
    _id: { $in: eventIds }
})
    .then(events => events.map(event => mapEvent(event)))
    .catch(error => { throw error })
