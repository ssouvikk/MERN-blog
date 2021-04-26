const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Blogs = require('../../models/Blogs')


// @route GET api/blogs/public
// @desc Get all blogs
// @access public
router.get('/public', async (req, res) => {
    try {
        const blogs = await Blogs.find({})
        return res.json(blogs)
    } catch (error) {
        return res.status(500).json({ msg: 'something goes wrong' })
    }
})


// @route GET api/blogs
// @desc Get all user blogs
// @access private
router.get('/', auth, async (req, res) => {
    try {
        const blogs = await Blogs.find({ createdBy: req.user._id })
        return res.json(blogs)
    } catch (error) {
        return res.status(500).json({ msg: 'something goes wrong' })
    }
})

// @route POST api/blogs
// @desc add blog
// @access private
router.post('/', auth, async (req, res) => {
    try {
        const newBlog = new Blogs({
            title: req.body.title,
            body: req.body.body,
            createdBy: req.user._id
        })
        const lastBlog = await newBlog.save()
        return res.status(201).json(lastBlog)
    } catch (error) {
        return res.status(500).json({ msg: 'something goes wrong' })
    }
})

// @route DELETE api/blogs
// @desc delete blog
// @access private
router.delete('/:id', auth, async (req, res) => {
    try {
        const delBlog = await Blogs.deleteOne({ _id: req.params.id })
        if (delBlog) return res.json({ success: !!delBlog.n })
    } catch (error) {
        return res.json({ success: false })
    }
    /* Contact.findById(req.params.id)
        .then(contact => contact.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false })) */
})

// @route GET api/blogs/:id
// @desc get specific blog
// @access public
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blogs.findOne({ _id: req.params.id })
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(400).json({ msg: 'something goes wrong' })
    }
})


// @route UPDATE api/blogs/:id
// @desc update contact
// @access private
router.patch('/:id', auth, async (req, res) => {
    const { title, body } = req.body
    if (!title || !body) return res.status(400).json({ success: false })
    try {
        const updated = await Blogs.updateOne({ _id: req.params.id, createdBy: req.user._id }, { $set: { title, body } })
        if (updated) return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ success: false })
    }
})

module.exports = router