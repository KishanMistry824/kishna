import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
//  FaGoogle,
  FaUserShield,
} from "react-icons/fa";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    role: "",
    remember: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    role: Yup.string().oneOf(["Candidate", "admin"], "Select a valid role").required("Role is required"),
    remember: Yup.boolean(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { email, password, role } = values;

      // ✅ Hardcoded users
      const hardcodedUsers = [
        {
          email: "admin@portal.com",
          password: "admin123",
          role: "admin",
          fullName: "Admin User",
          _id: "admin-id-001",
        },
        {
          email: "candidate@portal.com",
          password: "candidate123",
          role: "Candidate",
          fullName: "Candidate User",
          _id: "candidate-id-001",
        },
      ];

      const matchedUser = hardcodedUsers.find(
        (user) => user.email === email && user.password === password && user.role === role
      );

      if (matchedUser) {
        const fakeToken = "fake.jwt.token";

        const userData = {
          token: fakeToken,
          fullName: matchedUser.fullName,
          role: matchedUser.role,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userId", matchedUser._id);
        localStorage.setItem("role", matchedUser.role);

        toast.success("Login successful!");

        setTimeout(() => {
          if (matchedUser.role === "admin") navigate("/admin-dashboard");
          else if (matchedUser.role === "Candidate") navigate("/dashboard");
          else navigate("/");
        }, 1500);

        return;
      }

      // 🧠 Backend login
      const res = await axios.post("http://localhost:5000/api/auth/login", values);

      const userId = res.data.user._id;
      const userRole = res.data.user.role;
      const fullName = res.data.fullName;

      if (res.data.token) {
        const userData = {
          token: res.data.token,
          fullName,
          role: userRole,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", userRole);

        toast.success("Login successful!");

        setTimeout(() => {
          if (userRole === "admin") navigate("/admin-dashboard");
          else if (userRole === "Candidate") navigate("/dashboard");
          else navigate("/");
        }, 1500);
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setSubmitting(false);
      if (!values.remember) resetForm();
    }
  };

  return (
    <div className="shadow-lg rounded-4 bg-white p-5 mx-auto" style={{ width: "420px" }}>
      <h3 className="text-center mb-4 fw-bold text-primary">Login</h3>
      <ToastContainer position="top-center" autoClose={3000} />

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form noValidate>
            <div className="mb-3">
              <label className="form-label">
                <FaUser className="me-2" /> Email
              </label>
              <Field
                type="email"
                name="email"
                className="form-control rounded-pill px-3"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaLock className="me-2" /> Password
              </label>
              <div className="input-group">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control rounded-start-pill px-3"
                  placeholder="Enter your password"
                />
                <span
                  className="input-group-text bg-light rounded-end-pill"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaUserShield className="me-2" /> Select Role
              </label>
              <Field as="select" name="role" className="form-select rounded-pill">
                <option value="">-- Select Role --</option>
                <option value="Candidate">Candidate</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-danger small mt-1" />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <Field type="checkbox" name="remember" className="form-check-input" id="remember" />
                <label htmlFor="remember" className="form-check-label small">Remember me</label>
              </div>
              <a href="/forgot-password" className="text-primary small text-decoration-none">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill fw-semibold mb-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            {/* <div className="text-center text-muted mb-2">or</div> */}
            {/* <button type="button" className="btn btn-outline-info w-100 rounded-pill fw-semibold">
              <FaGoogle className="me-2" />
              Login with Google
            </button> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;






// import React from "react";
// import axios from "axios";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const navigate = useNavigate();

//   const {
//     values,
//     handleChange,
//     handleSubmit,
//     handleBlur,
//     touched,
//     errors,
//     isSubmitting,
//     resetForm,
//   } = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//       remember: false,
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email").required("Email is required"),
//       password: Yup.string().min(6).required("Password is required"),
//     }),
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const res = await axios.post("http://localhost:5000/api/login", values);
//         console.log("Login response:", res.data);
//         const userId = res.data.user._id;
//         console.log("User ID from response:", userId);

//         if (res.data.token) {
//           const userData = {
//             token: res.data.token,
//             fullName: res.data.fullName,
//             role: res.data.role,
//           };

//           localStorage.setItem("user", JSON.stringify(userData));
//           localStorage.setItem("userId", userId);

//           // ✅ Save role in localStorage
//           localStorage.setItem("role", res.data.role);

//           toast.success("Login successful!");
//           setTimeout(() => navigate("/"), 2000);
//         } else {
//           toast.error("Invalid credentials!");
//         }
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Login failed!");
//       } finally {
//         setSubmitting(false);
//         if (!values.remember) resetForm();
//       }
//     },
//   });

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           className="form-control"
//           value={values.email}
//           onChange={handleChange}
//           onBlur={handleBlur}
//         />
//         {touched.email && errors.email && <small className="text-danger">{errors.email}</small>}
//       </div>

//       <div className="mb-3">
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           className="form-control"
//           value={values.password}
//           onChange={handleChange}
//           onBlur={handleBlur}
//         />
//         {touched.password && errors.password && <small className="text-danger">{errors.password}</small>}
//       </div>

//       <div className="form-check mb-3">
//         <input
//           type="checkbox"
//           name="remember"
//           className="form-check-input"
//           checked={values.remember}
//           onChange={handleChange}
//         />
//         <label className="form-check-label">Remember Me</label>
//       </div>

//       <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
//         {isSubmitting ? "Logging in..." : "Login"}
//       </button>
//     </form>
//   );
// };

// export default LoginForm;
