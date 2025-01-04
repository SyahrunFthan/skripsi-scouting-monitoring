const express = require("express");
const ContributionController = require("../controllers/ControllerContributions");
const schemaValidate = require("../middleware/Validate");
const Validation = require("../validations/Validation");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.use(Authentication.authenticate);
router.post(
  "/create",
  schemaValidate(Validation.schemaContributions),
  ContributionController.createContribution
);
router.get("/details/:id", ContributionController.detailContribution);
router.get("/", ContributionController.patchDataContribution);
router.get("/dashboard", ContributionController.patchDataDashboard);
router.get(
  "/school-activities",
  ContributionController.patchSchoolAndActivities
);
router.get("/:id", ContributionController.patchContributionById);
router.delete("/:id", ContributionController.deleteContribution);
router.patch("/:id", ContributionController.updateContribution);

module.exports = router;
