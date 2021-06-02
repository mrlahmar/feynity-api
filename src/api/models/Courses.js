const config = require('../../config/dbConfig')

const Courses = config.ModelFactory({
    label: 'Course',
    schema: {
        id: {
            type: 'number',
            required: true
        },
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
        },
        number_of_students: {
            type: 'number',
            required: true
        }
    },
    primaryKeyField: 'id',
    relationshipCreationKeys: {},
}, config.neogma);

module.exports = {Courses}