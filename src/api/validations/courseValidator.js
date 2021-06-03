const validateCourse = async (req, Course) => {
    // do it basic, after do link and platform check
    const {title, platform, link, provider, description} = req.body

    // check empty credentials
    if(!title || !platform || !link || !provider || !description) {
        return false
    }

    // verify platforms
    if (platform !== 'Udemy' && platform !== 'edX' && platform !== 'Coursera' && platform !== 'Linkedin Learning') {
        return false
    }

    // verify links
    if (platform === 'Udemy' && !link.includes('udemy.com')) {
        return false
    }

    if (platform === 'edX' && !link.includes('edx.org')) {
        return false
    }

    if (platform === 'Linkedin Learning' && !link.includes('linkedin.com/learning')) {
        return false
    }

    if (platform === 'Coursera' && !link.includes('coursera.org')) {
        return false
    }
  
    return true
}

module.exports = {
    validateCourse
}