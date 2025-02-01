const express = require('express');
const router = express.Router();
const benefitController = require('../controllers/benefitController');
const authenticate = require('../middleware/authenticate');

// Seed route for initial data
router.get('/seed', authenticate, benefitController.seedBenefits);

// Get all benefits
router.get('/', authenticate, benefitController.getBenefits);

// Get all distinct benefit categories
router.get('/categories', authenticate, benefitController.getAllBenefitCategories);

// Get benefit by unique ID
router.get('/:id', authenticate, benefitController.getBenefitById);


module.exports = router;