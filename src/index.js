if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

// Use Routes
app.use('/api/v1/learners', require('./api/routes/learners'))

app.listen(port, () => {
  console.log(`Feynity app listening at http://localhost:${port}`)
})