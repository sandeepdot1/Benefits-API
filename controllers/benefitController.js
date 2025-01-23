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
exports.getBenefits = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;

  try {
    // If category is provided, fetch all benefits for that category without pagination
    if (category) {
      const benefits = await Benefit.find({ benefitCategory: category });

      return res.status(200).json({
        total: benefits.length,
        benefits,
      });
    }
    
    // Parse page and limit as integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Fetch benefits with pagination
    const benefits = await Benefit.find({})
      .skip((pageNumber - 1) * limitNumber) // Skip documents for previous pages
      .limit(limitNumber);  // Limit the number of documents returned

    // Get total count for all documents matching the query
    const totalCount = await Benefit.countDocuments({});

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


// Get all distinct benefit categories
exports.getAllBenefitCategories = async (req, res) => {
  try {
    const categories = await Benefit.distinct("benefitCategory");
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching benefit categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

