const config = require('../../config/dbConfig')

const Courses = config.ModelFactory({
    label: 'Course',
    schema: {
        title: {
            type: 'string',
            minLength: 5,
            required: true,
        },
        platform: {
            type: 'string',
            required: true
        },
        link: {
            type: 'string',
            required: true
        },
        provider: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true
        }
    },
    primaryKeyField: 'title',
    relationshipCreationKeys: {},
}, config.neogma);

module.exports = {Courses}