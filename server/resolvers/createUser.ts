import * as bcrypt from 'bcryptjs'
import { User } from '../models/User'
import { mapUser } from '../lib'

export const createUser = async ({ email, password }) => {
    try {
        const _user = await User.findOne({ email: email })
        if (_user) throw new Error('User exists already.')
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email: email,
            password: hashedPassword
        })
        return mapUser(await user.save())
    } catch (error) { throw error }
}

// export const createUser = async ({ userInput }) => {
//     try {
//         const _user = await User.findOne({ email: userInput.email })
//         if (_user) throw new Error('User exists already.')
//         const hashedPassword = await bcrypt.hash(userInput.password, 12)
//         const user = new User({
//             email: userInput.email,
//             password: hashedPassword
//         })
//         return mapUser(await user.save())
//     } catch (error) { throw error }
// }
