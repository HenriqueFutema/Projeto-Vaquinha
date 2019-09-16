const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const ProjectSchema = new mongoose.Schema({

    nameProject: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    images: {
        type: [{ type: String }]
    },

    hashtags: {
        type: String,
        required: false
    }

})

ProjectSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('Project', ProjectSchema)