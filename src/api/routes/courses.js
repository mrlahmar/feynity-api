const router = require('express').Router()
const auth = require('../middlewares/auth')
const courseController = require('../controllers/courseController')

// Course Model
const Course = require('../models/Courses').Courses;
// Learner Model
const Learner = require('../models/Learners').Learners;

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

// @route POST api/v1/courses/take
// @desc a learner took a course
// @access Private
router.post('/take', auth, (req,res) => courseController.take(req,res,Learner,Course))

// @route POST api/v1/courses/getMyCourses
// @desc Get learners courses
// @access Private
router.post('/getMyCourses', auth, (req,res) => courseController.getMyCourses(req,res,Learner,Course))

// @route POST api/v1/courses/getMyCourses
// @desc Get learners courses
// @access Private
router.post('/getMyCoursesWithProgress', auth, (req,res) => courseController.getMyCoursesWithProgress(req,res,Learner,Course))

// @route PATCH api/v1/courses/updateProgress
// @desc Get learners courses
// @access Private
router.patch('/updateProgress', auth, (req,res) => courseController.updateProgress(req,res,Learner,Course))

// @route DELETE api/v1/courses/quit
// @desc Quit course
// @access Private
router.delete('/quit', auth, (req,res) => courseController.quitCourse(req,res,Learner,Course))

// @route POST api/v1/courses/checkTook
// @desc Check if a learner is taking a course
// @access Private
router.post('/check', auth, (req,res) => courseController.checkTook(req,res,Learner,Course))

module.exports = router;