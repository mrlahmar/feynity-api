const groupServices = require('../services/groupServices')

const create = async (req,res,Group,Learner,Course) => {
    // create a group in db
    // group based on a course
    // learner create this group (relation)

    // validate group info
    /*if(!validateCourse(req,Course)) {
        return res.status(400).json({msg: "Unable to save course"})
    }*/

    await groupServices.createGroup(req,res,Group,Learner,Course)
}

const showMyGroups = async (req,res,Group,Learner,Course) => {
    // fetch my groups
    await groupServices.myGroups(req,res,Group)
}

// get all groups
const getall = async (req,res,Group) => {
    await groupServices.fetchGroups(req,res,Group)
}

// get a group by its id
const getById = async (req,res,Group) => {
    await groupServices.fetchGroupById(req,res,Group)
}

// check if a learner joined a group or not
const checkJoined = async (req,res,Group) => {
    await groupServices.checkLearnerJoined(req,res,Group)
}

// get the groups of a specific course
const getGroupsByCourseId = async (req,res,Group) => {
    await groupServices.getCourseGroups(req,res,Group)
}

// a learner joins a group
const join = async (req,res,Learner,Group) => {
    await groupServices.joinGroup(req,res,Learner,Group)
}

// a learner leaves a group
const leave = async (req,res,Group) => {
    await groupServices.leaveGroup(req,res,Group)
}

// delete a group
const deleteGroup = async (req,res,Group) => {
    await groupServices.deleteTheGroup(req,res,Group)
}

// fetch all members
const allmembers = async (req,res) => {
    await groupServices.fetchAllMembers(req,res)
}

module.exports = {
    create, showMyGroups, getall, getById, checkJoined, getGroupsByCourseId, join, leave, deleteGroup, allmembers
}