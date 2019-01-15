import * as mongoose from 'mongoose'
import { getUser, getEvents } from '../server/lib'

describe('server tests', () => {

    beforeAll(done => {
        mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fzaky.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
            .then(() => {
                const db = mongoose.connection

                db.on('error', err => { done.fail(err) })
                db.once('open', () => { done() })
            })
            .catch(err => { done.fail(err) })
    })

    xtest('#getUser', () =>
        getUser('5c3bb2db0102845784749714')
            .then(user => {
                console.log(user)
                expect(user).toHaveProperty('_id')
            })
            .catch(err => { throw err })
    )

    xtest('#getEvents', () =>
        getEvents(['5c3bc75b7d14635997907ee9'])
            .then(events => {
                console.log(events)
                expect(events)[0].toHaveProperty('_id')
            })
    )
})
