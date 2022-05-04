const mongoose = require('mongoose');

const collection = 'Teacher';

const teacherSchema = new mongoose.Schema({
    teacherName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    collection
});

module.exports = mongoose.model(collection, teacherSchema);