const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user');

/* GET api listing. */
router.get('/', userController.getUsers);

module.exports = router;