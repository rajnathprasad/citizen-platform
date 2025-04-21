const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {requireAdmin} = require("../middlewares/adminMiddleware");

router.get("/admin/dashboard", requireAdmin, adminController.renderAdminDashboard);
router.get("/admin/schemes/new", requireAdmin, adminController.renderAddSchemeForm);
router.post("/admin/schemes", requireAdmin, adminController.addNewScheme);
router.get("/admin/schemes/edit/:id", requireAdmin, adminController.renderEditSchemeForm);
router.post("/admin/schemes/edit/:id", requireAdmin, adminController.updateScheme);
router.delete("/admin/schemes/delete/:id", requireAdmin, adminController.deleteScheme);

module.exports = router;
 