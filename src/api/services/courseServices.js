const addCourse = async (req,res,Course) => {
    // retrieve data
    const {title, platform, link, provider, description} = req.body

    try {
        const course = await Course.createOne({
            title,
            platform,
            link,
            provider,
            description
        })

        return res.status(200).json({msg: "Course added successfully", course: course.dataValues})

    } catch(e) {
        return res.status(500).json({msg: "Error Adding the Course"})
    }
}

module.exports = {
    addCourse
}