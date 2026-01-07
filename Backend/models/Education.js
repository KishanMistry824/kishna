// // models/Education.js

// // models/Education.js

// const mongoose = require("mongoose");

// const educationSchema = new mongoose.Schema({
//   userId: { type: String, required: true, unique: true },

//   secondary: {
//     tenth: {
//       score: String,
//       year: Number,
//     },
//     twelfth: {
//       score: String,
//       year: Number,
//     },
//   },

//   graduation: {
//     degree: String,
//     institute: String,
//     score: String,
//     startYear: Number,
//     endYear: Number,
//   },

//   postGraduation: {
//     degree: String,
//     institute: String,
//     score: String,
//     startYear: Number,
//     endYear: Number,
//   },
// });

// module.exports = mongoose.model("Education", educationSchema);












const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },

  secondary: {
    tenth: {
      score: { type: String, default: "" },
      year: { type: Number, default: null },
    },
    twelfth: {
      score: { type: String, default: "" },
      year: { type: Number, default: null },
    },
  },

  graduation: {
    degree: { type: String, default: "" },
    institute: { type: String, default: "" },
    score: { type: String, default: "" },
    startYear: { type: Number, default: null },
    endYear: { type: Number, default: null },
  },

  postGraduation: {
    degree: { type: String, default: "" },
    institute: { type: String, default: "" },
    score: { type: String, default: "" },
    startYear: { type: Number, default: null },
    endYear: { type: Number, default: null },
  },
});

module.exports = mongoose.model("Education", educationSchema);
