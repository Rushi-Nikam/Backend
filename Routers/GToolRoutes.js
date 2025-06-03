const express = require('express');
const router = express.Router();
const GToolController = require('../Controllers/GToolController');

router.post('/Gtool',GToolController);
module.exports = router;