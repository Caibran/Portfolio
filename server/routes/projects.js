const express = require('express')
const { getDb } = require('../db')

const router = express.Router()

router.get('/', (req, res) => {
    const db = getDb()
    const { status, limit } = req.query
    const max = parseInt(limit) || 100

    let query = 'SELECT * FROM projects'
    const params = []

    if (status) {
        query += ' WHERE status = ?'
        params.push(status)
    }

    query += ' ORDER BY created_at DESC LIMIT ?'
    params.push(max)

    const projects = db.prepare(query).all(...params)
    res.json(projects)
})

router.get('/:id', (req, res) => {
    const db = getDb()
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id)
    if (!project) return res.status(404).json({ error: 'project not found' })
    res.json(project)
})

module.exports = router
