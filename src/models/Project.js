const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ProjectSchema = new mongoose.Schema({

    doadores: {
        type: Number,
        required: true
    },

    DiaInit: {
        type: Number,
        required: true
    },

    VFinal: {
        type: Number,
        required: true
    },

    VAtual: {
        type: Number,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    images: {
        type: [{type: String}],
        required: true
    },

    plans: {
        type: [{title: String, desc: String, val: Number}],
        required: true
    },

    tags: {
        type: {tipo: String, local: String},
        required: true
    }
}, {
    timestamps: true
});

ProjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Project", ProjectSchema);