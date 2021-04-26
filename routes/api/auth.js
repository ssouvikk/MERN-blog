const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const config = require('config')


// @route GET api/auth
// @desc login user
// @access public
router.post('/', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ msg: 'plz enter all fields' })
    }
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'User does not exists' })
    const matched = await bcrypt.compare(password, user.password)
    if (!matched) return res.status(401).json({ msg: 'invalid credential' })
    const { _id, name } = user
    const token = await jwt.sign({ _id, email, name }, config.get('jwtSecret'), { expiresIn: 3600 })
    return res.json({ token, user: { _id, name, email } })
})

// @route GET api/auth
// @desc auth user
// @access private
router.get('/user', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    return res.json(user)
})


module.exports = router