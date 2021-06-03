const {queryRunner} = require('../../config/dbConfig')

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

const takeCourse = async (req,res,Learner,Course) => {
    const {courseId} = req.body

    try {
        // add relation
        const rel = await Learner.relateTo(
            {
                alias: 'Courses',
                where: {
                    source: {
                        email: req.learner.email
                    },
                    target: {
                        id: courseId
                    }
                },
                properties: {
                    Date: Date.now().toString(),
                    Progress: 0,
                    Completed: false
                }
            }
        )

        // to throw error if relation already exists

        // update course number of students
        const nstudents_old = await Course.findOne({
            where: {
                id: courseId
            }
        })

        const number_of_students = nstudents_old.dataValues.number_of_students + 1
        const crs = await Course.update(
            {
                number_of_students
            },
            {
                where: {
                    id: courseId
                }
            }
        )

        return res.status(200).json({msg: 'Learner took the course successfully'})
    } catch (error) {
        return res.status(500).json({msg: 'Something went wrong'})
    }
}

const fetchMyCourses = async (req,res,Learner,Course) => {
    try {
        const result = await queryRunner.run(
            'MATCH (l:Learner)-[r:TOOK]->(c:Course) WHERE l.email= $email RETURN c',
            {
                email: req.learner.email
            }
        )
        return res.status(200).json(result.records.map(course => course.get('c').properties))
    } catch (error) {
        return res.status(500).json({msg: "Something went wrong"})   
    }
}

module.exports = {
    addCourse, fetchCourses, fetchCourseById, takeCourse, fetchMyCourses
}