const express = require('express');
const router = express.Router();
const handleContactUs=require('../Controllers/contactController')
router.post('/contactus',handleContactUs);
module.exports = router;