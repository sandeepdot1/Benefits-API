const express = require('express');
const router = express.Router();
const benefitController = require('../controllers/benefitController');

// Seed route for initial data
router.get('/seed', benefitController.seedBenefits);

// Get all benefits
router.get('/', benefitController.getBenefits);

// Get all distinct benefit categories
router.get('/categories', benefitController.getAllBenefitCategories);

// Get benefit by unique ID
router.get('/:id', benefitController.getBenefitById);



module.exports = router;