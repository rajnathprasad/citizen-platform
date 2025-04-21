const Scheme = require("../models/Scheme");

exports.renderAdminDashboard = async (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    console.log("Inside Admin Dashboard - session user:", req.session.user);
    return res.redirect("/dashboard");  // Regular user dashboard route
  }

  try {
    const schemes = await Scheme.find();
    res.render("adminDashboard", { user: req.session.user, schemes });
  } catch (err) {
    console.error("Error loading admin dashboard:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.renderAddSchemeForm = (req, res) => {
    res.render("addScheme");
  };
  
  exports.addNewScheme = async (req, res) => {
    const { title, description } = req.body;
  
    try {
      const newScheme = new Scheme({ title, description });
      await newScheme.save();
      res.redirect("/admin/dashboard");
    } catch (err) {
      console.error("Error adding new scheme:", err);
      res.status(500).send("Failed to add scheme");
    }
  };

  exports.renderEditSchemeForm = async (req, res) => {
    const { id } = req.params;
    try {
        const scheme = await Scheme.findById(id);
        if (!scheme) {
            return res.status(404).send("Scheme not found");
        }
        res.render("editScheme", { scheme });
    } catch (err) {
        console.error("Error loading scheme for editing:", err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateScheme = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
      const scheme = await Scheme.findById(id);
      if (!scheme) {
          return res.status(404).send("Scheme not found");
      }

      scheme.title = title;
      scheme.description = description;

      await scheme.save();
      res.redirect("/admin/dashboard");  // Redirect to the admin dashboard after update
  } catch (err) {
      console.error("Error updating scheme:", err);
      res.status(500).send("Failed to update scheme");
  }
};

exports.deleteScheme = async (req, res) => {
  const { id } = req.params;

  try {
      const scheme = await Scheme.findByIdAndDelete(id);
      if (!scheme) {
          return res.status(404).send("Scheme not found");
      }
      res.redirect("/admin/dashboard");  // Redirect to the admin dashboard after deleting the scheme
  } catch (err) {
      console.error("Error deleting scheme:", err);
      res.status(500).send("Failed to delete scheme");
  }
};
