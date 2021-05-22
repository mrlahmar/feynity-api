const { validateUpdate } = require("../validations/learnerValidator");

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
                                        {email: learner.dataValues.email}, 
                                        process.env.ACCESS_TOKEN_SECRET
                                    )
        
        return res.status(200).json({
                                msg: 'Sign Up Successfull', 
                                learner: {
                                    email: learner.dataValues.email,
                                    name: learner.dataValues.name,
                                    points: learner.dataValues.points
                                },
                                accessToken
                            })
    } catch(e) {
        return res.status(400).json({msg: 'Sign Up Error'})
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
            res.status(400).json({msg: 'Wrong Credentials'})
        }

        const accessToken = jwt.sign(
                                        {email: learner.dataValues.email}, 
                                        process.env.ACCESS_TOKEN_SECRET
                                    )

        res.status(200).json({
                                msg: 'Sign In Successfull', 
                                learner: {
                                    email: learner.dataValues.email,
                                    name: learner.dataValues.name,
                                    points: learner.dataValues.points
                                },
                                accessToken
                            })
    } catch(e) {
        res.status(400).json({msg: 'Sign In Error'})
    }
}

const updateLearner = async (req,res,Learner,bcrypt) => {
    // validate data and return data to be updated
    const newLearner = validateUpdate(req,bcrypt)

    if (newLearner === null) {
        res.status(400).json('Unable to update information')
    }

    try{
        const result = await Learner.update(
            newLearner, 
            {
                where: {
                    email: req.learner.email
                }
            }
        )
        res.json(200).json({msg: 'Success Updating', result})
    } catch(e) {
        res.status(400).json({msg: 'Erreur Updating'})
    }
}

const deleteLearner = async (req,res,Learner) => {
    try {
        const result = await Learner.delete({
            where: {
                email: req.learner.email
            }
        })

        if(result === 0) {
            res.status(401).json({msg: 'User Dosen\'t exists'})
        } 

        res.status(200).json({msg: 'User Deleted Successfully'})
    } catch(e) {
        res.status(400).json({msg: 'Error Deleting User'})
    }
}

const getLearner = async (req,res,Learner) => {
    const email = req.learner.email;

    try{
        const learner = await Learner.findOne({
            where: {
                email
            }
        })

        if(learner === null) {
            res.status(400).json({msg: 'Something went wrong'})
        }

        res.status(200).json({
                                learner: {
                                    email: learner.dataValues.email,
                                    name: learner.dataValues.name,
                                    points: learner.dataValues.points
                                }
                            })
    } catch(e) {
        res.status(400).json({msg: 'Something went wrong'})
    }
}


module.exports = {
    findOneLearner, createOneLearner, checkSignin, updateLearner, deleteLearner, getLearner
}