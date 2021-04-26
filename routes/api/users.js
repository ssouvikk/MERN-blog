const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const config = require('config')

// @route GET api/users
// @desc register new user
// @access public
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) return res.status(400).json({ msg: 'plz enter all fields' })
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ msg: 'this email is already registered' })
        const newUser = new User({ name, email, password })
        const hash = await bcrypt.hash(password, 10)
        newUser.password = hash
        const lastUser = await newUser.save()
        const { _id } = lastUser
        const token = await jwt.sign({ _id, name, email }, config.get('jwtSecret'), { expiresIn: 3600 })
        return res.status(201).json({ token, user: { _id, name, email } })
    } catch (error) {
        // console.log(error)
        return res.status(400).json({ msg: 'something goes wrong' })
    }
})

module.exports = router