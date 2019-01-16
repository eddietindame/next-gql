import { Event } from '../models/Event'
import { mapEvent } from '../lib'

export const events = () => Event.find()
    .then(events => events.map(event => mapEvent(event)))
    .catch(error => { throw error })
