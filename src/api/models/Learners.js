const config = require('../../config/dbConfig');
const { Courses } = require('./Courses');

const Learners = config.ModelFactory({
    label: 'Learner',
    schema: {
        email: {
            type: 'string',
            required: true,
        },
        password_hash: {
            type: 'string',
            required: true,
        },
        name: {
            type: 'string',
            minLength: 3,
            required: true
        },
        points: {
            type: 'number',
            default: 0
        }
    },
    relationships: {
      Courses: {
        model: Courses,
        direction: 'out',
        name: 'TOOK',
        properties: {
            Date: {
                property: 'date',
                schema: {
                    type: 'string'
                }
            },
            Progress: {
                property: 'progress',
                schema: {
                    type: 'number'
                }
            },
            Completed: {
                property: 'completed',
                schema: {
                    type: 'boolean'
                }
            }
        }
      }  
    },
    primaryKeyField: 'email',
    relationshipCreationKeys: {},
}, config.neogma);

module.exports = {Learners}