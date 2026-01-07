const express = require("express");
const router = express.Router();
const {
  getLinks,
  createLink,
  updateLink,
  deleteLink
} = require("../controllers/socialLinkController");

router.get("/:userId", getLinks);
router.post("/", createLink);
router.put("/:id", updateLink);
router.delete("/:id", deleteLink);

module.exports = router;
