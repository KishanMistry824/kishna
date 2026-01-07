// ResumeWriting.jsx
import React, { useEffect, useState } from "react";
import resumeTips from "../../Data/BlogData/ResumeWriting.json";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const ResumeWriting = () => {
  const [language, setLanguage] = useState("en");
  const [translatedTips, setTranslatedTips] = useState(resumeTips.sections);
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [matchScore, setMatchScore] = useState(null);

  const translateContent = async (langCode) => {
    if (langCode === "en") {
      setTranslatedTips(resumeTips.sections);
      return;
    }
    const translated = await Promise.all(
      resumeTips.sections.map(async (section) => {
        const tipsTranslated = await Promise.all(
          section.tips.map(async (tip) => {
            try {
              const res = await axios.get("https://api.mymemory.translated.net/get", {
                params: { q: tip, langpair: `en|${langCode}` },
              });
              return res.data.responseData.translatedText || tip;
            } catch {
              return tip;
            }
          })
        );

        // 🔧 Translate the category too
        let translatedCategory = section.category;
        try {
          const catRes = await axios.get("https://api.mymemory.translated.net/get", {
            params: { q: section.category, langpair: `en|${langCode}` },
          });
          translatedCategory = catRes.data.responseData.translatedText || section.category;
        } catch {
          translatedCategory = section.category;
        }

        return { ...section, category: translatedCategory, tips: tipsTranslated };
      })
    );
    setTranslatedTips(translated);
  };

  useEffect(() => {
    translateContent(language);
  }, [language]);

  const exportPDF = () => {
    html2canvas(document.querySelector("#resume-tips")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("Resume_Tips.pdf");
    });
  };

  const calculateMatchScore = () => {
    const resumeWords = resumeText.toLowerCase().split(/\W+/);
    const jobWords = jobDesc.toLowerCase().split(/\W+/);
    const jobSet = new Set(jobWords);
    let match = resumeWords.filter((word) => jobSet.has(word)).length;
    let score = Math.floor((match / jobSet.size) * 100);
    setMatchScore(score);
  };

  const getProgressColor = (score) => {
    if (score >= 80) return "bg-success";
    if (score >= 50) return "bg-warning";
    return "bg-danger";
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 display-4 fw-bold text-primary">
        📄 Resume Writing Assistant
      </h2>

      <div className="d-flex justify-content-end align-items-center mb-4">
        <label className="me-2 fw-semibold">🌐 Language:</label>
        <select
          className="form-select w-auto"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी (Hindi)</option>
          <option value="gu">ગુજરાતી (Gujarati)</option>
        </select>
      </div>

      <div id="resume-tips">
        {translatedTips.map((section, idx) => (
          <motion.div
            key={idx}
            className="card my-4 border-0 shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="card-header bg-gradient bg-dark text-white fs-5 fw-bold d-flex align-items-center">
              <span>📚 {section.category || "General Tips"}</span>
            </div>
            <ul className="list-group list-group-flush">
              {section.tips.map((tip, i) => (
                <li key={i} className="list-group-item fs-6">
                  ✅ {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
        <button onClick={exportPDF} className="btn btn-primary px-4">
          📤 Export to PDF
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent("Check out these amazing Resume Tips! 🚀")}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-success px-4"
        >
          📱 Share via WhatsApp
        </a>
      </div>

      <div className="mt-5">
        <h4 className="mb-4 fw-bold text-info">
          🧠 Resume Match Score (vs Job Description)
        </h4>

        <div className="row g-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Your Resume Content:</label>
            <textarea
              className="form-control rounded-3 border-info"
              rows={6}
              placeholder="I am a software engineer skilled in JavaScript, React, and Node.js. I have experience building full-stack web applications and working with MongoDB and Express.js. I have contributed to open-source projects and collaborated in agile environments."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Job Description:</label>
            <textarea
              className="form-control rounded-3 border-info"
              rows={6}
              placeholder="We are looking for a full-stack JavaScript developer with experience in React, Node.js, MongoDB, and Express. Candidates should have a background in agile development, teamwork, and communication."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <button onClick={calculateMatchScore} className="btn btn-lg btn-warning px-5">
            🎯 Calculate Match Score
          </button>
        </div>

        {matchScore !== null && (
          <div className="mt-5 text-center">
            <h5 className="fw-bold">Your Resume Match Score:</h5>
            <div className="progress mx-auto" style={{ height: "35px", maxWidth: "500px" }}>
              <div
                className={`progress-bar progress-bar-striped progress-bar-animated ${getProgressColor(
                  matchScore
                )}`}
                role="progressbar"
                style={{ width: `${matchScore}%` }}
              >
                {matchScore}% Match
              </div>
            </div>
            <p className="mt-3 fs-6 text-secondary">
              {matchScore >= 80
                ? "✅ Great match! Your resume is well aligned."
                : matchScore >= 50
                ? "⚠️ Partial match. You can improve it by adding relevant keywords."
                : "❌ Low match. Try tailoring your resume with the job description in mind."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeWriting;
