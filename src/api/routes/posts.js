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
router.delete('/delete', auth ,(req,res) => postController.deletePost(req,res,Post,Learner))

// @route POST api/v1/posts/groupfeed
// @desc Get a group posts
// @access Private
router.post('/groupfeed', auth ,(req,res) => postController.groupFeed(req,res,Post))

// @route POST api/v1/posts/feed
// @desc Get posts on all groups I joined
// @access Private
router.post('/feed', auth ,(req,res) => postController.learnerFeed(req,res,Post))

module.exports = router;