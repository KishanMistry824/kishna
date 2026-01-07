import React from "react";
import LinkedInData from "../../Data/BlogData/careerTip_linkedinProfile_advanced.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const CareerTipLinkedInProfileDetails = () => {
  if (!LinkedInData || !LinkedInData.content) return <p>Loading...</p>;

  // ===== EXPORT TO PDF =====
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(LinkedInData.title, 14, 20);
    doc.setFontSize(12);
    doc.text(LinkedInData.summary, 14, 30);

    LinkedInData.content.sections.forEach((section) => {
      const items =
        section.tips ||
        section.examples ||
        section.bestPractices ||
        section.actions ||
        section.recommendations ||
        section.structure ||
        section.suggestedSkills ||
        section.paragraphs ||
        [];

      autoTable(doc, {
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 40,
        head: [[section.heading]],
        body: items.map((item) => [typeof item === "string" ? item : JSON.stringify(item)]),
        theme: "striped",
        styles: { cellWidth: "wrap" },
        headStyles: { fillColor: [37, 99, 235] },
      });
    });

    doc.save("CareerTip_LinkedInProfile.pdf");
    toast.success("📄 PDF downloaded successfully!");
  };

  // ===== SHARE VIA WHATSAPP =====
  const handleShareWhatsApp = () => {
    const message =
      `💼 *${LinkedInData.title}*\n\n${LinkedInData.summary}\n\n📘 Sections:\n` +
      LinkedInData.content.sections
        .map(
          (s) =>
            `🔹 *${s.heading}*\n${(s.tips ||
              s.examples ||
              s.bestPractices ||
              s.recommendations ||
              s.actions ||
              [])
              .map((tip) => `   • ${tip}`)
              .join("\n")}`
        )
        .join("\n\n") +
      `\n\n🔗 Read more at: JobPortal.com`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  // ===== COPY FEATURE =====
  const copyTip = (tip) => {
    navigator.clipboard.writeText(tip);
    toast.success("✅ Copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container py-5"
    >
      <style>{`
        body {
          background: linear-gradient(135deg, #eef2ff, #e0f2fe);
        }
        .career-tip-wrapper {
          background: white;
          border-radius: 25px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
          padding: 40px;
          position: relative;
        }
        .career-header h1 {
          font-weight: 800;
          color: #2563eb;
        }
        .badge-career {
          background: linear-gradient(135deg, #6366f1, #2563eb);
          color: #fff;
          border-radius: 50px;
          padding: 6px 12px;
        }
        .modern-btn {
          border-radius: 30px;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        .modern-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 15px rgba(37,99,235,0.3);
        }
      `}</style>

      <div className="career-tip-wrapper">
        {/* HEADER */}
        <div className="career-header d-flex align-items-center gap-3 mb-3">
          <h1>{LinkedInData.title}</h1>
          <span className="badge-career">{LinkedInData.category}</span>
        </div>
        <p className="lead text-secondary">{LinkedInData.summary}</p>

        {/* ACTION BUTTONS */}
        <div className="mb-4 d-flex flex-wrap gap-3">
          <button className="btn btn-outline-primary modern-btn" onClick={handleExportPDF}>
            <i className="bi bi-file-earmark-pdf me-2"></i> Export PDF
          </button>
          <button className="btn btn-success modern-btn" onClick={handleShareWhatsApp}>
            <i className="bi bi-whatsapp me-2"></i> Share WhatsApp
          </button>
        </div>

        {/* SECTIONS */}
        <div className="accordion" id="linkedinProfileAccordion">
          {LinkedInData.content.sections.map((section, idx) => (
            <motion.div
              key={idx}
              className="accordion-item"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <h2 className="accordion-header" id={`heading-${idx}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${idx}`}
                >
                  {section.heading}
                </button>
              </h2>
              <div
                id={`collapse-${idx}`}
                className="accordion-collapse collapse"
                data-bs-parent="#linkedinProfileAccordion"
              >
                <div className="accordion-body">
                  <p className="text-secondary">{section.description}</p>
                  <ul className="list-group list-group-flush">
                    {(section.tips ||
                      section.examples ||
                      section.bestPractices ||
                      section.actions ||
                      section.recommendations ||
                      section.structure ||
                      section.suggestedSkills ||
                      []).map((tip, i) => (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span>{typeof tip === "string" ? tip : JSON.stringify(tip)}</span>
                        <button
                          className="btn btn-sm btn-outline-primary rounded-circle"
                          onClick={() => copyTip(typeof tip === "string" ? tip : JSON.stringify(tip))}
                        >
                          <i className="bi bi-clipboard"></i>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CONCLUSION */}
        {LinkedInData.content.conclusion && (
          <div className="alert alert-primary mt-5 py-3 px-4 rounded">
            {LinkedInData.content.conclusion.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <strong>{LinkedInData.content.conclusion.callToAction}</strong>
          </div>
        )}

        {/* RESOURCES */}
        {LinkedInData.resources && (
          <div className="mt-5">
            <h4 className="fw-bold mb-3 text-primary">
              <i className="bi bi-link-45deg me-2"></i> Further Reading
            </h4>
            <ul className="list-unstyled">
              {LinkedInData.resources.map((res, i) => (
                <li key={i} className="mb-2">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-info"
                  >
                    🔗 {res.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </motion.div>
  );
};

export default CareerTipLinkedInProfileDetails;
