const express = require('express');
const { profileController } = require('../../controllers');

const router = express.Router();
router
    .route('/')
    .post(profileController.createProfile)
    .get(profileController.getProfile);

module.exports = router;