if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(express.json())
app.use(cors())

// Use Routes
app.use('/api/v1/learners', require('./api/routes/learners'))
/*
app.use('/api/v1/courses', require('./api/routes/courses'))
app.use('/api/v1/groups', require('./api/routes/groups'))
app.use('/api/v1/challenges', require('./api/routes/challenges')) */

app.listen(port, () => {
  console.log(`Feynity app listening at http://localhost:${port}`)
})