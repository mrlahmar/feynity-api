const router = require('express').Router()
const jwt = require('jsonwebtoken')
const learnerController = require('../controllers/learnerController')
const auth = require('../middlewares/auth')

// Learner Model
const Learner = require('../models/Learners').Learners;

// @route POST api/v1/learners/signin
// @desc Sign in as a Learner
// @access Public
router.post('/signin', (req,res) => learnerController.signin(req,res,Learner,jwt))

// @route POST api/v1/learners/signup
// @desc Register a new Learner
// @access Public
router.post('/signup', (req,res) => learnerController.signup(req,res,Learner,jwt))

// @route POST api/v1/learners/update
// @desc Update the profile information
// @access Private
router.patch('/update', auth, (req,res) => learnerController.update(req,res,Learner))

// @route POST api/v1/learners/delete
// @desc Delete my profile
// @access Private
router.delete('/delete', auth, (req,res) => learnerController._delete(req,res,Learner))

module.exports = router;