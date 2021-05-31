const {validateCourse} = require('../validations/courseValidator')
const {addCourse} = require('../services/courseServices')

// add a course to the library
const add = async (req,res,Course) => {
    // validate course info
    if(!validateCourse(req)) {
        return res.status(400).json({msg: "Unable to save course"})
    }

    // check if the course already exists

    // create course
    await addCourse(req,res,Course)

    //res.status(200).json({msg: 'Ahla bik'})
}

// fetch all courses from the database
const getall = async (req,res,Course) => {

}

module.exports = {
    getall, add
}