const {queryRunner} = require('../../config/dbConfig')

const createPost = async (req,res,Post,Learner) => {
    // retrieve data
    const {title, content, group, groupid} = req.body

    try {
        // fetch all posts to get the max
        const results = await Post.findMany()
        // parse data
        const max = Math.max.apply(Math, results.map(results => results.dataValues.id))
        // create a new post
        
        const post = await Post.createOne({
            id: max + 1,
            title,
            content,
            author: req.learner.email,
            posttime: Date.now().toString(),
            group,
            groupid
        })

        await Post.relateTo({
            alias: 'Groups',
            where: {
                source: {
                    id: max + 1
                },
                target: {
                    id: groupid
                }
            }
        })
        
        await Learner.relateTo({
            alias: 'Posts',
            where: {
                source: {
                    email: req.learner.email
                },
                target: {
                    id: max + 1
                }
            }
        })
        
       return res.status(200).json({msg: "Post created successfully", post: post.dataValues})

    } catch(e) {
        // catch error
        return res.status(500).json({msg: "Error Adding the Post"})
    }
}

const deleteThePost = async (req,res,Post,Group) => {
    if (req.learner.email !== req.body.postcreator) {
        return res.status(403).json({msg:'Forbidden'})
    }

    try {
        // delete selected post
        await Post.delete({
            where: {
                id: req.body.postid
            },
            detach: true
        })

        return res.status(200).json({deleted: true})
    } catch(e) {
        // catch error
        return res.status(500).json({msg: "Error Fetching Posts"})
    }
}

const fetchLearnerFeed = async (req,res,Post) => {
    try {
        // fetched groups joined by the learner
        const results = await queryRunner.run(
            'MATCH (l:Learner)-[r:JOINED]->(g:Group) WHERE l.email= $email RETURN g',
            {
                email: req.learner.email
            }
        )
        
        // filter groups
        const groups = results.records.map(group => group.get('g').properties)

        // fetch posts and filter their value
        const fetchedPosts = await Post.findMany()
        const posts = fetchedPosts.map(post => post.dataValues)
        
        // filter posts by groups
        const filterByGroups = (posts, groups) => {
            let res = [];
            res = posts.filter(post => {
                return groups.find(group => {
                    return group.id === post.groupid;
                });
            });
            return res;
        }

        return res.status(200).json(filterByGroups(posts,groups))
    } catch(e) {
        // catch error
        return res.status(500).json({msg: "Error Fetching Posts"})
    }
}

const fetchGroupPosts = async (req,res,Post) => {
    // retrieve data
    const {groupid} = req.body

    try {
        // fetch all posts by group
        const posts = await Post.findMany({
            where: {
                groupid
            }
        })

        return res.status(200).json(posts.map(post => post.dataValues))
    } catch(e) {
        // catch error
        return res.status(500).json({msg: "Error Fetching Posts"})
    }
}

module.exports = {
    createPost, deleteThePost, fetchGroupPosts, fetchLearnerFeed
}