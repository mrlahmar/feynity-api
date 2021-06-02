const router = require('express').Router()
const auth = require('../middlewares/auth')
const courseController = require('../controllers/courseController')

// Course Model
const Course = require('../models/Courses').Courses;

// @route POST api/v1/courses/getall
// @desc Get all courses
// @access Public
router.get('/getall', (req,res) => courseController.getall(req,res,Course))

// @route POST api/v1/courses/add
// @desc Add a new course to the library
// @access Private
router.post('/add', auth ,(req,res) => courseController.add(req,res,Course))

// @route POST api/v1/courses/getById:id
// @desc Get a course information by its id
// @access Public
router.get('/getById/:id', (req,res) => courseController.getById(req,res,Course))
/*
// @route POST api/v1/courses/delete
// @desc Delete my profile
// @access Private
router.delete('/delete', auth, (req,res) => learnerController._delete(req,res,Learner))

// @route POST api/v1/courses/get
// @desc Get user data
// @access Private
router.post('/get', auth, (req,res) => learnerController.get(req,res,Learner)) */

module.exports = router;