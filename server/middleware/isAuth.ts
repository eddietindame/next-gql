import * as jwt from 'jsonwebtoken'

export const isAuth = (req, _res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        req.isAuth = false
        return next()
    }

    const token = authHeader.split(' ')[1]
    if (!token || token === '') {
        req.isAuth = false
        return next()
    }

    let signedToken
    try {
        signedToken = jwt.verify(token, process.env.PRIVATE_KEY)
    }
    catch (error) {
        req.isAuth = false
        return next()
    }

    if (!signedToken) {
        req.isAuth = false
        return next()
    }
    req.isAuth = true;
    req.userId = signedToken.userId
    return next()
}
