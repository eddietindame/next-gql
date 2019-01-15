import { User } from '../models/User'
import { getEvents } from '../lib'

export const users = () => User.find()
    .then(users => users.map(
        user => ({
            ...(<any>user)._doc,
            _id: (<any>user).id,
            createdEvents: getEvents.bind(this, (<any>user)._doc.createdEvents)
        })
    ))
    .catch(error => { throw error })
