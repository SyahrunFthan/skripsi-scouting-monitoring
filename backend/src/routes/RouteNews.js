const express = require("express");
const Validation = require("../validations/Validation");
const schemaValidate = require("../middleware/Validate");
const NewsController = require("../controllers/ControllerNews");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.post(
  "/create",
  Authentication.authenticate,
  schemaValidate(Validation.schemaNews),
  NewsController.createNews
);
router.patch(
  "/update/:id",
  Authentication.authenticate,
  schemaValidate(Validation.schemaNews),
  NewsController.updateNews
);
router.delete(
  "/delete/:id",
  Authentication.authenticate,
  NewsController.deleteNews
);
router.get("/:id", Authentication.authenticate, NewsController.getNewsId);
router.get("/", Authentication.authenticate, NewsController.getAllNews);

module.exports = router;
