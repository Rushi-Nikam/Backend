const express = require('express');
const router = express.Router();
const {handlePlants,getAllPlants,getPlantByid,getplantByTitle} = require('../Controllers/plantControllers');
router.post('/plants',handlePlants);
router.get('/plants',getAllPlants);
router.get('/plants/:id',getPlantByid);
router.get('/plants/:title',getplantByTitle);
module.exports = router;