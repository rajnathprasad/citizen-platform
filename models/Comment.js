const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    scheme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scheme'
    },
    user: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);
