import { Event } from '../models/Event'
import { getUser } from '../lib'

export const events = () => Event.find()
    .then(events => events.map(
        event => ({
            ...(<any>event)._doc,
            _id: (<any>event).id,
            date: new Date((<any>event)._doc.date).toISOString(),
            creator: getUser.bind(this, (<any>event)._doc.creator)
        })
    ))
    .catch(error => { throw error })
