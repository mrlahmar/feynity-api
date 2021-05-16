/* Validate if the data is not empty and valid
 * to either Sign Up or Sign In
*/

const verifyEmail = require('../helpers/learnerHelper').verifyEmail;

const validateSignup = (req) => {
    
    /*
     * Verify User Sign Up
    */

    // retrieving data
    const {email, name, password, rpassword} = req.body;
    // check empty credentials
    if (!email || !password || !name || !rpassword) return false
    // check email pattern
    if (!verifyEmail(email)) return false
    // check password matches
    if (password !== rpassword) return false

    return true
}


const validateSignin = (req) => {
    // retrieving data
    const {email, password} = req.body;
    // check empty credentials
    if (!email || !password) return false
    // check email pattern
    if (!verifyEmail(email)) return false

    return true
}

const validateUpdate = (req,bcrypt) => {
    const {email, name, password, rpassword} = req.body;
    const user = {};

    if (email && verifyEmail(email) && (email !== req.learner.email)) {
        user.email = email
    }
    if (name) {
        user.name = name
    }
    if (password && (password === rpassword)) {
        const salt = bcrypt.genSaltSync(10);
        const password_hash = bcrypt.hashSync(password, salt);
        user.password_hash = password_hash
    }

    if (!(user.hasOwnProperty('email') || user.hasOwnProperty('name') || user.hasOwnProperty('password_hash'))) {
        return null
    }

    return user
}

module.exports = {
    validateSignin, validateSignup, validateUpdate
}