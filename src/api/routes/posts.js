const router = require('express').Router()
const auth = require('../middlewares/auth')
const postController = require('../controllers/postController')

// Course Model
const Course = require('../models/Courses').Courses;
// Learner Model
const Learner = require('../models/Learners').Learners;
// Group Model
const Group = require('../models/Groups').Groups;
// Post Model
const Post = require('../models/Posts').Posts;

// @route POST api/v1/posts/create
// @desc Create a new post
// @access Private
router.post('/create', auth ,(req,res) => postController.create(req,res,Post,Learner))

// @route DELETE api/v1/posts/delete
// @desc Delete a post
// @access Private
router.delete('/delete', auth ,(req,res) => postController.deletePost(req,res,Post,Group))

module.exports = router;