const config = require('../../config/dbConfig')
const { Groups } = require('./Groups');

const Posts = config.ModelFactory({
    label: 'Group',
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
        content: {
            type: 'string',
            required: true
        },
        author: {
            type: 'string',
            required: true
        },
        group: {
            type: 'string',
            required: true
        },
        groupid: {
            type: 'number',
            required: true
        }
    },
    relationships: {
        Groups: {
            model: Groups,
            direction: 'out',
            name: 'IN',
            properties: {
            
            }
        }  
    },
    primaryKeyField: 'id',
    relationshipCreationKeys: {},
}, config.neogma);

module.exports = {Posts}