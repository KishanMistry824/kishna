const express = require('express');
const router = express.Router();
const adminUserController = require('../controllers/adminUserController');

// =======================
// Admin Users / Candidates
// =======================

// Get all users (for admin table)
router.get('/', adminUserController.getAllUsers);

// Get single user by ID
router.get('/:id', adminUserController.getUserById);

// Block / Unblock user
router.put('/:id/block', adminUserController.blockUnblockUser);

// Delete user
router.delete('/:id', adminUserController.deleteUser);

module.exports = router;
