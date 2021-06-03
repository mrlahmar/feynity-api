const {validateCourse} = require('../validations/courseValidator')
const {addCourse, fetchCourses, fetchCourseById} = require('../services/courseServices')

// add a course to the library
const add = async (req,res,Course) => {
    // validate course info
    if(!validateCourse(req,Course)) {
        return res.status(400).json({msg: "Unable to save course"})
    }
    
    // create course
    await addCourse(req,res,Course)
}



// fetch all courses from the database
const getall = async (req,res,Course) => {
    // fetch all courses
    await fetchCourses(res,Course)
}

// fetch a course by id
const getById = async (req,res,Course) => {
    // fetch a course by id
    await fetchCourseById(req,res,Course)
}

module.exports = {
    getall, add, getById
}