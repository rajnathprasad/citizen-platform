const Scheme = require('../models/Scheme');
const Comment = require('../models/Comment');

// View Scheme + Comments
exports.viewScheme = async (req, res) => {
    try {
        const scheme = await Scheme.findById(req.params.id);
        const comments = await Comment.find({ scheme: req.params.id }).populate('scheme', 'title');
        
        res.render('scheme', { scheme, comments });
    } catch (err) {
        console.log('Error fetching scheme:', err);
        res.send('Error fetching scheme');
    }
};

// Post Comment
exports.postComment = async (req, res) => {
    const { content } = req.body;
    const user = req.session.user.name; // Assuming user is logged in

    try {
        const newComment = new Comment({
            scheme: req.params.id,
            user,
            content
        });

        await newComment.save();
        res.redirect(`/scheme/${req.params.id}`);
    } catch (err) {
        console.log('Error posting comment:', err);
        res.send('Error posting comment');
    }
};
