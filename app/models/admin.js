const mongoose = require('mongoose');

const collection = 'Admin';

const adminSchema = new mongoose.Schema({
    adminName: {
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

module.exports = mongoose.model(collection, adminSchema);