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
}

module.exports = {
    createPost, deleteThePost
}