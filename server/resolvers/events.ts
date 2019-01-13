import { Event } from '../models/Event'

export const events = () => Event.find()
    .populate('creator')
    .then(events => events.map(
        event => ({
            ...(<any>event)._doc,
            _id: (<any>event).id,
            date: new Date((<any>event)._doc.date).toISOString(),
            creator: {
                ...(<any>event)._doc.creator._doc,
                _id: (<any>event)._doc.creator.id
            }
        })
    ))
    .catch(error => { throw error })
