import { Link } from "react-router-dom";
import {
    FaTachometerAlt, FaProjectDiagram, FaBriefcase,
    FaFileAlt, FaGithub, FaCode, FaUser, FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar=()=>{
    return(
        <div className="bg-dark text-white vh-100 p-3 sidebar">
            <h3 className="text-center mb-3">DevBoard</h3>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/dashboard">
                      <FaTachometerAlt className="me-2"/>
                       Dashboard
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/project">
                    <FaProjectDiagram className="me-2"/>
                     Projects</Link>
                </li>
                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/jobs">
                    <FaBriefcase className="me-2"/>
                     Jobs</Link>
                </li>
                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/resume">
                    <FaFileAlt className="me-2"/>
                     Resume</Link>
                </li>
                 <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/github">
                    <FaGithub className="me-2"/>
                     GitHub</Link>
                </li>
                <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/leetcode">
                    <FaCode className="me-2"/>
                     Leetcode</Link>
                </li>
                 <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/profile">
                    <FaUser className="me-2"/>
                     Profile</Link>
                </li>

            </ul>
            <button className="btn btn-danger w-100 mt-5">
                <FaSignOutAlt className="me-2"/>
                Logout
            </button>
        </div>
    );
};

export default Sidebar;