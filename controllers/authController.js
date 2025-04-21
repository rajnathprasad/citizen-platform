const User = require('../models/User');
const bcrypt = require('bcrypt');

// Render Pages
exports.renderSignupPage = (req, res) => {
    res.render('auth/signup');
};

exports.renderLoginPage = (req, res) => {
    res.render('auth/login');
};

// Signup Logic
exports.handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send('Email already registered!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        req.session.user = newUser;
        res.redirect('/dashboard');
    } catch (err) {
        console.error("Signup error:", err);
        res.send('Error during signup');
    }
};

// Login Logic
exports.handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.send('Invalid email or password');
        }

        const match = await bcrypt.compare(password, user.password);
        console.log("Password match:", match);

        if (!match) {
            return res.send('Invalid email or password');
        }

        // Store user data in session
        req.session.user = user;

        // Check if the user is an admin and redirect accordingly
        if (user.isAdmin) {
            return res.redirect('/admin/dashboard');  // Admin dashboard
        } else {
            return res.redirect('/dashboard');  // Regular user dashboard
        }
    } catch (err) {
        console.error('Login error:', err);
        res.send('Error during login');
    }
};


// Logout
exports.handleLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error during logout');
        }
        res.redirect('/login');
    });
};
