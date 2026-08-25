/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
} from "react-icons/fi";

import api from "../../api/axios";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import EmptyState from "../../components/EmptyState";
import Pagination from "../../components/Pagination";
import useDebounce from "../../hooks/useDebounce";
import "./Jobs.css";

const blank = {
  company: "",
  role: "",
  location: "",
  jobType: "Remote",
  status: "Applied",
  notes: "",
};

const statuses = [
  "Applied",
  "Interview",
  "Assessment",
  "Offer",
  "Rejected",
];

export default function Jobs() {

  const location = useLocation();

  const [items, setItems] = useState(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState(null);

  const debouncedQ = useDebounce(q, 350);

  // Load jobs
  const load = async () => {

    try {

      const params = new URLSearchParams({
        page,
        limit: 5,
      });

      if (debouncedQ) {
        params.append("search", debouncedQ);
      }

      if (filter) {
        params.append("status", filter);
      }

      const { data } = await api.get(
        `/jobs?${params.toString()}`
      );

      setItems(data.jobs || []);
      setTotalPages(data.totalPages || 1);

    } catch (error) {

      setItems([]);

      toast.error("Could not load jobs");
    }
  };

  // Reload when page/search/filter changes
  useEffect(() => {

    load();

  }, [page, debouncedQ, filter]);


  // Open Add Job form when /jobs/new is used
  useEffect(() => {

    if (location.pathname === "/jobs/new") {
      setForm(blank);
    }

  }, [location.pathname]);


  const list = items || [];


  // Update form field
  const set = (key, value) => {

    setForm((current) => ({
      ...current,
      [key]: value,
    }));

  };


  // Save job
  const save = async (e) => {

    e.preventDefault();

    try {

      if (form._id) {

        await api.put(
          `/jobs/${form._id}`,
          form
        );

      } else {

        await api.post(
          "/jobs",
          form
        );
      }

      toast.success("Application saved");

      setForm(null);

      load();

    } catch (e) {

      toast.error(
        e.response?.data?.message ||
        "Unable to save application"
      );
    }
  };


  // Loading state
  if (items === null) {

    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }


  return (

    <Layout>

      {/* Page Header */}

      <div className="section-head">

        <div>

          <h1 className="page-title">
            Job tracker
          </h1>

          <p className="page-subtitle">
            Track every application and interview.
          </p>

        </div>

        <button
          className="btn btn-primary"
          data-testid="add-job-button"
          onClick={() => setForm(blank)}
        >
          <FiPlus />
          Add job
        </button>

      </div>


      {/* Add / Edit Job Form */}

      {form && (

        <form
          className="card p-4 mb-4"
          data-testid="job-form"
          onSubmit={save}
        >

          <h5 className="mb-3">
            {form._id ? "Edit" : "Add"} application
          </h5>


          <div className="row g-3">

            {/* Company */}

            <Field
              label="Company"
              value={form.company}
              set={(v) => set("company", v)}
              req
              testId="job-company-input"
            />


            {/* Role */}

            <Field
              label="Role"
              value={form.role}
              set={(v) => set("role", v)}
              req
              testId="job-role-input"
            />


            {/* Location */}

            <Field
              label="Location"
              value={form.location}
              set={(v) => set("location", v)}
              req
              testId="job-location-input"
            />


            {/* Job Type */}

            <Select
              label="Job type"
              value={form.jobType}
              set={(v) => set("jobType", v)}
              options={[
                "Remote",
                "Hybrid",
                "On-site",
              ]}
              testId="job-type-select"
            />


            {/* Status */}

            <Select
              label="Status"
              value={form.status}
              set={(v) => set("status", v)}
              options={statuses}
              testId="job-status-select"
            />

          </div>


          {/* Notes */}

          <label className="mt-3">
            Notes
          </label>

          <textarea
            className="form-control"
            data-testid="job-notes-input"
            value={form.notes || ""}
            onChange={(e) =>
              set("notes", e.target.value)
            }
          />


          {/* Buttons */}

          <div className="mt-3">

            <button
              type="button"
              className="btn btn-light me-2"
              data-testid="cancel-job-button"
              onClick={() => setForm(null)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              data-testid="save-job-button"
            >
              Save application
            </button>

          </div>

        </form>
      )}


      {/* Job List */}

      <div className="card p-3">

        {/* Search + Filter */}

        <div className="d-flex gap-2 flex-wrap mb-3">

          {/* Search */}

          <div className="input-group search-box">

            <span className="input-group-text">
              <FiSearch />
            </span>

            <input
              className="form-control"
              placeholder="Search jobs..."
              data-testid="jobs-search-input"
              value={q}
              onChange={(e) => {

                setQ(e.target.value);
                setPage(1);

              }}
            />

          </div>


          {/* Status Filter */}

          <select
            className="form-select filter-select"
            data-testid="jobs-status-filter"
            value={filter}
            onChange={(e) => {

              setFilter(e.target.value);
              setPage(1);

            }}
          >

            <option value="">
              All statuses
            </option>

            {statuses.map((s) => (

              <option
                key={s}
                value={s}
              >
                {s}
              </option>

            ))}

          </select>

        </div>


        {/* Jobs */}

        {list.length ? (

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>

                  <th>
                    Company & role
                  </th>

                  <th>
                    Location
                  </th>

                  <th>
                    Status
                  </th>

                  <th></th>

                </tr>

              </thead>


              <tbody>

                {list.map((j) => (

                  <tr
                    key={j._id}
                    data-testid={`job-row-${j._id}`}
                  >

                    <td>

                      <strong
                        data-testid={`job-role-${j._id}`}
                      >
                        {j.role}
                      </strong>

                      <div
                        className="text-muted small"
                        data-testid={`job-company-${j._id}`}
                      >
                        {j.company}
                      </div>

                    </td>


                    <td
                      data-testid={`job-location-${j._id}`}
                    >
                      {j.location}
                    </td>


                    <td>

                      <span
                        className={`status ${j.status}`}
                        data-testid={`job-status-${j._id}`}
                      >
                        {j.status}
                      </span>

                    </td>


                    <td className="text-end">

                      {/* Edit */}

                      <button
                        type="button"
                        className="icon-btn"
                        data-testid={`edit-job-${j._id}`}
                        onClick={() =>
                          setForm(j)
                        }
                      >
                        <FiEdit2 />
                      </button>


                      {/* Delete */}

                      <button
                        type="button"
                        className="icon-btn text-danger"
                        data-testid={`delete-job-${j._id}`}
                        onClick={async () => {

                          try {

                            await api.delete(
                              `/jobs/${j._id}`
                            );

                            toast.success(
                              "Job deleted"
                            );

                            load();

                          } catch (error) {

                            toast.error(
                              "Unable to delete job"
                            );
                          }

                        }}
                      >
                        <FiTrash2 />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <EmptyState
            title="No jobs found"
            text="Add an application to start tracking opportunities."
          />

        )}


        {/* Pagination */}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

      </div>

    </Layout>
  );
}


/* =========================================================
   Field Component
   ========================================================= */

function Field({
  label,
  value,
  set,
  req,
  testId,
}) {

  return (

    <div className="col-md-6">

      <label>
        {label}
      </label>

      <input
        className="form-control"
        data-testid={testId}
        value={value || ""}
        onChange={(e) =>
          set(e.target.value)
        }
        required={req}
      />

    </div>
  );
}


/* =========================================================
   Select Component
   ========================================================= */

function Select({
  label,
  value,
  set,
  options,
  testId,
}) {

  return (

    <div className="col-md-6">

      <label>
        {label}
      </label>

      <select
        className="form-select"
        data-testid={testId}
        value={value || ""}
        onChange={(e) =>
          set(e.target.value)
        }
      >

        {options.map((x) => (

          <option
            key={x}
            value={x}
          >
            {x}
          </option>

        ))}

      </select>

    </div>
  );
}