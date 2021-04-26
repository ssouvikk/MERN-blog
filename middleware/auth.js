const config = require('config')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).json({ msg: 'no token, authorisation denied' })
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ msg: 'token is not valid' })
    }
}

module.exports = auth