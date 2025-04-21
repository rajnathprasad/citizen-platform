const Scheme = require('../models/Scheme');
exports.renderDashboard = async (req, res) => {
    try {
      const schemes = await Scheme.find().sort({ createdAt: -1 }); // fetch all schemes
      res.render('dashboard', { schemes, user: req.session.user }); // send data to EJS
    } catch (err) {
      console.error('Error loading dashboard:', err);
      res.status(500).send('Server Error');
    }
  };
