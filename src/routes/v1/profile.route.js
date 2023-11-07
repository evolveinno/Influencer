const express = require("express");
const { profileController } = require("../../controllers");

const router = express.Router();
router
  .route("/")
  .post(profileController.createProfile)
  .get(profileController.getProfiles);

module.exports = router;
