const express = require('express')
const { getDb } = require('../db')

const router = express.Router()

router.get('/', (req, res) => {
    const db = getDb()
    const limit = parseInt(req.query.limit) || 100
    const posts = db.prepare('SELECT id, title, slug, excerpt, category, created_at FROM posts ORDER BY created_at DESC LIMIT ?').all(limit)
    res.json(posts)
})

router.get('/:slug', (req, res) => {
    const db = getDb()
    const post = db.prepare('SELECT * FROM posts WHERE slug = ?').get(req.params.slug)
    if (!post) return res.status(404).json({ error: 'post not found' })
    res.json(post)
})

module.exports = router
