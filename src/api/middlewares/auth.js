const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {
    const token = req.header('x-auth-token')

    // check for token
    if(!token) return res.status(401).json({msg: 'No token, authorization denied'})

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        // add user from payload
        req.learner = decoded
        next()
    } catch(e) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}

module.exports = auth