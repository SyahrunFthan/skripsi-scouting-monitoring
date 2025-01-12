const express = require("express");
const SchoolControllers = require("../controllers/ControllerSchools");
const schemaValidate = require("../middleware/Validate");
const Validation = require("../validations/Validation");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.post(
  "/",
  Authentication.authenticate,
  schemaValidate(Validation.schemaSchools),
  SchoolControllers.createSchools
);
router.post("/import-data", SchoolControllers.createImporData);
router.patch(
  "/:id",
  Authentication.authenticate,
  schemaValidate(Validation.schemaSchools),
  SchoolControllers.updateSchools
);
router.get("/", Authentication.authenticate, SchoolControllers.getSchoolsData);
router.get("/home", SchoolControllers.getSchoolFromHome);
router.get("/detail/:id", SchoolControllers.getSchoolByDetail);
router.get("/search-key/get-id/:id", SchoolControllers.getSchoolSearchById);
router.get("/search", SchoolControllers.searchSchool);
router.get(
  "/:id",
  Authentication.authenticate,
  SchoolControllers.getSchoolById
);
router.delete(
  "/:id",
  Authentication.authenticate,
  SchoolControllers.deleteSchool
);

module.exports = router;
