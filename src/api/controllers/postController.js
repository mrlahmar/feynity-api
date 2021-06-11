const postServices = require('../services/postServices')

const create = async (req,res,Post,Learner) => {
    await postServices.createPost(req,res,Post,Learner)
}

const deletePost = async (req,res,Post,Group) => {
    await postServices.deleteThePost(req,res,Post,Group)
}

const groupFeed = async (req,res,Post) => {
    await postServices.fetchGroupPosts(req,res,Post)   
}

const learnerFeed = async (req,res,Post) => {
    await postServices.fetchLearnerFeed(req,res,Post)   
}

module.exports = {
    create, deletePost,groupFeed,learnerFeed
}