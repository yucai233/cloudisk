import jwt from 'jsonwebtoken'

const secret = "239847LJXHJkjdyfawejhj"

const createToken = (info, time) => {
    const token = jwt.sign(info, secret, {
        expiresIn: time
    })

    return token
}

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, res) => {
            if(err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

export default {
    createToken,
    verifyToken
}