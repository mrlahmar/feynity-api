const addCourse = async (req,res,Course) => {
    // retrieve data
    const {title, platform, link, provider, description} = req.body

    try {
        // fetch all courses to get the max(id)
        const results = await Course.findMany()
        // parse data
        let courses = results.map(results => results.dataValues)
        // add the new course
        const course = await Course.createOne({
            id: courses.length + 1,
            title,
            platform,
            link,
            provider,
            description,
            number_of_students: 0
        })

        return res.status(200).json({msg: "Course added successfully", course: course.dataValues})

    } catch(e) {
        // catch error
        return res.status(500).json({msg: "Error Adding the Course"})
    }
}

const fetchCourses = async (res,Course) => {
    try {
        // fetch all courses
        const results = await Course.findMany()
        // parse data
        let courses = results.map(results => results.dataValues)
        return res.status(200).json(courses)
    } catch (error) {
        // catch error
        return res.status(500).json({msg: "Something went wrong"})
    }
}

// fetch a course by id
const fetchCourseById = async (req,res,Course) => {
    try {
        // parse id to string
        const id = parseInt(req.params.id)
        // find the course by id
        const result = await Course.findOne({
            where: {
                id
            }
        })

        // parse data
        const course = result.dataValues
        return res.status(200).json(course)
    } catch (error) {
        // catch error
        return res.status(500).json({msg: "Something went wrong"})
    }
}

module.exports = {
    addCourse, fetchCourses, fetchCourseById
}