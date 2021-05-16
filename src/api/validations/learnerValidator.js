/* Validate if the data is not empty and valid
 * to either Sign Up or Sign In
*/

const verifyEmail = require('../helpers/learnerHelper').verifyEmail;

const validateSignup = (req,res,Learner) => {
    
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


const validateSignin = (req, res) => {
    // retrieving data
    const {email, password} = req.body;
    // check empty credentials
    if (!email || !password) return false
    // check email pattern
    if (!verifyEmail(email)) return false

    return true
}

module.exports = {
    validateSignin, validateSignup
}