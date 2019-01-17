// import * as mongoose from 'mongoose'
// import * as axios from 'axios'
// import { getUser, getEvents } from '../server/lib'
const axios = require('axios')

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzNmYTIzZDlmNjc5Mzg2YTdjYWJmNTciLCJlbWFpbCI6InBvb3BtYW4xQHRlc3QuY29tIiwiaWF0IjoxNTQ3NjgyOTQ1LCJleHAiOjE1NDc2ODY1NDV9.Xxf4rqY3y2_w94xqYvBgXbCMtetIG-vMsJ3PU7LdO5k'

describe('server tests', () => {

    // beforeAll(done => {
    //     mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fzaky.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
    //         .then(() => {
    //             const db = mongoose.connection

    //             db.on('error', err => { done.fail(err) })
    //             db.once('open', () => { done() })
    //         })
    //         .catch(err => { done.fail(err) })
    // })

    test('#getEvents', () =>
        axios({
            method: 'post',
            url: 'http://localhost:3000/graphql',
            data: {
                query: `
                    mutation {
                        createEvent(title: "69thepoop", date: "2019-01-13T20:57:44.658", price: 98, description: "poop") {
                            _id
                            description
                            title
                            price
                            creator {
                                createdEvents {
                                    _id
                                }
                            }
                        }
                    }
                `
            },
            headers: {
                Authorization: 'Bearer ' + JWT
            }
        })
            .then(res => {
                // console.log(res)
                console.log(res.data)
                // expect(res).toHaveProperty('_id')
            })
            .catch(err => { throw err })
    )

    // xtest('#getUser', () =>
    //     getUser('5c3bb2db0102845784749714')
    //         .then(user => {
    //             console.log(user)
    //             expect(user).toHaveProperty('_id')
    //         })
    //         .catch(err => { throw err })
    // )

    // xtest('#getEvents', () =>
    //     getEvents(['5c3bc75b7d14635997907ee9'])
    //         .then(events => {
    //             console.log(events)
    //             expect(events)[0].toHaveProperty('_id')
    //         })
    // )
})
