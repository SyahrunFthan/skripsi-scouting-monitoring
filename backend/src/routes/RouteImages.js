const express = require("express");
const ImageController = require("../controllers/ControllerImages");

const router = express.Router();

router.get("/", ImageController.getContributionImage);

module.exports = router;
