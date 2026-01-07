
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const platforms = [
  { name: "LinkedIn", icon: "bi-linkedin" },
  { name: "GitHub", icon: "bi-github" },
  { name: "Instagram", icon: "bi-instagram" },
  { name: "Twitter", icon: "bi-twitter" },
  { name: "Dribbble", icon: "bi-dribbble" },
];

const linkSchema = Yup.object().shape({
  platform: Yup.string().required("Select a platform"),
  url: Yup.string()
    .matches(/^https?:\/\/.+/, "Must be a valid URL")
    .required("URL is required"),
});

const SocialLinks = () => {
  const userId = localStorage.getItem("userId");
  const [links, setLinks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState(null);
  const [autoPlatform, setAutoPlatform] = useState("");

  useEffect(() => {
    if (userId) fetchLinks();
  }, [userId]);

  const fetchLinks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/social-links/${userId}`);
      setLinks(res.data);
    } catch {
      toast.error(" Failed to load links");
    }
  };

  const handleAdd = async (values, actions) => {
    try {
      const res = await axios.post("http://localhost:5000/api/social-links", {
        ...values,
        userId,
      });
      setLinks([...links, res.data]);
      toast.success(" Link added");
      actions.resetForm();
      setAutoPlatform("");
    } catch {
      toast.error(" Add failed");
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleEdit = async (id, url) => {
    if (!/^https?:\/\/.+/.test(url)) {
      toast.warning(" Invalid URL");
      return;
    }
    try {
      const res = await axios.put(`http://localhost:5000/api/social-links/${id}`, { url });
      setLinks(links.map((l) => (l._id === id ? res.data : l)));
      setEditId(null);
      toast.success(" Link updated");
    } catch {
      toast.error(" Update failed");
    }
  };

  const handleToggle = async (id) => {
    try {
      const link = links.find((l) => l._id === id);
      const res = await axios.put(`http://localhost:5000/api/social-links/${id}`, {
        isConnected: !link.isConnected,
      });
      setLinks(links.map((l) => (l._id === id ? res.data : l)));
    } catch {
      toast.error(" Toggle failed");
    }
  };

  const confirmDelete = (id) => {
    setLinkToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/social-links/${linkToDelete}`);
      setLinks(links.filter((l) => l._id !== linkToDelete));
      setShowModal(false);
      toast.success(" Link deleted");
    } catch {
      toast.error(" Delete failed");
    }
  };

  return (
    <div className="container my-4">
      <ToastContainer />
      {/* <h4 className="text-center fw-bold mb-4 text-dark">
    🌐 Social Media Links
  </h4> */}

      {/* Form Section */}
      <Formik
        initialValues={{ platform: "", url: "" }}
        validationSchema={linkSchema}
        onSubmit={handleAdd}
      >
        {({ isSubmitting, isValid, values, setFieldValue }) => (
          <Form className="row g-3 align-items-end mb-4">
            {/* Platform Select */}
            <div className="col-md-3">
              <Field
                as="select"
                name="platform"
                className="form-select rounded-pill shadow-sm border-0"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <option value="">Select Platform</option>
                {platforms.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="platform"
                component="div"
                className="text-danger small mt-1"
              />
            </div>

            {/* URL Input */}
            <div className="col-md-6">
              <Field name="url">
                {({ field, form }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control rounded-pill shadow-sm border-0"
                    placeholder="https://yourprofile.com"
                    style={{ backgroundColor: "#f8f9fa" }}
                    onChange={(e) => {
                      field.onChange(e);
                      const url = e.target.value.toLowerCase();
                      const matched = platforms.find((p) =>
                        url.includes(p.name.toLowerCase())
                      );
                      if (matched && !form.values.platform) {
                        form.setFieldValue("platform", matched.name);
                        setAutoPlatform(matched.name);
                      }
                    }}
                  />
                )}
              </Field>
              <ErrorMessage
                name="url"
                component="div"
                className="text-danger small mt-1"
              />
            </div>

            {/* Add Button */}
            <div className="col-md-3">
              <button
                className="btn btn-success w-100 rounded-pill shadow-sm fw-semibold"
                type="submit"
                disabled={!isValid || isSubmitting || links.length >= 5}
                style={{ transition: "all 0.3s ease-in-out" }}
              >
                Add Link
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Social Link Cards */}
      {links.map((link, index) => (
        <motion.div
          key={link._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="card border-0 shadow-sm mb-3 rounded-4"
          style={{
            backgroundColor: "#ffffff",
            transition: "all 0.3s ease",
          }}
          whileHover={{ scale: 1.01, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
        >
          <div className="card-body d-flex justify-content-between align-items-center">
            {/* Left Info */}
            <div>
              <i
                className={`bi ${platforms.find((p) => p.name === link.platform)?.icon
                  } me-2 text-primary`}
              />
              <strong className="text-dark">{link.platform}</strong>
              <div className="text-muted small">{link.url}</div>
            </div>

            {/* Right Actions */}
            <div className="d-flex gap-2 align-items-center">
              {editId === link._id ? (
                <>
                  <input
                    className="form-control form-control-sm rounded-pill shadow-sm"
                    value={link.url}
                    onChange={(e) =>
                      setLinks(
                        links.map((l) =>
                          l._id === link._id
                            ? { ...l, url: e.target.value }
                            : l
                        )
                      )
                    }
                  />
                  <button
                    className="btn btn-success btn-sm rounded-pill shadow-sm"
                    onClick={() => handleEdit(link._id, link.url)}
                  >
                    save
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm rounded-pill"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-outline-primary btn-sm rounded-pill shadow-sm"
                    onClick={() => setEditId(link._id)}
                  >

                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm rounded-pill shadow-sm"
                    onClick={() => confirmDelete(link._id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`btn btn-sm rounded-pill shadow-sm ${link.isConnected ? "btn-danger" : "btn-outline-secondary"
                      }`}
                    onClick={() => handleToggle(link._id)}
                  >
                    {link.isConnected ? "Disconnect" : "Connect"}
                  </button>
                  <span
                    className={`badge rounded-pill ${link.isConnected
                        ? "bg-success text-light"
                        : "bg-light text-dark border"
                      }`}
                  >
                    {link.isConnected ? "Connected" : " Not Connected"}
                  </span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 shadow-lg border-0">
              <div className="modal-header border-0">
                <h5 className="modal-title text-danger fw-bold">
                  Confirm Delete
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this link?
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn btn-secondary rounded-pill"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger rounded-pill shadow-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLinks;