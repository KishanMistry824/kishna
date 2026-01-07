import React, { useRef } from "react";

const companies = [
  {
    title: "MNCs",
    count: "2.2K+",
    logos: ["/logo1.png", "/logo2.png", "/logo3.png", "/logo4.png"],
  },
  {
    title: "Edtech",
    count: "164",
    logos: ["/logo5.png", "/logo6.png", "/logo7.png", "/logo8.png"],
  },
  {
    title: "Healthcare",
    count: "625",
    logos: ["/logo9.png", "/logo10.png", "/logo11.png", "/logo12.png"],
  },
  {
    title: "Unicorns",
    count: "97",
    logos: ["/logo13.png", "/logo14.png", "/logo15.png", "/logo16.png"],
  },
  {
    title: "Internet",
    count: "252",
    logos: ["/logo17.png", "/logo18.png", "/logo19.png", "/logo20.png"],
  },
];

const TopHiringCompanies = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 280;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container my-5 position-relative">
      <h4 className="fw-bold mb-4">Top companies hiring now</h4>

      {/* Arrow Buttons */}
      <button
        className="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow"
        style={{ zIndex: 2 }}
        onClick={() => scroll("left")}
      >
        <i className="bi bi-chevron-left fs-5"></i>
      </button>
      <button
        className="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow"
        style={{ zIndex: 2 }}
        onClick={() => scroll("right")}
      >
        <i className="bi bi-chevron-right fs-5"></i>
      </button>

      {/* Scrollable Cards */}
      <div
        className="d-flex gap-3 pb-2 px-4"
        style={{
          overflowX: "hidden",
          scrollBehavior: "smooth",
        }}
        ref={scrollRef}
      >
        {companies.map((company, idx) => (
          <div key={idx} className="flex-shrink-0" style={{ width: "260px" }}>
            <div className="card p-3 shadow-sm border-0 rounded-4 h-100">
              <h6 className="fw-semibold mb-1">
                {company.title}{" "}
                <span className="text-muted" style={{ fontSize: "1.2rem" }}>
                  &rsaquo;
                </span>
              </h6>
              <p className="text-muted small mb-3">
                {company.count} are actively hiring
              </p>
              <div className="d-flex gap-2 flex-wrap">
                {company.logos.map((logo, i) => (
                  <img
                    key={i}
                    src={logo}
                    alt="logo"
                    width="40"
                    height="40"
                    className="rounded"
                    style={{
                      objectFit: "contain",
                      backgroundColor: "#f8f9fa",
                      padding: "4px",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopHiringCompanies;
