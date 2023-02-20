const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Course = new Schema(
    {
        video: { type: String},
        keyframe: { type: String },
        frame_id: { type: String },
        url: {type: String },
        path: {type: String },
        frame_position: {type: Number}
    },
    {
        timestamps: true,
    },
);

// Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Course', Course, 'keyframe');
