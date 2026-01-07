// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PersonalInfo = () => {
//   const userId = localStorage.getItem("userId");

//   const [userData, setUserData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//   });

//   const [personalInfo, setPersonalInfo] = useState({
//     dob: "",
//     gender: "",
//     nationality: "",
//     address: "",
//     linkedin: "",
//   });

//   const [profileImage, setProfileImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [showAdditional, setShowAdditional] = useState(false);

//   useEffect(() => {

//     if (!userId) return;
//     axios
//       .get(`http://localhost:5000/api/users/basic-info/${userId}`)
//       .then((res) => {
//         const data = res.data;
//         if (data) {
//           setUserData({
//             fullName: data.fullName,
//             email: data.email,
//             mobile: data.mobile,
//           });
//         }
//       })
//       .catch((err) => console.error("Error fetching personal info", err));
//   }, [userId]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setProfileImage(file);
//     if (file) setImagePreview(URL.createObjectURL(file));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPersonalInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!userId) return;

//     const formData = new FormData();
//     formData.append("userId", userId);
//     Object.entries(personalInfo).forEach(([key, value]) => formData.append(key, value));
//     if (profileImage) formData.append("profileImage", profileImage);

//     try {
//       const res = axios.post("http://localhost:5000/api/personal-info", formData);
//       alert(res.data.message);
//     } catch (err) {
//       console.error("Error saving personal info", err);
//       alert("Failed to save personal info.");
//     }
//   };

//   return (
//     <div className="container my-1">
//       <div className="card shadow-sm rounded-4 border-0 p-4">
//         {/* <h3 className="mb-4 fw-bold text-primary border-bottom pb-2">
//           <i className="bi bi-person-circle me-2"></i>Personal Information
//         </h3> */}

//         {/* Profile Picture */}
//         <div className="d-flex align-items-center mb-4">
//           <img
//             src={imagePreview || "https://via.placeholder.com/100"}
//             alt="Profile"
//             className="rounded-circle border border-3 shadow-sm me-4"
//             width="100"
//             height="100"
//           />
//           <div>
//             <label className="form-label fw-semibold">Profile Picture</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="form-control form-control-sm"
//             />
//           </div>
//         </div>

//         {/* User Info - Readonly */}
//         <div className="row mb-4">
//           <div className="col-md-4 mb-3">
//             <label className="form-label fw-semibold">Full Name</label>
//             <input type="text" className="form-control bg-light border-0 shadow-sm" value={userData.fullName} readOnly />
//           </div>
//           <div className="col-md-4 mb-3">
//             <label className="form-label fw-semibold">Email</label>
//             <input type="email" className="form-control bg-light border-0 shadow-sm" value={userData.email} readOnly />
//           </div>
//           <div className="col-md-4 mb-3">
//             <label className="form-label fw-semibold">Phone</label>
//             <input type="text" className="form-control bg-light border-0 shadow-sm" value={userData.mobile} readOnly />
//           </div>
//         </div>

//         {/* Toggle additional info */}
//         <button
//           type="button"
//           className="btn btn-outline-primary px-4 rounded-pill mb-4"
//           onClick={() => setShowAdditional(!showAdditional)}
//           aria-expanded={showAdditional}
//           aria-controls="additionalSection"
//         >
//           {showAdditional ? "Hide Additional Info" : "Add More Info"}
//         </button>

//         <div className={`collapse ${showAdditional ? "show" : ""}`} id="additionalSection">
//           <form onSubmit={handleSubmit}>
//             <div className="border-top pt-4">
//               <div className="row">
//                 <div className="col-md-4 mb-3">
//                   <label className="form-label fw-semibold">Gender</label>
//                   <select
//                     name="gender"
//                     className="form-select form-select-sm shadow-sm"
//                     value={personalInfo.gender}
//                     onChange={handleInputChange}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//                 <div className="col-md-4 mb-3">
//                   <label className="form-label fw-semibold">Date of Birth</label>
//                   <input
//                     type="date"
//                     name="dob"
//                     className="form-control form-control-sm shadow-sm"
//                     value={personalInfo.dob}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="col-md-4 mb-3">
//                   <label className="form-label fw-semibold">Nationality</label>
//                   <input
//                     type="text"
//                     name="nationality"
//                     className="form-control form-control-sm shadow-sm"
//                     placeholder="e.g. Indian"
//                     value={personalInfo.nationality}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label fw-semibold">Address</label>
//                   <textarea
//                     name="address"
//                     className="form-control form-control-sm shadow-sm"
//                     rows="2"
//                     placeholder="Street, City, State"
//                     value={personalInfo.address}
//                     onChange={handleInputChange}
//                   ></textarea>
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label fw-semibold">LinkedIn</label>
//                   <input
//                     type="url"
//                     name="linkedin"
//                     className="form-control form-control-sm shadow-sm"
//                     placeholder="https://linkedin.com/in/yourname"
//                     value={personalInfo.linkedin}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//               <button type="submit" className="btn btn-success w-100 rounded-pill mt-3 py-2 fw-bold shadow">
//                 <i className="bi bi-save me-2"></i>Save Info
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalInfo;



import React, { useState, useEffect } from "react";
import axios from "axios";

const PersonalInfo = () => {
  const userId = localStorage.getItem("userId");

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });

  const [personalInfo, setPersonalInfo] = useState({
    dob: "",
    gender: "",
    nationality: "",
    address: "",
    linkedin: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showAdditional, setShowAdditional] = useState(false);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:5000/api/users/basic-info/${userId}`)
      .then((res) => {
        const data = res.data;
        if (data) {
          setUserData({
            fullName: data.fullName,
            email: data.email,
            mobile: data.mobile,
          });
        }
      })
      .catch((err) => console.error("Error fetching personal info", err));
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    const formData = new FormData();
    formData.append("userId", userId);
    Object.entries(personalInfo).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (profileImage) formData.append("profileImage", profileImage);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/personal-info",
        formData
      );
      alert(res.data.message);
    } catch (err) {
      console.error("Error saving personal info", err);
      alert("Failed to save personal info.");
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg rounded-4 border-0 p-4">
        <h3 className="mb-4 fw-bold text-primary border-bottom pb-2">
          <i className="bi bi-person-circle me-2"></i>Personal Information
        </h3>

        {/* Profile Picture */}
        <div className="d-flex flex-column flex-md-row align-items-center mb-4 gap-3">
          <img
            src={imagePreview || "https://via.placeholder.com/120"}
            alt="Profile"
            className="rounded-circle border border-3 shadow-sm"
            width="120"
            height="120"
          />
          <div className="w-100">
            <label className="form-label fw-semibold mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control form-control-sm shadow-sm"
            />
          </div>
        </div>

        {/* User Info - Readonly */}
        <div className="row g-3 mb-4">
          {["Full Name", "Email", "Phone"].map((label, idx) => {
            const key = label.toLowerCase().replace(" ", "");
            return (
              <div className="col-md-4" key={idx}>
                <label className="form-label fw-semibold">{label}</label>
                <input
                  type={label === "Email" ? "email" : "text"}
                  className="form-control bg-light border-0 shadow-sm"
                  value={userData[key]}
                  readOnly
                />
              </div>
            );
          })}
        </div>

        {/* Toggle additional info */}
        <button
          type="button"
          className="btn btn-outline-primary px-4 rounded-pill mb-4 transition"
          onClick={() => setShowAdditional(!showAdditional)}
          aria-expanded={showAdditional}
          aria-controls="additionalSection"
        >
          {showAdditional ? "Hide Additional Info" : "Add More Info"}
        </button>

        <div
          className={`collapse ${showAdditional ? "show" : ""} transition`}
          id="additionalSection"
        >
          <form onSubmit={handleSubmit}>
            <div className="border-top pt-4">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Gender</label>
                  <select
                    name="gender"
                    className="form-select form-select-sm shadow-sm"
                    value={personalInfo.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    className="form-control form-control-sm shadow-sm"
                    value={personalInfo.dob}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Nationality</label>
                  <input
                    type="text"
                    name="nationality"
                    className="form-control form-control-sm shadow-sm"
                    placeholder="e.g. Indian"
                    value={personalInfo.nationality}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Address</label>
                  <textarea
                    name="address"
                    className="form-control form-control-sm shadow-sm"
                    rows="2"
                    placeholder="Street, City, State"
                    value={personalInfo.address}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    className="form-control form-control-sm shadow-sm"
                    placeholder="https://linkedin.com/in/yourname"
                    value={personalInfo.linkedin}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button className="btn btn-success w-100 rounded-pill mt-4 py-2 fw-bold shadow-sm hover-scale">
                <i className="bi bi-save me-2"></i>Save Info
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Additional CSS for smooth transitions */}
      <style>{`
        .transition {
          transition: all 0.3s ease-in-out;
        }
        .hover-scale:hover {
          transform: scale(1.02);
          transition: transform 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PersonalInfo;
