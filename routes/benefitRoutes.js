const express = require('express');
const router = express.Router();
const benefitController = require('../controllers/benefitController');

// Seed route for initial data
router.get('/seed', benefitController.seedBenefits);

// Get all benefits
router.get('/', benefitController.getAllBenefits);

// Get benefit by unique ID
router.get('/:id', benefitController.getBenefitById);

module.exports = router;