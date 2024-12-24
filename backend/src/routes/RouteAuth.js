const express = require("express");
const AuthController = require("../controllers/ControllersAuth");
const schemaValidate = require("../middleware/Validate");
const Validation = require("../validations/Validation");
const Authentication = require("../middleware/Authentication");

const router = express.Router();

router.post("/", schemaValidate(Validation.schemaAuth), AuthController.Login);
router.post(
  "/create",
  Authentication.authenticate,
  schemaValidate(Validation.schemaCreateUser),
  AuthController.Register
);
router.delete("/remove-token/:id", AuthController.RemoveToken);
router.get("/:id", Authentication.authenticate, AuthController.patchUserLogin);

module.exports = router;
