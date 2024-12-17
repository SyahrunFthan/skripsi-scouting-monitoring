const express = require("express");
const ContributionController = require("../controllers/ControllerContributions");
const schemaValidate = require("../middleware/Validate");
const Validation = require("../validations/Validation");

const router = express.Router();

router.post(
  "/create",
  schemaValidate(Validation.schemaContributions),
  ContributionController.createContribution
);
router.get("/", ContributionController.patchDataContribution);
router.get(
  "/school-activities",
  ContributionController.patchSchoolAndActivities
);
router.get("/:id", ContributionController.patchContributionById);
router.delete("/:id", ContributionController.deleteContribution);
router.patch("/:id", ContributionController.updateContribution);

module.exports = router;
