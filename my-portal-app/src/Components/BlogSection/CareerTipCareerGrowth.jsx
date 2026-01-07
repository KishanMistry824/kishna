import React from "react";
import CareerGrowthData from "../../Data/BlogData/CareerGrowth.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ✅ Add these in index.html if not already:
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" />
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

const CareerTipCareerGrowth = () => {
  // ====== EXPORT TO PDF ======
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(CareerGrowthData.title, 14, 20);
    doc.setFontSize(12);
    doc.text(CareerGrowthData.summary, 14, 30);

    CareerGrowthData.content.sections.forEach((section) => {
      autoTable(doc, {
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 40,
        head: [[section.heading]],
        body: (
          section.tips ||
          section.examples ||
          section.bestPractices || [section.description || ""]
        ).map((item) => [item]),
        theme: "striped",
        styles: { cellWidth: "wrap" },
        headStyles: { fillColor: [37, 99, 235] },
      });
    });

    doc.save("CareerTip_CareerGrowth.pdf");
    toast.info("📄 PDF downloaded successfully!");
  };

  // ====== SHARE VIA WHATSAPP ======
  const handleShareWhatsApp = () => {
    const message =
      `🚀 *${CareerGrowthData.title}*\n\n${CareerGrowthData.summary}\n\n📘 Sections:\n` +
      CareerGrowthData.content.sections
        .map(
          (s) =>
            `🔹 *${s.heading}*\n${(s.tips || [s.description])
              .map((tip) => `   • ${tip}`)
              .join("\n")}`
        )
        .join("\n\n") +
      `\n\n🔗 Read more at: YourCareerPortal.com`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  // ====== COPY FEATURE ======
  const copyTip = (tip) => {
    navigator.clipboard.writeText(tip);
    toast.success("✅ Copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="container py-5"
    >
      <style>{`
        body {
          background: linear-gradient(135deg, #f0f9ff, #e0e7ff, #f5f3ff);
        }
        .career-tip-wrapper {
          background: white;
          border-radius: 25px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        .career-tip-wrapper::before {
          content: "";
          position: absolute;
          top: -20%;
          left: -10%;
          width: 150%;
          height: 150%;
          background: radial-gradient(circle at 30% 30%, rgba(99,102,241,0.1), transparent 70%),
                      radial-gradient(circle at 70% 70%, rgba(168,85,247,0.1), transparent 70%);
          z-index: 0;
          animation: floaty 10s ease-in-out infinite alternate;
        }
        @keyframes floaty {
          from { transform: translateY(0px); }
          to { transform: translateY(20px); }
        }
        .career-header h1 {
          font-weight: 800;
          color: #2563eb;
        }
        .badge-career {
          background: linear-gradient(135deg, #6366f1, #2563eb);
          color: #fff;
          font-weight: 500;
          border-radius: 50px;
          padding: 6px 12px;
          box-shadow: 0 3px 10px rgba(37,99,235,0.3);
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
        .accordion-item {
          border: none;
          border-radius: 15px;
          margin-bottom: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .accordion-button {
          font-weight: 600;
          background: #f9fafb !important;
          color: #111827 !important;
        }
        .accordion-button:not(.collapsed) {
          background: linear-gradient(135deg, #2563eb, #6366f1) !important;
          color: #fff !important;
        }
        .list-group-item {
          border: none;
          background: #f9fafb;
          border-radius: 8px;
          margin-bottom: 6px;
        }
        .list-group-item:hover {
          background: #e0e7ff;
          transition: 0.3s;
        }
        .btn-copy {
          border-radius: 50%;
          background: transparent;
          color: #2563eb;
          border: 1px solid #2563eb;
          transition: all 0.2s;
        }
        .btn-copy:hover {
          background: #2563eb;
          color: #fff;
        }
      `}</style>

      <div className="career-tip-wrapper">
        {/* HEADER */}
        <div className="career-header d-flex align-items-center gap-3 mb-4">
          <h1>{CareerGrowthData.title}</h1>
          <span className="badge-career">{CareerGrowthData.category}</span>
        </div>

        <p className="lead text-secondary">{CareerGrowthData.summary}</p>

        {/* ACTION BUTTONS */}
        <div className="mb-4 d-flex flex-wrap gap-3">
          <button
            className="btn btn-outline-primary modern-btn px-4 py-2"
            onClick={handleExportPDF}
          >
            <i className="bi bi-file-earmark-pdf me-2"></i> Export PDF
          </button>
          <button
            className="btn btn-success modern-btn px-4 py-2"
            onClick={handleShareWhatsApp}
          >
            <i className="bi bi-whatsapp me-2"></i> Share WhatsApp
          </button>
        </div>

        {/* ACCORDION SECTIONS */}
        <div className="accordion" id="careerTipAccordion">
          {CareerGrowthData.content.sections.map((section, idx) => (
            <motion.div
              className="accordion-item"
              key={idx}
              initial={{ opacity: 0, y: 20 }}
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
                data-bs-parent="#careerTipAccordion"
              >
                <div className="accordion-body">
                  <p className="text-secondary mb-2">
                    {section.description?.replace(/:contentReference\[.*?\]/g, "")}
                  </p>
                  <ul className="list-group list-group-flush">
                    {(section.tips || []).map((tip, i) => (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span>{tip.replace(/:contentReference\[.*?\]/g, "")}</span>
                        <button
                          className="btn btn-sm btn-copy"
                          onClick={() => copyTip(tip)}
                          title="Copy Tip"
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
        <div className="alert alert-primary mt-5 py-3 px-4 rounded">
          {CareerGrowthData.content.conclusion.paragraphs.map((p, i) => (
            <p key={i} className="mb-2">{p}</p>
          ))}
          <strong className="text-dark">
            {CareerGrowthData.content.conclusion.callToAction}
          </strong>
        </div>

        {/* RESOURCES */}
        <div className="mt-5">
          <h4 className="fw-bold mb-3 text-primary">
            <i className="bi bi-link-45deg me-2"></i> Further Reading
          </h4>
          <ul className="list-unstyled">
            {CareerGrowthData.resources.map((res, i) => (
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

        <ToastContainer position="bottom-right" theme="colored" />
      </div>
    </motion.div>
  );
};

export default CareerTipCareerGrowth;
