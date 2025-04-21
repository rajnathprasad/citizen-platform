const User = require('../models/User');

exports.renderProfilePage = (req, res) => {
    res.render('profile', { user: req.session.user });
};

exports.updateProfile = async (req, res) => {
    const { name, email } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.session.user._id, { name, email }, { new: true });
        req.session.user = updatedUser;
        res.redirect('/profile');
    } catch (err) {
        console.log('Profile update error:', err);
        res.send('Error updating profile');
    }
};
