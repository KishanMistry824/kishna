import Company from "../models/companyModel.js";

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({});
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error: error.message });
  }
};
