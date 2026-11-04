import { Link } from "react-router-dom";
import { FiCommand, FiHome, FiArrowLeft, FiGrid } from "react-icons/fi";
import SEO from "../../components/SEO";
import "./NotFound.css";

export default function NotFound() {
  return (
    <main className="not-found-page" role="main">
      <SEO
        title="Page Not Found – DevBoard"
        description="The page you requested could not be found on DevBoard."
        robots="noindex, nofollow"
      />
      <div className="not-found-card">
        <Link to="/" className="not-found-brand" aria-label="DevBoard Home">
          <FiCommand size={22} className="text-primary" />
          <span>DevBoard</span>
        </Link>

        <div className="not-found-badge">
          <span>Error 404</span>
        </div>

        <div className="not-found-code" aria-hidden="true">
          404
        </div>

        <h1 className="not-found-title">Page not found</h1>

        <p className="not-found-text">
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable. Check the URL or return to safety.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="not-found-btn-primary">
            <FiHome size={16} /> Return Home
          </Link>
          <Link to="/dashboard" className="not-found-btn-secondary">
            <FiGrid size={16} /> Dashboard
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="not-found-btn-secondary"
            style={{ cursor: "pointer" }}
            aria-label="Go back to previous page"
          >
            <FiArrowLeft size={16} /> Go Back
          </button>
        </div>
      </div>
    </main>
  );
}

