// Note: This is for testing purposes, in the final application this data will come from a mongo db

const benefitsData = [
    {
        benefitName: "Advance care planning",
        benefitInformation: "Medicare Part B (Medical Insurance) covers voluntary advance care planning as part of your yearly “Wellness” visit. Medicare may also cover this service as part of your medical treatment.",
        benefitCost: "You pay nothing for this planning if your doctor or other health care provider accepts assignment and it's part of your yearly “Wellness” visit. If you get it as part of other medical treatment, the Part B deductible and coinsurance apply.",
        essentialInfo: "For help with advance directives:\n\nContact your provider or attorney\nVisit the Eldercare Locator at eldercare.acl.gov\nContact your state health department",
        benefitCategory: "Preventive & Screening Services",
        benefitProvider: "Original Medicare (Parts A and B)"
    },
    {
        uniqueId: 'DOC001',
        benefitName: 'Physician Services',
        benefitInformation: 'Covers medical services provided by doctors and other healthcare professionals.',
        cost: '20% of Medicare-approved amount',
        additionalInfo: [
        'Includes office visits, consultations, and preventive services',
        'Annual wellness visit covered at no cost',
        'Specialist visits may require referral'
        ],
        planName: 'Part B'
    }
// Add more benefits as needed
];

module.exports = benefitsData;