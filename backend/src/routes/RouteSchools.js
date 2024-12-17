const express = require("express");
const SchoolControllers = require("../controllers/ControllerSchools");
const schemaValidate = require("../middleware/Validate");
const Validation = require("../validations/Validation");

const router = express.Router();

router.post(
  "/",
  schemaValidate(Validation.schemaSchools),
  SchoolControllers.createSchools
);
router.patch(
  "/:id",
  schemaValidate(Validation.schemaSchools),
  SchoolControllers.updateSchools
);
router.get("/", SchoolControllers.getSchoolsData);
router.get("/:id", SchoolControllers.getSchoolById);
router.delete("/:id", SchoolControllers.deleteSchool);

module.exports = router;
