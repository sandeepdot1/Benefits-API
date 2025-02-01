const mongoose = require('mongoose');

// const benefitSchema = new mongoose.Schema({
//   benefitName: {
//     type: String,
//     required: true
//   },
//   benefitInformation: {
//     type: String,
//     required: true
//   },
//   benefitCost: {
//     type: String,
//     required: true,
//     default: 'Cost information not available for this benefit'
//   },
//   essentialInfo: {
//     type: String,
//     required: false
//   },
//   benefitCategory: {
//     type: String,
//     required: true
//   },
//   benefitProvider: {
//     type: String,
//     required: true
//   }
// }, {
//   timestamps: true,
//   collection: 'InsuranceBenefits' 
// });

const descriptionSchema = new mongoose.Schema({
  heading: { type: String, required: false }, // Optional heading
  value: { 
    type: mongoose.Schema.Types.Mixed, // Can be a string or an array
    required: true,
  },
});

const newBenefitSchema = new mongoose.Schema({
  benefitCategory: { type: String, required: true },
  benefitCost: {
    bold: { type: String, required: false }, // Optional bold field
    description: {
      type: [descriptionSchema], // Array of description objects
      required: true,
    },
  },
  benefitEligibility: {
    type: [descriptionSchema], // Array of description objects
    required: true,
  },
  benefitFrequency: {
    type: [descriptionSchema], // Array of description objects
    required: true,
  },
  benefitName: { type: String, required: true },
  benefitProvider: { type: String, required: true },
},  {
  timestamps: true,
  collection: 'InsuranceBenefits' 
});

module.exports = mongoose.model('Benefit', newBenefitSchema);