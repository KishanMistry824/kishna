// // ===== Imports =====
// const express = require('express')
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config(); 

// const app = express();

// // ===== Middleware =====
// app.use(cors());
// app.use(express.json());

// // ===== Static File Serving =====
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ===== Route Imports =====
// const userRoutes = require("./routes/userRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const authRoutes = require("./routes/AuthRoutes");
// const dashboardRoutes = require("./routes/dashboardRoutes");
// const educationRoutes = require("./routes/educationRouter");
// const workExperienceRoutes = require("./routes/workExperienceRoutes");
// const internshipRoutes = require("./routes/internshipRoutes");
// const socialLinkRoutes = require("./routes/socialLinkRoutes");
// const skillRoutes = require("./routes/skillRoutes");
// const companyRoutes = require("./routes/companyRoutes");


// // ===== Mount Routes =====
// app.use("/api/users", userRoutes);
// app.use("/api/contacts", contactRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/education", educationRoutes);
// app.use("/api/work", workExperienceRoutes);
// app.use("/api/internships", internshipRoutes);
// app.use("/api/social-links", socialLinkRoutes);
// app.use("/api/skills", skillRoutes);
// app.use("/api/companies", companyRoutes);


// // ===== Default Route =====
// app.get("/", (req, res) => {
//   res.send("🚀 Job Portal API is running...");
// });

// // ===== Global Error Handler =====
// app.use((err, req, res, next) => {
//   console.error("❌ Error:", err.stack);
//   res.status(500).json({ error: "Something went wrong!" });
// });

// // ===== MongoDB Connection =====
// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/jobportal";

// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log(`✅ MongoDB connected: ${MONGO_URI}`);

//     // ===== Start Server =====
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () =>
//       console.log(`🚀 Server running at http://localhost:${PORT}`)
//     );
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection failed:", err.message);
//     process.exit(1);
//   });




// ===== Imports =====
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");


dotenv.config();

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Static File Serving =====
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== Route Imports =====
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/AuthRoutes")
const contactRoutes = require("./routes/contactRoutes");               //contact Routes import
// const authRoutes = require("./routes/AuthRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const educationRoutes = require("./routes/educationRouter");
const workExperienceRoutes = require("./routes/workExperienceRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const socialLinkRoutes = require("./routes/socialLinkRoutes");
const skillRoutes = require("./routes/skillRoutes");
const userJobRoutes = require("./routes/userJobRoutes");
const adminJobRoutes = require("./routes/adminJobRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes"); // Admin user routes
const companyRoutes = require("./routes/companyRoutes"); 
const resumeRoutes = require("./routes/resumeRoutes"); // Resume routes





// ===== Mount Routes =====
app.use("/api/users", userRoutes);
// app.use("/api/users/login",authRoutes);
app.use("/api", contactRoutes);            //Contact Api calling
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/work", workExperienceRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/social-links", socialLinkRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/jobs", userJobRoutes); 
app.use("/api/admin/jobs", adminJobRoutes); // Admin jobs
app.use('/api/admin/candidates', adminUserRoutes);
app.use("/api/companies", companyRoutes);   // Featured companies

app.use("/api/resume", resumeRoutes);

app.use("/uploads", express.static("uploads"));







// ===== 404 Handler =====
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ===== Global Error Handler =====
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});



// ===== MongoDB Connection & Server Start =====
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/jobportal";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`✅ MongoDB connected: ${MONGO_URI}`);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
