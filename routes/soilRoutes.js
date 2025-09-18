// routes/soilRoutes.js
const express = require('express');
const router = express.Router();
const { getSoilData } = require('../controllers/soilController');

router.get('/soil', getSoilData);

module.exports = router;
