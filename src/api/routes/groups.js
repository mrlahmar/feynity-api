const router = require('express').Router()
const auth = require('../middlewares/auth')
const groupController = require('../controllers/groupController')

// Course Model
const Course = require('../models/Courses').Courses;
// Learner Model
const Learner = require('../models/Learners').Learners;
// Group Model
const Group = require('../models/Groups').Groups;

// @route POST api/v1/groups/create
// @desc Create a new group
// @access Private
router.post('/create', auth ,(req,res) => groupController.create(req,res,Group,Learner,Course))

// @route POST api/v1/groups/mygroups
// @desc Get my groups
// @access Private
router.post('/mygroups', auth ,(req,res) => groupController.showMyGroups(req,res,Group,Learner,Course))

// @route GET api/v1/groups/getall
// @desc Get all groups
// @access Public
router.get('/getall', (req,res) => groupController.getall(req,res,Group))

// @route GET api/v1/groups/getById:id
// @desc Get a group information by its id
// @access Public
router.get('/getById/:id', (req,res) => groupController.getById(req,res,Group))

// @route POST api/v1/groups/checkJoined
// @desc Check if a learner is joined a group
// @access Private
router.post('/checkJoined', auth, (req,res) => groupController.checkJoined(req,res,Group))

// @route POST api/v1/groups/join
// @desc a learner joins a group
// @access Private
router.post('/join', auth, (req,res) => groupController.join(req,res,Learner,Group))

// @route GET api/v1/groups/getGroups/:courseid
// @desc Get groups based on a specific course
// @access Public
router.get('/getGroups/:courseid', (req,res) => groupController.getGroupsByCourseId(req,res,Group))

// @route DELETE api/v1/groups/leave
// @desc a user leaves a group
// @access Private
router.delete('/leave', auth ,(req,res) => groupController.leave(req,res,Group))

module.exports = router;