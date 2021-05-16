const findOneLearner = async (req,res,Learner) => {
    try {
        const result = await Learner.findOne({
            where: {
                email: req.body.email
            }
        })

        //return result
        return result === null ? true : false
    } catch(e) {
        return false;
    }
}

const createOneLearner = async (req,res,Learner,bcrypt,jwt) => {
    // Retrive Data
    const {email, name, password} = req.body
    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);
    
    try{
        const learner = await Learner.createOne({
            email,
            password_hash,
            name,
            points: 0
        })

        const accessToken = jwt.sign(
                                        {learner: learner.dataValues.email}, 
                                        process.env.ACCESS_TOKEN_SECRET,
                                        {expiresIn: 3600}
                                    )
        
        res.status(200).json({
                                msg: 'Sign Up Successfull', 
                                learner: {
                                    email: learner.dataValues.email,
                                    name: learner.dataValues.name
                                },
                                accessToken
                            })
    } catch(e) {
        res.status(400).json({msg: 'Sign Up Error'})
    }
}

const checkSignin = async (req,res,Learner,bcrypt,jwt) => {
    // Retrive Data
    const {email, password} = req.body

    try{
        const learner = await Learner.findOne({
            where: {
                email
            }
        })

        if(learner === null) {
            res.status(400).json({msg: 'Wrong Credentials'})
        }

        if (!bcrypt.compareSync(password, learner.dataValues.password_hash)) {
            res.status(400).json({msg: 'Wrong Credentials 2'})
        }

        const accessToken = jwt.sign(
                                        {learner: learner.dataValues.email}, 
                                        process.env.ACCESS_TOKEN_SECRET,
                                        {expiresIn: 3600}
                                    )

        res.status(200).json({
                                msg: 'Sign In Successfull', 
                                learner: {
                                    email: learner.dataValues.email,
                                    name: learner.dataValues.name
                                },
                                accessToken
                            })
    } catch(e) {
        res.status(400).json({msg: 'Sign In Error'})
    }
}

module.exports = {
    findOneLearner, createOneLearner, checkSignin
}