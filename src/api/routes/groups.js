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

module.exports = router;