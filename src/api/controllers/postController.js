const postServices = require('../services/postServices')

const create = async (req,res,Post,Learner) => {
    await postServices.createPost(req,res,Post,Learner)
}

const deletePost = async (req,res,Post,Group) => {
    await postServices.deleteThePost(req,res,Post,Group)
}

module.exports = {
    create, deletePost
}