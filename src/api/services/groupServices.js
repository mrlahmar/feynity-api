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

const fetchGroups = async (req,res,Group) => {
    try {
        // fetch all groups
        const results = await Group.findMany()
        // parse data
        let groups = results.map(results => results.dataValues)
        return res.status(200).json(groups)
    } catch (error) {
        // catch error
        return res.status(500).json({msg: "Something went wrong"})
    }
}

const fetchGroupById = async (req,res,Group) => {
    try {
        // parse id to string
        const id = parseInt(req.params.id)
        // find the group by id
        const result = await Group.findOne({
            where: {
                id
            }
        })

        // parse data
        const group = result.dataValues
        return res.status(200).json(group)
    } catch (error) {
        // catch error
        return res.status(500).json({msg: "Something went wrong"})
    }
}

// check if a learner joined a group or not
const checkLearnerJoined = async (req,res,Group) => {
    try {
        const result = await queryRunner.run(
            'MATCH (l:Learner)-[r:JOINED]->(g:Group) WHERE l.email= $email AND g.id = $groupid RETURN g',
            {
                email: req.learner.email,
                groupid: req.body.groupid
            }
        )
        
        return res.status(200).json({joined: result.records.map(group => group.get('g').properties).length > 0})
    } catch (error) {
        return res.status(500).json({msg: "Something went wrong"})   
    }
}

// a learner joins a group
const joinGroup = async (req,res,Learner,Group) => {
    const {groupid} = req.body

    try {
        // check if he took the course
        const result = await queryRunner.run(
            'MATCH (l:Learner)-[r:TOOK]->(c:Course) WHERE l.email = $email AND c.id = $id RETURN r',
            {
                email: req.learner.email,
                id: req.body.courseid
            }
        )

        if (result.records.map(rel => rel.get('r').properties).length === 0) {
            return res.status(403).json({msg: "Forbidden"})
        }

        // add relation
        const rel = await Learner.relateTo(
            {
                alias: 'Groups',
                where: {
                    source: {
                        email: req.learner.email
                    },
                    target: {
                        id: groupid
                    }
                }
            }
        )

        // update course number of members
        const nmembers_old = await Group.findOne({
            where: {
                id: groupid
            }
        })

        const number_of_members = nmembers_old.dataValues.number_of_members + 1
        const crs = await Group.update(
            {
                number_of_members
            },
            {
                where: {
                    id: groupid
                }
            }
        )

        return res.status(200).json({msg: 'Learner joined the group successfully'})
    } catch (error) {
        return res.status(500).json({msg: 'Something went wrong'})
    }
}

const getCourseGroups = async (req,res,Group) => {
    const id = parseInt(req.params.courseid)
    try {
        const result = await queryRunner.run(
            'MATCH (g:Group)-[r:BASED]->(c:Course) WHERE c.id = $id RETURN g',
            {
                id
            }
        )
        return res.status(200).json(result.records.map(group => group.get('g').properties))
    } catch (error) {
        return res.status(500).json({msg: "Something went wrong"})   
    }
}

// leaving a group
const leaveGroup = async (req,res,Group) => {
    const {groupid} = req.body
    try {
        const result = await queryRunner.run(
            'MATCH (l:Learner)-[r:JOINED]->(g:Group) WHERE l.email= $email AND g.id = $groupid DELETE r',
            {
                email: req.learner.email,
                groupid: groupid
            }
        )

        if (result.records.map(group => group.get('g').properties).length === 0) {
            
            // update group number of members
            const nmembers_old = await Group.findOne({
                where: {
                    id: groupid
                }
            })

            const number_of_members = nmembers_old.dataValues.number_of_members - 1
            await Group.update(
                {
                    number_of_members
                },
                {
                    where: {
                        id: groupid
                    }
                }
            )
            return res.status(200).json({deleted: true})
        } else {
            return res.status(401).json({deleted: false})
        }
        
    } catch (error) {
        return res.status(500).json({msg: "Something went wrong"}) 
    }
}

// delete the group 
const deleteTheGroup = async (req,res,Group) => {
    const {groupid, groupcreator} = req.body

    if (groupcreator !== req.learner.email) {
        return res.status(403).json({msg: "Forbidden"})
    }

    try {
        const result = await Group.delete({
            where: {
                id: groupid
            },
            detach: true
        })

        return res.status(200).json({deleted: true})
        
    } catch (error) {
        return res.status(500).json({msg: "Something went wrong"}) 
    }
}

module.exports = {createGroup, myGroups, fetchGroups,
    fetchGroupById, checkLearnerJoined, joinGroup, getCourseGroups, leaveGroup, deleteTheGroup}