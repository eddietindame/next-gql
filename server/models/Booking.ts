import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Booking = mongoose.model('Booking', new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{ timestamps: true }))
