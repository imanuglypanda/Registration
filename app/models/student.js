const mongoose = require('mongoose');

const collection = 'Student';

const studentSchema = new mongoose.Schema({
    studentId : {
        type: String,
        require: true
    },
    studentThaName: {
        type: String,
        require: true
    },
    studentEngName: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        require: true
    },
    faculty: {
        type: String,
        required: true
    },
    syllabus: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    campus: {
        type: String,
        require: true
    },
    year: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    citizenId: String,
    race: String,
    birthDate: String,
    address: String,
    moo: String,
    road: String,
    county: String,
    local: String,
    district: String,
    province: String,
    postalCode: String
}, {
    versionKey: false,
    collection
});

module.exports = mongoose.model(collection, studentSchema);