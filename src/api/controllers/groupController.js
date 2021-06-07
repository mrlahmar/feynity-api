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

module.exports = {
    create, showMyGroups
}