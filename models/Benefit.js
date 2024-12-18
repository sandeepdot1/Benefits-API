const mongoose = require('mongoose');

const benefitSchema = new mongoose.Schema({
  benefitName: {
    type: String,
    required: true
  },
  benefitInformation: {
    type: String,
    required: true
  },
  benefitCost: {
    type: String,
    required: true,
    default: 'Cost information not available for this benefit'
  },
  essentialInfo: {
    type: String,
    required: false
  },
  benefitCategory: {
    type: String,
    required: true
  },
  benefitProvider: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: 'InsuranceBenefits' 
});

module.exports = mongoose.model('Benefit', benefitSchema);