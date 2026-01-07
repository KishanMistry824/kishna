const express = require('express');
const router = express.Router();
const {
  createOrUpdateInternships,
  getInternships,
  deleteInternship
} = require('../controllers/internshipController');

router.post('/', createOrUpdateInternships);  // Create/Replace internships
router.get('/:userId', getInternships);       // Get internships for user
router.delete('/:id', deleteInternship);      // Delete internship by ID ✅

module.exports = router;
