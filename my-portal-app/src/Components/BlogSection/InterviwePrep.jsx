import React from "react";
import IP from "../../Data/BlogData/InterviwePrep.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InterviewPrep = () => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(IP.title, 14, 20);
    doc.setFontSize(12);
    doc.text(IP.description, 14, 30);

    IP.sections.forEach((section, index) => {
      autoTable(doc, {
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 40,
        head: [[section.section]],
        body: section.tips.map((tip) => [tip]),
        theme: "striped",
        styles: { cellWidth: 'wrap' },
        headStyles: { fillColor: [25, 135, 84] },
      });
    });

    doc.save("Interview-Prep-Tips.pdf");
    toast.info("📄 PDF downloaded successfully!");
  };

  const handleShareWhatsApp = () => {
    const message = `🚀 ${IP.title}\n\n${IP.description}\n\nTips:\n` +
      IP.sections
        .map(
          (s) =>
            `🔹 ${s.section}\n` +
            s.tips.map((tip) => `   • ${tip}`).join("\n")
        )
        .join("\n\n");

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  const copyTip = (tip) => {
    navigator.clipboard.writeText(tip);
    toast.success("✅ Tip copied to clipboard!");
  };

  return (
   <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5 }}
  className="container py-5 interview-prep-container"
>
  <style>{`
    /* === Background === */
    .interview-prep-container {
      background: linear-gradient(135deg, #f9fafb, #f3e8ff, #ecfdf5);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.08);
      position: relative;
      overflow: hidden;
    }
    .interview-prep-container::before {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at 30% 30%, rgba(34,197,94,0.1), transparent 70%),
                  radial-gradient(circle at 70% 70%, rgba(139,92,246,0.1), transparent 70%);
      animation: floaty 10s ease-in-out infinite alternate;
      z-index: 0;
    }
    @keyframes floaty {
      from { transform: translateY(0px) rotate(0deg); }
      to { transform: translateY(30px) rotate(6deg); }
    }

    /* === Title & Badge === */
    .interview-prep-container h1 {
      font-weight: 700;
      z-index: 1;
      position: relative;
    }
    .badge-custom {
      border-radius: 20px;
      font-size: 0.8rem;
      letter-spacing: 1px;
      font-weight: 600;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      color: #fff !important;
      box-shadow: 0 4px 10px rgba(34,197,94,0.3);
    }

    /* === Buttons === */
    .modern-btn {
      border-radius: 25px;
      transition: all 0.3s ease;
    }
    .modern-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(0,0,0,0.15);
    }

    /* === Accordion Styling === */
    .accordion-button {
      font-weight: 600;
      background: #fff !important;
      border-radius: 12px !important;
      transition: all 0.3s ease;
    }
    .accordion-button:hover {
      background: linear-gradient(135deg, #f0fdf4, #dcfce7) !important;
      color: #166534 !important;
      box-shadow: 0 4px 12px rgba(34,197,94,0.2);
    }
    .accordion-item {
      border: none;
      margin-bottom: 12px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    /* === Tips List === */
    .list-group-item {
      border: none;
      padding: 12px 16px;
      border-radius: 10px;
      margin-bottom: 6px;
      transition: background 0.25s ease;
    }
    .list-group-item:hover {
      background: #f9fafb;
    }

    /* Copy button */
    .btn-copy {
      border-radius: 50%;
      padding: 5px 8px;
      transition: all 0.2s ease;
    }
    .btn-copy:hover {
      background: #16a34a;
      color: #fff;
      box-shadow: 0 0 8px rgba(22,163,74,0.4);
    }
  `}</style>

  {/* Header */}
  <div className="d-flex align-items-center mb-3 gap-2">
    <h1 className="text-success">{IP.title}</h1>
    <span className="badge badge-custom px-3 py-2">{IP.category}</span>
  </div>

  <p className="lead">{IP.description}</p>

  {/* Action Buttons */}
  <div className="mb-4 d-flex flex-wrap gap-2">
    <button className="btn btn-outline-success modern-btn" onClick={handleExportPDF}>
      📄 Export to PDF
    </button>
    <button className="btn btn-success modern-btn" onClick={handleShareWhatsApp}>
      <i className="bi bi-whatsapp me-1"></i> Share on WhatsApp
    </button>
  </div>

  {/* Accordion */}
  <div className="accordion" id="interviewPrepAccordion">
    {IP.sections.map((section, idx) => (
      <div className="accordion-item" key={idx}>
        <h2 className="accordion-header" id={`heading-${idx}`}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${idx}`}
          >
            {section.section}
          </button>
        </h2>
        <div
          id={`collapse-${idx}`}
          className="accordion-collapse collapse"
          data-bs-parent="#interviewPrepAccordion"
        >
          <div className="accordion-body">
            <ul className="list-group list-group-flush">
              {section.tips.map((tip, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <span>{tip}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary btn-copy ms-2"
                    onClick={() => copyTip(tip)}
                    title="Copy Tip"
                  >
                    📋
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ))}
  </div>

  <ToastContainer />
</motion.div>
  );
};

export default InterviewPrep;
