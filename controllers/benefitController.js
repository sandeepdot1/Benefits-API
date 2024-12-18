const Benefit = require('../models/Benefit');
const benefitsData = require('../data/benefitsData');

// Seed database with initial data
exports.seedBenefits = async (req, res) => {
  try {
    // Remove existing benefits
    // await Benefit.deleteMany({});
    
    // Insert new benefits
    // const insertedBenefits = await Benefit.insertMany(benefitsData);
    
    res.status(201).json({
      message: 'Benefits seeded successfully',
      // count: insertedBenefits.length
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error seeding benefits', 
      error: error.message 
    });
  }
};

// Get all benefits
exports.getAllBenefits = async (req, res) => {
  try {
    const { planName, page = 1, limit = 10 } = req.query; // Extract query parameters, with defaults
    const query = planName ? { planName } : {};
    
    // Parse page and limit as integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Fetch benefits with pagination
    const benefits = await Benefit.find(query)
      .skip((pageNumber - 1) * limitNumber) // Skip documents for previous pages
      .limit(limitNumber);  // Limit the number of documents returned

    // Get total count for all documents matching the query
    const totalCount = await Benefit.countDocuments(query);

    res.status(200).json({
      totalCount, // Total number of matching documents
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / limitNumber),
      benefits
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving benefits',
      error: error.message
    });
  }
};


// Get benefit by unique ID
exports.getBenefitById = async (req, res) => {
  try {
    // Extract the `id` from request parameters
    const { id } = req.params; 

    // Find the benefit by its _id
    const benefit = await Benefit.findById(id);
    
    if (!benefit) {
      return res.status(404).json({ 
        message: 'Benefit not found' 
      });
    }
    
    res.status(200).json(benefit);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving benefit', 
      error: error.message 
    });
  }
};