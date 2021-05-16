const bcrypt = require('bcryptjs')
const learnerValidator = require('../validations/learnerValidator')
const learnerServices = require('../services/learnerServices')

const signup = async (req,res,Learner,jwt) => {
    // Validate User Info
    if(!learnerValidator.validateSignup(req,res,Learner)) {
        res.status(400).json('Unable to Submit Form')
    }

    // Check User Existence
    if(! await learnerServices.findOneLearner(req,res,Learner)) {
        res.status(400).json('Learner Already Exists')
    }

    await learnerServices.createOneLearner(req,res,Learner,bcrypt,jwt)
}

const signin = async(req, res, Learner, jwt) => {
    // Validate User Info
    if(!learnerValidator.validateSignin(req,res,Learner)) {
        res.status(400).json('Unable to Submit Form')
    }

    await learnerServices.checkSignin(req,res,Learner,bcrypt,jwt)
}

const update = (req, res, Learner) => {
    const learner = req.learner
    res.status(200).json({msg: 'Authentification Works', learner});
}

const _delete = (req, res, Learner) => {
}

module.exports = {
    signin, signup, update, _delete
}

/* 
    Pseudo Code for Sign In
    1. Validation, DONE
    2. User Exists or Not (verify both email and password)
    3. If user info is correct, JWT
    4. HTTP requests
*/
