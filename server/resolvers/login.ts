import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { User } from '../models/User'

const TOKEN_EXPIRATION = 1

export const login = async ({ email, password }) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('User does not exist!')

    const isValid = await bcrypt.compare(password, (<any>user).password)
    if (!isValid) throw new Error('Password is incorrect!')

    const token = jwt.sign(
        { userId: user.id, email: (<any>user).email },
        process.env.PRIVATE_KEY,
        { expiresIn: TOKEN_EXPIRATION + 'h' }
    )

    return {
        userId: user.id,
        token,
        tokenExpiration: TOKEN_EXPIRATION
    }
}
