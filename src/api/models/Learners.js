const config = require('../../config/dbConfig')

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
    primaryKeyField: 'email',
    relationshipCreationKeys: {},
}, config.neogma);

module.exports = {Learners}