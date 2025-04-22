const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const adminRoutes = require('./routes/adminRoutes');
require('dotenv').config();
const methodOverride = require('method-override');
const app = express();



// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false
}));
app.use(authRoutes);
app.use('/', authRoutes);
app.use("/", adminRoutes);
app.use('/', dashboardRoutes);
app.use('/', userRoutes);
app.use('/', discussionRoutes);
// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sample Route
app.get('/', (req, res) => {
    res.render('homepage'); // you’ll create this EJS file later
});

// DB Connection + Server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(3000, () => console.log('Server running on http://localhost:3000'));
    })
    .catch((err) => console.log(err));
