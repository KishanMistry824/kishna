const express = require("express");
const { getCompanies } = require("../controllers/companyController.js");

const router = express.Router();

router.get("/", getCompanies);

module.exports = router;
