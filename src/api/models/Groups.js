const config = require('../../config/dbConfig')
const { Courses } = require('./Courses');

const Groups = config.ModelFactory({
    label: 'Group',
    schema: {
        id: {
            type: 'number',
            required: true
        },
        name: {
            type: 'string',
            minLength: 5,
            required: true,
        },
        description: {
            type: 'string',
            required: true
        },
        creator: {
            type: 'string',
            required: true
        },
        course: {
            type: 'string',
            required: true
        },
        courseid: {
            type: 'number',
            required: true
        },
        number_of_members: {
            type: 'number',
            required: true
        }
    },
    relationships: {
        Courses: {
            model: Courses,
            direction: 'out',
            name: 'BASED',
            properties: {
            
            }
        }  
    },
    primaryKeyField: 'id',
    relationshipCreationKeys: {},
}, config.neogma);

module.exports = {Groups}