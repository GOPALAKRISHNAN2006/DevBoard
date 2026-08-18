import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiBriefcase,
  FiBook,
  FiAward,
  FiFileText,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiTarget,
  FiZap,
  FiArrowRight,
} from "react-icons/fi";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import { Modal } from "react-bootstrap";
import "./Resume.css";

export default function Resume() {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [preview, setPreview] = useState(false);

  // Modals state
  const [showSummary, setShowSummary] = useState(false);
  const [showExp, setShowExp] = useState(false);
  const [showEdu, setShowEdu] = useState(false);
  const [showCert, setShowCert] = useState(false);

  // Form states
  const [summaryForm, setSummaryForm] = useState({
    headline: "",
    summary: "",
    skills: "",
  });

  const [expForm, setExpForm] = useState({
    _id: null,
    company: "",
    role: "",
    duration: "",
    description: "",
  });

  const [eduForm, setEduForm] = useState({
    _id: null,
    institute: "",
    degree: "",
    year: "",
    cgpa: "",
  });

  const [certForm, setCertForm] = useState({
    _id: null,
    title: "",
    issuer: "",
    year: "",
  });
  const [certEditIndex, setCertEditIndex] = useState(null);

  const completionItems = data
    ? [
      {
        label: "Professional headline",
        done: Boolean(data.headline),
      },
      {
        label: "Career summary",
        done: Boolean(data.summary),
      },
      {
        label: "Add 3+ skills",
        done: (data.skills?.length || 0) >= 3,
      },
      {
        label: "Work experience",
        done: (data.experience?.length || 0) > 0,
      },
      {
        label: "Education",
        done: (data.education?.length || 0) > 0,
      },
      {
        label: "Certification",
        done: (data.certifications?.length || 0) > 0,
      },
    ]
    : [];

  const completedCount = completionItems.filter(
    (item) => item.done
  ).length;

  const completion =
    Math.round(
      (completedCount / completionItems.length) * 100
    ) || 0;

  const load = async () => {
    try {
      const { data: resData } =
        await api.get("/user/resume");

      setData(
        resData || {
          headline: "",
          summary: "",
          skills: [],
          experience: [],
          education: [],
          certifications: [],
        }
      );
    } catch {
      setData({
        headline: "",
        summary: "",
        skills: [],
        experience: [],
        education: [],
        certifications: [],
      });
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const saveOverall = async (updatedData) => {
    try {
      const isNew = !data?._id;

      if (isNew) {
        await api.post("/user/resume", updatedData);
      } else {
        await api.put("/user/resume", updatedData);
      }

      toast.success("Resume updated");
      await load();
      return true;
    } catch (e) {
      toast.error(
        e.response?.data?.message ||
        "Unable to save resume"
      );
      return false;
    }
  };

  /* Summary Handlers */

  const openSummary = () => {
    setSummaryForm({
      headline: data.headline || "",
      summary: data.summary || "",
      skills: Array.isArray(data.skills)
        ? data.skills.join(", ")
        : "",
    });

    setShowSummary(true);
  };

  const saveSummary = (e) => {
    e.preventDefault();

    saveOverall({
      ...data,
      headline: summaryForm.headline,
      summary: summaryForm.summary,
      skills: summaryForm.skills
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    });

    setShowSummary(false);
  };

  /* Experience Handlers */

  const openExp = (item = null) => {
    if (item) {
      setExpForm(item);
    } else {
      setExpForm({
        _id: null,
        company: "",
        role: "",
        duration: "",
        description: "",
      });
    }

    setShowExp(true);
  };

  const saveExp = (e) => {
    e.preventDefault();

    let newExp = [...(data.experience || [])];

    if (expForm._id) {
      newExp = newExp.map((x) =>
        x._id === expForm._id ? expForm : x
      );
    } else {
      newExp.push(expForm);
    }

    saveOverall({
      ...data,
      experience: newExp,
    });

    setShowExp(false);
  };

  const deleteExp = (id) => {
    if (!window.confirm("Delete this experience?"))
      return;

    saveOverall({
      ...data,
      experience: data.experience.filter(
        (x) => x._id !== id
      ),
    });
  };

  /* Education Handlers */

  const openEdu = (item = null) => {
    if (item) {
      setEduForm(item);
    } else {
      setEduForm({
        _id: null,
        institute: "",
        degree: "",
        year: "",
        cgpa: "",
      });
    }

    setShowEdu(true);
  };

  const saveEdu = (e) => {
    e.preventDefault();

    let newEdu = [...(data.education || [])];

    if (eduForm._id) {
      newEdu = newEdu.map((x) =>
        x._id === eduForm._id ? eduForm : x
      );
    } else {
      newEdu.push(eduForm);
    }

    saveOverall({
      ...data,
      education: newEdu,
    });

    setShowEdu(false);
  };

  const deleteEdu = (id) => {
    if (!window.confirm("Delete this education?"))
      return;

    saveOverall({
      ...data,
      education: data.education.filter(
        (x) => x._id !== id
      ),
    });
  };

  /* Certification Handlers */

  const openCert = (item = null, index = null) => {
    if (item) {
      setCertForm({
        _id: item._id || null,
        title: item.title || "",
        issuer: item.issuer || "",
        year: item.year || "",
      });
    } else {
      setCertForm({
        _id: null,
        title: "",
        issuer: "",
        year: "",
      });
    }

    setCertEditIndex(index);
    setShowCert(true);
  };

  const saveCert = async (e) => {
    e.preventDefault();

    const currentData = data || {
      headline: "",
      summary: "",
      skills: [],
      experience: [],
      education: [],
      certifications: [],
    };

    let newCert = [...(currentData.certifications || [])];
    const certToSave = {
      title: certForm.title,
      issuer: certForm.issuer,
      year: certForm.year,
      ...(certForm._id ? { _id: certForm._id } : {}),
    };

    if (certEditIndex !== null && certEditIndex >= 0) {
      newCert[certEditIndex] = certToSave;
    } else {
      newCert.push(certToSave);
    }

    const saved = await saveOverall({
      ...currentData,
      certifications: newCert,
    });

    if (saved) {
      setCertEditIndex(null);
      setShowCert(false);
    }
  };

  const deleteCert = (index) => {
    if (!window.confirm("Delete this certification?"))
      return;

    saveOverall({
      ...data,
      certifications: data.certifications.filter(
        (_, currentIndex) => currentIndex !== index
      ),
    });
  };

  if (!loaded) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  const printResume = () => {
    setPreview(true);

    setTimeout(() => window.print(), 150);
  };

  return (
    <Layout>
      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div
        className="section-head resume-page-head mb-4"
        data-testid="resume-page-header"
      >
        <div>
          <div className="resume-eyebrow">
            <FiZap /> CAREER WORKSPACE
          </div>

          <h1
            className="page-title"
            data-testid="resume-page-title"
          >
            Resume Builder
          </h1>

          <p
            className="page-subtitle"
            data-testid="resume-page-subtitle"
          >
            Craft a sharper professional story, then
            download a ready-to-share version.
          </p>
        </div>

        <div className="resume-head-actions">

          <button
            className="btn btn-light"
            data-testid="resume-preview-button"
            onClick={() => setPreview(true)}
          >
            <FiEye /> Preview
          </button>

          <button
            className="btn btn-primary"
            data-testid="resume-download-button"
            onClick={printResume}
          >
            <FiDownload /> Download PDF
          </button>

        </div>
      </div>


      {/* ================================================= */}
      {/* RESUME PROGRESS */}
      {/* ================================================= */}

      <div
        className="resume-command-center mb-4"
        data-testid="resume-readiness-section"
      >
        <div className="resume-progress-block">

          <div
            className="resume-score-ring"
            style={{
              "--progress": `${completion * 3.6}deg`,
            }}
            data-testid="resume-completion-score"
          >
            <span>{completion}%</span>
          </div>

          <div>

            <span className="resume-kicker">
              Resume readiness
            </span>

            <h5 data-testid="resume-completion-message">
              {completion === 100
                ? "Ready to impress"
                : `${completedCount} of ${completionItems.length} essentials complete`}
            </h5>

            <p>
              {completion === 100
                ? "Your profile has all the important building blocks."
                : "A complete resume gives recruiters a clearer picture of your impact."}
            </p>

          </div>
        </div>

        <div className="resume-checklist">

          {completionItems
            .slice(0, 4)
            .map((item) => (
              <div
                key={item.label}
                className={
                  item.done ? "check-done" : ""
                }
                data-testid={`resume-check-${item.label
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`}
              >
                <FiCheckCircle />
                {item.label}
              </div>
            ))}

        </div>

        <button
          className="resume-cta"
          data-testid="resume-polish-button"
          onClick={openSummary}
        >
          <FiTarget />

          <span>
            <strong>Polish your profile</strong>
            <small>
              Start with your headline and key skills
            </small>
          </span>

          <FiArrowRight />
        </button>

      </div>


      {/* ================================================= */}
      {/* RESUME SECTIONS */}
      {/* ================================================= */}

      <div className="row g-4">

        {/* ================================================= */}
        {/* SUMMARY */}
        {/* ================================================= */}

        <div className="col-12">

          <div
            className="card resume-card p-4"
            data-testid="resume-summary-section"
          >

            <div className="resume-section-header">

              <div className="d-flex align-items-center gap-2">
                <FiFileText className="text-primary" />

                <h5 className="m-0">
                  Profile Summary & Skills
                </h5>
              </div>

              <button
                className="btn btn-light btn-sm"
                data-testid="resume-edit-summary-button"
                onClick={openSummary}
              >
                <FiEdit2 /> Edit
              </button>

            </div>

            <div className="resume-content mt-3">

              <h4
                className="fw-bold"
                data-testid="resume-headline"
              >
                {data.headline ||
                  "Add a professional headline"}
              </h4>

              <p
                className="text-muted mt-2"
                data-testid="resume-summary-text"
              >
                {data.summary ||
                  "Add a summary to tell recruiters about yourself."}
              </p>

              <div className="mt-3">

                <h6 className="text-uppercase small fw-bold text-secondary mb-2">
                  Skills
                </h6>

                {data.skills?.length > 0 ? (

                  <div
                    className="d-flex flex-wrap gap-2"
                    data-testid="resume-skills-list"
                  >
                    {data.skills.map((s, index) => (
                      <span
                        key={`${s}-${index}`}
                        className="badge skill-badge"
                        data-testid={`resume-skill-${index}`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                ) : (

                  <span
                    className="text-muted small"
                    data-testid="resume-no-skills"
                  >
                    No skills added.
                  </span>

                )}

              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* EXPERIENCE */}
        {/* ================================================= */}

        <div className="col-12">

          <div
            className="card resume-card p-4"
            data-testid="resume-experience-section"
          >

            <div className="resume-section-header">

              <div className="d-flex align-items-center gap-2">
                <FiBriefcase
                  className="text-purple"
                  style={{ color: "#8b5cf6" }}
                />

                <h5 className="m-0">
                  Experience
                </h5>
              </div>

              <button
                className="btn btn-primary btn-sm"
                data-testid="resume-add-experience-button"
                onClick={() => openExp()}
              >
                <FiPlus /> Add
              </button>

            </div>

            <div className="resume-content mt-4">

              {data.experience?.length > 0 ? (

                data.experience.map((exp, index) => (

                  <div
                    key={exp._id}
                    className="resume-item"
                    data-testid={`resume-experience-${exp._id || index}`}
                  >

                    <div className="resume-item-body">

                      <h6
                        data-testid={`resume-experience-role-${exp._id || index}`}
                      >
                        {exp.role}
                      </h6>

                      <div className="resume-item-meta">

                        <span
                          data-testid={`resume-experience-company-${exp._id || index}`}
                        >
                          {exp.company}
                        </span>

                        {exp.duration && (
                          <>
                            <span className="dot-divider">
                              •
                            </span>

                            <span>
                              {exp.duration}
                            </span>
                          </>
                        )}

                      </div>

                      <p className="resume-item-desc mt-2">
                        {exp.description}
                      </p>

                    </div>

                    <div className="resume-item-actions">

                      <button
                        className="icon-btn"
                        data-testid={`resume-edit-experience-${exp._id || index}`}
                        onClick={() => openExp(exp)}
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="icon-btn text-danger"
                        data-testid={`resume-delete-experience-${exp._id || index}`}
                        onClick={() =>
                          deleteExp(exp._id)
                        }
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                  </div>

                ))

              ) : (

                <EmptyState
                  title="No experience"
                  text="Add your work history."
                />

              )}

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* EDUCATION */}
        {/* ================================================= */}

        <div className="col-lg-6">

          <div
            className="card resume-card p-4 h-100"
            data-testid="resume-education-section"
          >

            <div className="resume-section-header">

              <div className="d-flex align-items-center gap-2">

                <FiBook
                  className="text-orange"
                  style={{ color: "#f59e0b" }}
                />

                <h5 className="m-0">
                  Education
                </h5>

              </div>

              <button
                className="btn btn-primary btn-sm"
                data-testid="resume-add-education-button"
                onClick={() => openEdu()}
              >
                <FiPlus /> Add
              </button>

            </div>

            <div className="resume-content mt-4">

              {data.education?.length > 0 ? (

                data.education.map((edu, index) => (

                  <div
                    key={edu._id}
                    className="resume-item"
                    data-testid={`resume-education-${edu._id || index}`}
                  >

                    <div className="resume-item-body">

                      <h6
                        data-testid={`resume-education-degree-${edu._id || index}`}
                      >
                        {edu.degree}
                      </h6>

                      <div className="resume-item-meta">

                        <span
                          data-testid={`resume-education-institute-${edu._id || index}`}
                        >
                          {edu.institute}
                        </span>

                      </div>

                      <div className="resume-item-meta mt-1">

                        {edu.year && (
                          <span>
                            Class of {edu.year}
                          </span>
                        )}

                        {edu.cgpa && (
                          <>
                            <span className="dot-divider">
                              •
                            </span>

                            <span>
                              CGPA: {edu.cgpa}
                            </span>
                          </>
                        )}

                      </div>

                    </div>

                    <div className="resume-item-actions">

                      <button
                        className="icon-btn"
                        data-testid={`resume-edit-education-${edu._id || index}`}
                        onClick={() => openEdu(edu)}
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="icon-btn text-danger"
                        data-testid={`resume-delete-education-${edu._id || index}`}
                        onClick={() =>
                          deleteEdu(edu._id)
                        }
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                  </div>

                ))

              ) : (

                <EmptyState
                  title="No education"
                  text="Add your degrees."
                />

              )}

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* CERTIFICATIONS */}
        {/* ================================================= */}

        <div className="col-lg-6">

          <div
            className="card resume-card p-4 h-100"
            data-testid="resume-certifications-section"
          >

            <div className="resume-section-header">

              <div className="d-flex align-items-center gap-2">

                <FiAward
                  className="text-green"
                  style={{ color: "#10b981" }}
                />

                <h5 className="m-0">
                  Certifications
                </h5>

              </div>

              <button
                className="btn btn-primary btn-sm"
                data-testid="resume-add-certification-button"
                onClick={() => openCert()}
              >
                <FiPlus /> Add
              </button>

            </div>

            <div className="resume-content mt-4">

              {data.certifications?.length > 0 ? (

                data.certifications.map((cert, index) => (

                  <div
                    key={cert._id}
                    className="resume-item"
                    data-testid={`resume-certification-${cert._id || index}`}
                  >

                    <div className="resume-item-body">

                      <h6
                        data-testid={`resume-certification-title-${cert._id || index}`}
                      >
                        {cert.title}
                      </h6>

                      <div className="resume-item-meta">

                        <span
                          data-testid={`resume-certification-issuer-${cert._id || index}`}
                        >
                          {cert.issuer}
                        </span>

                        {cert.year && (
                          <>
                            <span className="dot-divider">
                              •
                            </span>

                            <span>
                              {cert.year}
                            </span>
                          </>
                        )}

                      </div>

                    </div>

                    <div className="resume-item-actions">

                      <button
                        className="icon-btn"
                        data-testid={`resume-edit-certification-${cert._id || index}`}
                        onClick={() =>
                          openCert(cert, index)
                        }
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="icon-btn text-danger"
                        data-testid={`resume-delete-certification-${cert._id || index}`}
                        onClick={() =>
                          deleteCert(index)
                        }
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                  </div>

                ))

              ) : (

                <EmptyState
                  title="No certifications"
                  text="Add your certs."
                />

              )}

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* PREVIEW MODAL */}
      {/* ================================================= */}

      <Modal
        show={preview}
        onHide={() => setPreview(false)}
        size="lg"
        centered
        dialogClassName="resume-preview-dialog"
      >

        <Modal.Header
          closeButton
          className="resume-preview-header"
        >

          <div>

            <span className="resume-kicker">
              LIVE DOCUMENT
            </span>

            <Modal.Title
              data-testid="resume-preview-title"
            >
              Resume preview
            </Modal.Title>

          </div>

          <button
            className="btn btn-primary btn-sm me-4"
            data-testid="resume-preview-download-button"
            onClick={printResume}
          >
            <FiDownload /> Print / Save PDF
          </button>

        </Modal.Header>

        <Modal.Body
          className="resume-preview-paper"
          data-testid="resume-preview-content"
        >

          <header className="preview-identity">

            <h1>
              {data.headline || "Your Name"}
            </h1>

            <p>
              {data.headline
                ? "Professional Profile"
                : "Add a professional headline to get started"}
            </p>

          </header>

          {data.summary && (
            <section>
              <h2>About</h2>
              <p>{data.summary}</p>
            </section>
          )}

          {data.skills?.length > 0 && (
            <section>
              <h2>Core skills</h2>

              <div className="preview-skills">

                {data.skills.map((skill, index) => (
                  <span key={`${skill}-${index}`}>
                    {skill}
                  </span>
                ))}

              </div>
            </section>
          )}

          {data.experience?.length > 0 && (
            <section>
              <h2>Experience</h2>

              {data.experience.map(
                (exp, index) => (
                  <article
                    key={exp._id || index}
                  >

                    <div>
                      <h3>{exp.role}</h3>
                      <strong>{exp.company}</strong>
                    </div>

                    <time>
                      {exp.duration}
                    </time>

                    {exp.description && (
                      <p>
                        {exp.description}
                      </p>
                    )}

                  </article>
                )
              )}

            </section>
          )}

          {data.education?.length > 0 && (
            <section>
              <h2>Education</h2>

              {data.education.map(
                (edu, index) => (
                  <article
                    key={edu._id || index}
                  >

                    <div>
                      <h3>{edu.degree}</h3>
                      <strong>
                        {edu.institute}
                      </strong>
                    </div>

                    <time>
                      {edu.year}
                      {edu.cgpa
                        ? ` · CGPA ${edu.cgpa}`
                        : ""}
                    </time>

                  </article>
                )
              )}

            </section>
          )}

          {data.certifications?.length > 0 && (
            <section>
              <h2>Certifications</h2>

              {data.certifications.map(
                (cert, index) => (
                  <article
                    key={cert._id || index}
                  >

                    <div>
                      <h3>{cert.title}</h3>
                      <strong>
                        {cert.issuer}
                      </strong>
                    </div>

                    <time>
                      {cert.year}
                    </time>

                  </article>
                )
              )}

            </section>
          )}

        </Modal.Body>

      </Modal>


      {/* ================================================= */}
      {/* SUMMARY MODAL */}
      {/* ================================================= */}

      <Modal
        show={showSummary}
        onHide={() => setShowSummary(false)}
        centered
        contentClassName="app-modal"
      >

        <form onSubmit={saveSummary}>

          <Modal.Header closeButton>

            <Modal.Title
              data-testid="resume-summary-modal-title"
            >
              Edit Profile Summary
            </Modal.Title>

          </Modal.Header>

          <Modal.Body>

            <div className="mb-3">

              <label className="form-label">
                Professional Headline
              </label>

              <input
                className="form-control"
                data-testid="resume-headline-input"
                value={summaryForm.headline}
                onChange={(e) =>
                  setSummaryForm({
                    ...summaryForm,
                    headline: e.target.value,
                  })
                }
                placeholder="e.g. Senior Full Stack Engineer"
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Summary
              </label>

              <textarea
                className="form-control"
                data-testid="resume-summary-input"
                rows="4"
                value={summaryForm.summary}
                onChange={(e) =>
                  setSummaryForm({
                    ...summaryForm,
                    summary: e.target.value,
                  })
                }
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Skills (comma separated)
              </label>

              <input
                className="form-control"
                data-testid="resume-skills-input"
                value={summaryForm.skills}
                onChange={(e) =>
                  setSummaryForm({
                    ...summaryForm,
                    skills: e.target.value,
                  })
                }
                placeholder="React, Node.js, MongoDB"
              />

            </div>

          </Modal.Body>

          <Modal.Footer>

            <button
              type="button"
              className="btn btn-light"
              data-testid="resume-summary-cancel-button"
              onClick={() =>
                setShowSummary(false)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              data-testid="resume-summary-save-button"
            >
              Save Changes
            </button>

          </Modal.Footer>

        </form>

      </Modal>


      {/* ================================================= */}
      {/* EXPERIENCE MODAL */}
      {/* ================================================= */}

      <Modal
        show={showExp}
        onHide={() => setShowExp(false)}
        centered
        contentClassName="app-modal"
      >

        <form onSubmit={saveExp}>

          <Modal.Header closeButton>

            <Modal.Title
              data-testid="resume-experience-modal-title"
            >
              {expForm._id
                ? "Edit"
                : "Add"}{" "}
              Experience
            </Modal.Title>

          </Modal.Header>

          <Modal.Body>

            <div className="mb-3">

              <label className="form-label">
                Role / Title
              </label>

              <input
                className="form-control"
                data-testid="resume-experience-role-input"
                required
                value={expForm.role}
                onChange={(e) =>
                  setExpForm({
                    ...expForm,
                    role: e.target.value,
                  })
                }
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Company
              </label>

              <input
                className="form-control"
                data-testid="resume-experience-company-input"
                required
                value={expForm.company}
                onChange={(e) =>
                  setExpForm({
                    ...expForm,
                    company: e.target.value,
                  })
                }
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Duration
              </label>

              <input
                className="form-control"
                data-testid="resume-experience-duration-input"
                placeholder="e.g. Jan 2020 - Present"
                value={expForm.duration}
                onChange={(e) =>
                  setExpForm({
                    ...expForm,
                    duration: e.target.value,
                  })
                }
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Description
              </label>

              <textarea
                className="form-control"
                data-testid="resume-experience-description-input"
                rows="3"
                value={expForm.description}
                onChange={(e) =>
                  setExpForm({
                    ...expForm,
                    description: e.target.value,
                  })
                }
              />

            </div>

          </Modal.Body>

          <Modal.Footer>

            <button
              type="button"
              className="btn btn-light"
              data-testid="resume-experience-cancel-button"
              onClick={() =>
                setShowExp(false)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              data-testid="resume-experience-save-button"
            >
              Save
            </button>

          </Modal.Footer>

        </form>

      </Modal>


      {/* ================================================= */}
      {/* EDUCATION MODAL */}
      {/* ================================================= */}

      <Modal
        show={showEdu}
        onHide={() => setShowEdu(false)}
        centered
        contentClassName="app-modal"
      >

        <form onSubmit={saveEdu}>

          <Modal.Header closeButton>

            <Modal.Title
              data-testid="resume-education-modal-title"
            >
              {eduForm._id
                ? "Edit"
                : "Add"}{" "}
              Education
            </Modal.Title>

          </Modal.Header>

          <Modal.Body>

            <div className="mb-3">

              <label className="form-label">
                Degree
              </label>

              <input
                className="form-control"
                data-testid="resume-education-degree-input"
                required
                placeholder="B.S. Computer Science"
                value={eduForm.degree}
                onChange={(e) =>
                  setEduForm({
                    ...eduForm,
                    degree: e.target.value,
                  })
                }
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Institution
              </label>

              <input
                className="form-control"
                data-testid="resume-education-institute-input"
                required
                value={eduForm.institute}
                onChange={(e) =>
                  setEduForm({
                    ...eduForm,
                    institute: e.target.value,
                  })
                }
              />

            </div>

            <div className="row mb-3">

              <div className="col-6">

                <label className="form-label">
                  Graduation Year
                </label>

                <input
                  className="form-control"
                  data-testid="resume-education-year-input"
                  value={eduForm.year}
                  onChange={(e) =>
                    setEduForm({
                      ...eduForm,
                      year: e.target.value,
                    })
                  }
                />

              </div>

              <div className="col-6">

                <label className="form-label">
                  CGPA / Grade
                </label>

                <input
                  className="form-control"
                  data-testid="resume-education-cgpa-input"
                  value={eduForm.cgpa}
                  onChange={(e) =>
                    setEduForm({
                      ...eduForm,
                      cgpa: e.target.value,
                    })
                  }
                />

              </div>

            </div>

          </Modal.Body>

          <Modal.Footer>

            <button
              type="button"
              className="btn btn-light"
              data-testid="resume-education-cancel-button"
              onClick={() =>
                setShowEdu(false)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              data-testid="resume-education-save-button"
            >
              Save
            </button>

          </Modal.Footer>

        </form>

      </Modal>


      {/* ================================================= */}
      {/* CERTIFICATION MODAL */}
      {/* ================================================= */}

      <Modal
        show={showCert}
        onHide={() => setShowCert(false)}
        centered
        contentClassName="app-modal"
      >

        <form onSubmit={saveCert}>

          <Modal.Header closeButton>

            <Modal.Title
              data-testid="resume-certification-modal-title"
            >
              {certForm._id
                ? "Edit"
                : "Add"}{" "}
              Certification
            </Modal.Title>

          </Modal.Header>

          <Modal.Body>

            <div className="mb-3">

              <label className="form-label">
                Certification Title
              </label>

              <input
                className="form-control"
                data-testid="resume-certification-title-input"
                placeholder="e.g. AWS Certified Developer"
                required
                value={certForm.title}
                onChange={(e) =>
                  setCertForm({
                    ...certForm,
                    title: e.target.value,
                  })
                }
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Issuing Organization
              </label>

              <input
                className="form-control"
                data-testid="resume-certification-issuer-input"
                placeholder="e.g. Amazon Web Services"
                required
                value={certForm.issuer}
                onChange={(e) =>
                  setCertForm({
                    ...certForm,
                    issuer: e.target.value,
                  })
                }
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Year
              </label>

              <input
                className="form-control"
                data-testid="resume-certification-year-input"
                placeholder="e.g. 2024"
                value={certForm.year}
                onChange={(e) =>
                  setCertForm({
                    ...certForm,
                    year: e.target.value,
                  })
                }
              />

            </div>

          </Modal.Body>

          <Modal.Footer>

            <button
              type="button"
              className="btn btn-light"
              data-testid="resume-certification-cancel-button"
              onClick={() =>
                setShowCert(false)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              data-testid="resume-certification-save-button"
            >
              Save
            </button>

          </Modal.Footer>

        </form>

      </Modal>

    </Layout>
  );
}