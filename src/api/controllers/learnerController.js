const bcrypt = require('bcryptjs')
const learnerValidator = require('../validations/learnerValidator')
const learnerServices = require('../services/learnerServices')

const signup = async (req,res,Learner,jwt) => {
    // Validate User Info
    if(!learnerValidator.validateSignup(req)) {
        return res.status(400).json({msg: 'Unable to Submit Form'})
    }

    // Check User Existence
    if(! await learnerServices.findOneLearner(req,res,Learner)) {
        return res.status(400).json({msg: 'Learner Already Exists'})
    }

    await learnerServices.createOneLearner(req,res,Learner,bcrypt,jwt)
}

const signin = async (req, res, Learner, jwt) => {
    // Validate User Info
    if(!learnerValidator.validateSignin(req)) {
        res.status(400).json('Unable to Submit Form')
    }

    await learnerServices.checkSignin(req,res,Learner,bcrypt,jwt)
}

const update = async (req, res, Learner) => {
    await learnerServices.updateLearner(req,res,Learner,bcrypt)
}

const _delete = async (req, res, Learner) => {
    await learnerServices.deleteLearner(req,res,Learner)
}

module.exports = {
    signin, signup, update, _delete
}