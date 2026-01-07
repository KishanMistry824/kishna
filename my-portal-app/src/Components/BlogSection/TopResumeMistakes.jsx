import React, { useState } from "react";
import RD from "../../Data/BlogData/TopResumeMistake.json";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import "react-toastify/dist/ReactToastify.css";

const TopResumeMistakes = () => {
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (tip, id) => {
        navigator.clipboard.writeText(tip);
        setCopiedId(id);
        toast.success("Tip copied!");
        setTimeout(() => setCopiedId(null), 1500);
    };

    /**
     * Export the resume mistakes and tips to a PDF and trigger a download.
     *
     * This function:
     * - Creates a new jsPDF document.
     * - Writes RD.title at coordinates (14, 20).
     * - Converts RD.items into table rows where each row contains:
     *     [ item.id, item.mistake, item.description, item.tip ]
     * - Inserts a table using autoTable with:
     *     - startY: 30
     *     - header: ["#", "Mistake", "Description", "Tip"]
     *     - styles: fontSize 10, cellPadding 2
     *     - headStyles: red fill ([255, 0, 0])
     * - Saves the document as "Resume_Mistakes_Tips.pdf" which triggers a download in the browser.
     *
     * Notes:
     * - Relies on the global/outer-scope variable `RD` with shape:
     *     { title: string, items: Array<{ id: any, mistake: string, description: string, tip: string }> }
     * - Requires jsPDF and the autoTable plugin to be available/imported.
     * - Intended to run in a browser environment (file download).
     * - Will throw or fail silently if jsPDF, autoTable, or RD are not defined or if RD.items is not iterable.
     *
     * @function handleExportPDF
     * @returns {void} No return value. Side effect: downloads a PDF file.
     */
    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text(RD.title, 14, 20);

        const rows = RD.items.map(item => [
            item.id,
            item.mistake,
            item.description,
            item.tip,
        ]);

        autoTable(doc, {
            startY: 30,
            head: [["#", "Mistake", "Description", "Tip"]],
            body: rows,
            styles: { fontSize: 10, cellPadding: 2 },
            headStyles: { fillColor: [255, 0, 0] },
        });

        doc.save("Resume_Mistakes_Tips.pdf");
    };

    const handleWhatsAppShare = () => {
        const text = RD.items.map(item =>
            `🔴 Mistake: ${item.mistake}\n📋 Description: ${item.description}\n✅ Tip: ${item.tip}`
        ).join("\n\n");

        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="container-fluid min-vh-100 py-5 bg-unique">
            {/* Inline CSS */}
            <style>{`
    /* ===== Unique Background ===== */
    .bg-unique {
      background: linear-gradient(135deg, #f9fafb, #eef2ff, #fdf2f8);
      position: relative;
      overflow: hidden;
    }
    /* Gradient wave animation */
    .bg-unique::before, .bg-unique::after {
      content: "";
      position: absolute;
      width: 140%;
      height: 140%;
      top: -20%;
      left: -20%;
      background: radial-gradient(circle at 30% 30%, rgba(59,130,246,0.15), transparent 70%),
                  radial-gradient(circle at 70% 70%, rgba(236,72,153,0.15), transparent 70%);
      animation: floaty 12s ease-in-out infinite alternate;
      z-index: 0;
    }
    .bg-unique::after {
      animation-delay: 6s;
    }
    @keyframes floaty {
      0% { transform: translateY(0px) rotate(0deg); }
      100% { transform: translateY(40px) rotate(8deg); }
    }

    /* Bring content above background */
    .container { position: relative; z-index: 1; }

    /* Modern buttons */
    .modern-btn {
      border-radius: 30px;
      padding: 6px 14px;
      transition: all 0.3s ease;
    }
    .modern-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    /* Glass card */
    .glass-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.25);
    }

    /* Tip highlight */
    .tip-box {
      background: linear-gradient(135deg, #f0fdf4, #dcfce7);
      border: 1px solid #bbf7d0;
      font-size: 0.95rem;
    }

    /* Category badge base */
    .badge-category {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
      border: 1px solid transparent;
    }

    /* Category variations */
    .category-formatting {
      background: linear-gradient(135deg, #e0f2fe, #bae6fd);
      color: #075985;
      border-color: #7dd3fc;
    }
    .category-content {
      background: linear-gradient(135deg, #fff7ed, #ffedd5);
      color: #9a3412;
      border-color: #fdba74;
    }
    .category-communication {
      background: linear-gradient(135deg, #f0fdfa, #ccfbf1);
      color: #065f46;
      border-color: #6ee7b7;
    }
    .category-design {
      background: linear-gradient(135deg, #f5f3ff, #ede9fe);
      color: #4c1d95;
      border-color: #c4b5fd;
    }
    .category-general {
      background: linear-gradient(135deg, #fdf4ff, #fae8ff);
      color: #701a75;
      border-color: #f0abfc;
    }
  `}</style>

            {/* Header */}
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                    <h2 className="fw-bold d-flex align-items-center">
                        <i className="bi bi-exclamation-circle-fill text-danger me-2"></i>
                        {RD.title}
                    </h2>
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-danger btn-sm modern-btn" onClick={handleExportPDF}>
                            <i className="bi bi-file-earmark-arrow-down me-1"></i> Export Tips
                        </button>
                        <button className="btn btn-outline-success btn-sm modern-btn" onClick={handleWhatsAppShare}>
                            <i className="bi bi-whatsapp me-1"></i> Share via WhatsApp
                        </button>
                    </div>
                </div>

                {/* Items */}
                <div className="row g-4">
                    {RD.items.map(item => {
                        const isCopied = copiedId === item.id;

                        // Map category → CSS class + icon
                        const categoryMap = {
                            "Formatting": { cls: "category-formatting", icon: "bi bi-text-paragraph" },
                            "Content": { cls: "category-content", icon: "bi bi-file-text" },
                            "Communication": { cls: "category-communication", icon: "bi bi-chat-dots" },
                            "Design": { cls: "category-design", icon: "bi bi-brush" },
                            "General": { cls: "category-general", icon: "bi bi-lightbulb" }
                        };
                        const { cls, icon } = categoryMap[item.category] || categoryMap["General"];

                        return (
                            <div className="col-md-6" key={item.id}>
                                <motion.div
                                    className={`card h-100 border-0 shadow-lg rounded-4 p-3 glass-card ${isCopied ? "border-success bg-success-subtle" : ""
                                        }`}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: item.id * 0.05 }}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title text-danger mb-2 d-flex align-items-center">
                                            <i className="bi bi-x-octagon-fill me-2 text-danger"></i>
                                            {item.mistake}
                                        </h5>

                                        {/* Category Badge with Icon */}
                                        <span className={`badge rounded-pill px-3 py-2 mb-3 badge-category ${cls}`}>
                                            <i className={`${icon}`}></i> {item.category}
                                        </span>

                                        {/* Description */}
                                        <p className="card-text text-secondary">
                                            <strong>Description:</strong> {item.description}
                                        </p>

                                        {/* Tip Section */}
                                        <div className="tip-box d-flex justify-content-between align-items-center rounded-4 p-3 mt-3">
                                            <div>
                                                <strong>Tip:</strong> {item.tip}
                                            </div>
                                            <button
                                                className="btn btn-sm btn-outline-dark modern-btn"
                                                onClick={() => handleCopy(item.tip, item.id)}
                                            >
                                                <i className="bi bi-clipboard me-1"></i> Copy
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <ToastContainer position="bottom-right" autoClose={1500} hideProgressBar />
        </div>



    );
};

export default TopResumeMistakes;



