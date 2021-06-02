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
                                userData: {
                                    email: learner.dataValues.email,
                                    name: learner.dataValues.name,
                                    points: learner.dataValues.points
                                },
                                accessToken
                            })
    } catch(e) {
        return res.status(500).json({msg: 'Sign Up Error'})
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
            return res.status(404).json({msg: 'Wrong Credentials'})
        }

        if (!bcrypt.compareSync(password, learner.dataValues.password_hash)) {
            return res.status(404).json({msg: 'Wrong Credentials'})
        }

        const accessToken = jwt.sign(
                                        {email: learner.dataValues.email}, 
                                        process.env.ACCESS_TOKEN_SECRET
                                    )

        return res.status(200).json({
                                userData: {
                                    email: learner.dataValues.email,
                                    name: learner.dataValues.name,
                                    points: learner.dataValues.points
                                },
                                accessToken
                            })
    } catch(e) {
        return res.status(500).json({msg: 'Something went wrong'})
    }
}

const updateLearner = async (req,res,Learner,bcrypt) => {
    // validate data and return data to be updated
    const newLearner = validateUpdate(req,bcrypt)

    if (newLearner === null) {
        return res.status(400).json('Unable to update information')
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
        return res.status(200).json({msg: 'Success Updating', result})
    } catch(e) {
        return res.status(500).json({msg: 'Erreur Updating'})
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
            return res.status(403).json({msg: 'User Dosen\'t exists'})
        } 

        return res.status(200).json({msg: 'User Deleted Successfully'})
    } catch(e) {
        return res.status(500).json({msg: 'Something went wrong'})
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
            return res.status(401).json({msg: 'Something went wrong'})
        }

        return res.status(200).json({
                                userData: {
                                    email: learner.dataValues.email,
                                    name: learner.dataValues.name,
                                    points: learner.dataValues.points
                                }
                            })
    } catch(e) {
        return res.status(500).json({msg: 'Something went wrong'})
    }
}


module.exports = {
    findOneLearner, createOneLearner, checkSignin, updateLearner, deleteLearner, getLearner
}