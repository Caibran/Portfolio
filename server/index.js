const express = require('express')
const cors = require('cors')
const { initDb } = require('./db')
const postsRouter = require('./routes/posts')
const projectsRouter = require('./routes/projects')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// init database
initDb()

// routes
app.use('/api/posts', postsRouter)
app.use('/api/projects', projectsRouter)

// contact form handler (logs to console for now)
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'missing required fields' })
    }
    console.log(`\n--- New Message ---\nFrom: ${name} <${email}>\nSubject: ${subject || '(none)'}\n${message}\n---\n`)
    res.json({ ok: true })
})

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})
