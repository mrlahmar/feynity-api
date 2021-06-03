const {validateCourse} = require('../validations/courseValidator')
const {addCourse, fetchCourses, fetchCourseById, takeCourse, fetchMyCourses} = require('../services/courseServices')

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


// take a course
const take = async (req,res,Learner,Course) => {
    await takeCourse(req,res,Learner,Course)
}

// get my courses
const getMyCourses = async (req,res,Learner,Course) => {
    await fetchMyCourses(req,res,Learner,Course)
}

module.exports = {
    getall, add, getById, take, getMyCourses
}