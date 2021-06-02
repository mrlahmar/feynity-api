const bcrypt = require('bcryptjs')
const learnerValidator = require('../validations/learnerValidator')
const learnerServices = require('../services/learnerServices')

const signup = async (req,res,Learner,jwt) => {
    // Validate User Info
    if(!learnerValidator.validateSignup(req)) {
        return res.status(403).json({msg: 'Wrong Credentials'})
    }

    // Check User Existence
    if(! await learnerServices.findOneLearner(req,res,Learner)) {
        return res.status(403).json({msg: 'Something went wrong'})
    }

    await learnerServices.createOneLearner(req,res,Learner,bcrypt,jwt)
}

const signin = async (req, res, Learner, jwt) => {
    // Validate User Info
    if(!learnerValidator.validateSignin(req)) {
        return res.status(403).json('Unable to Submit Form')
    }

    await learnerServices.checkSignin(req,res,Learner,bcrypt,jwt)
}

const update = async (req, res, Learner) => {
    await learnerServices.updateLearner(req,res,Learner,bcrypt)
}

const _delete = async (req, res, Learner) => {
    await learnerServices.deleteLearner(req,res,Learner)
}

const get = async (req,res,Learner) => {
    await learnerServices.getLearner(req,res,Learner)
}

module.exports = {
    signin, signup, update, _delete, get
}