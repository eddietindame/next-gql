import * as bcrypt from 'bcryptjs'
import { User } from '../models/User'

export const createUser = ({ userInput }) =>
    User.findOne({
        email: userInput.email
    })
        .then(user => {
            if (user) throw new Error('User exists already.')
            return bcrypt.hash(userInput.password, 12)
        })
        .then(hashedPassword => {
            const user = new User({
                email: userInput.email,
                password: hashedPassword
            })

            return user.save()
                .then(user => ({
                    ...(<any>user)._doc,
                    _id: (<any>user).id,
                    password: null
                }))
                .catch(error => { throw error })
        })
        .catch(error => { throw error })
