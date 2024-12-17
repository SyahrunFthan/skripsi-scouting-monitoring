const express = require("express");
const ActivitiesController = require("../controllers/ControllerActivities");
const Validation = require("../validations/Validation");
const schemaValidate = require("../middleware/Validate");

const router = express.Router();

router.post(
  "/create",
  schemaValidate(Validation.schemaActivities),
  ActivitiesController.CreateActivities
);
router.patch(
  "/update/:id",
  schemaValidate(Validation.schemaActivities),
  ActivitiesController.updateActivities
);
router.get("/", ActivitiesController.GetActivities);
router.get("/:id", ActivitiesController.GetActivitiesID);
router.delete("/:id", ActivitiesController.deleteActivities);

module.exports = router;