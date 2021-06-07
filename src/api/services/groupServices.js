const {queryRunner} = require('../../config/dbConfig')

const createGroup = async (req,res,Group,Learner,Course) => {
    // retrieve data
    const {groupname, course, description} = req.body
    let [courseid, coursename] = course.split('/')
    courseid = parseInt(courseid)

    try {
        // fetch all group to get the max(id)
        const results = await Group.findMany()
        // parse data
        let groups = results.map(results => results.dataValues)
        // create a new group
        const group = await Group.createOne({
            id: groups.length + 1,
            name: groupname,
            description,
            course: coursename,
            courseid,
            creator: req.learner.email,
            number_of_members: 1,
        })

        await Group.relateTo({
            alias: 'Courses',
            where: {
                source: {
                    id: groups.length + 1
                },
                target: {
                    id: courseid
                }
            }
        })

        await Learner.relateTo({
            alias: 'Groups',
            where: {
                source: {
                    email: req.learner.email
                },
                target: {
                    id: groups.length + 1
                }
            }
        })

        return res.status(200).json({msg: "Group created successfully", group: group.dataValues})

    } catch(e) {
        // catch error
        return res.status(500).json({msg: "Error Adding the Group"})
    }
}

const myGroups = async (req,res,Group,Learner,Course) => {
    try {
        const result = await queryRunner.run(
            'MATCH (l:Learner)-[r:JOINED]->(g:Group) WHERE l.email= $email RETURN g',
            {
                email: req.learner.email
            }
        )
        return res.status(200).json(result.records.map(group => group.get('g').properties))
    } catch (error) {
        return res.status(500).json({msg: "Something went wrong"})   
    }
}

module.exports = {createGroup, myGroups}