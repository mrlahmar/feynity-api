const validateCourse = (req) => {
    // do it basic, after do link and platform check
    const {title, platform, link, provider, description} = req.body

    // check empty credentials
    if(!title || !platform || !link || !provider || !description) {
        return false
    }

    // verify platforms
    // verify links

    

    return true
}

module.exports = {
    validateCourse
}