const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Scheme', schemeSchema);
