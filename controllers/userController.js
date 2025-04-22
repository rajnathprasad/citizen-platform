const User = require('../models/User');

exports.renderProfilePage = (req, res) => {
    res.render('profile', { user: req.session.user });
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { name, email, phone, aadhaar } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, phone, aadhaar },
            { new: true }  // ✅ return the updated document
        );

        // ✅ Update session data with new info
        req.session.user = updatedUser;

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

