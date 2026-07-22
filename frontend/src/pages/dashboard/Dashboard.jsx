import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import { useState,useEffect } from "react";
import API from "../../api/axios.js";
import {
  FaProjectDiagram,
  FaBriefcase,
  FaTools,
  FaAward,
} from "react-icons/fa";

import "./Dashboard.css";

const Dashboard = () => {
   const [dashboardData, setDashboardData] = useState(null);
   useEffect(()=>{
      const fetchDashboard = async()=>{
         try{
            const res = await API.get("/dashboard");
            setDashboardData(res.data);
         }catch(error){
            console.log(error);
         }
      };
      fetchDashboard();
   },[]);

  return (
    <div className="d-flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 main-content">

        {/* Navbar */}
        <Navbar />

        <div className="container-fluid p-4">

          {/* Statistics Cards */}
          <div className="row g-4">

            <div className="col-lg-3 col-md-6">
              <StatCard
                title="Projects"
                value={dashboardData?.summary?.totalProjects || 0}
                icon={<FaProjectDiagram size={35} />}
                bgColor="bg-primary"
              />
            </div>

            <div className="col-lg-3 col-md-6">
              <StatCard
                title="Jobs"
                value={dashboardData?.summary?.totalJobs || 0}
                icon={<FaBriefcase size={35} />}
                bgColor="bg-success"
              />
            </div>

            <div className="col-lg-3 col-md-6">
              <StatCard
                title="Skills"
                value={dashboardData?.summary?.totalSkills || 0}
                icon={<FaTools size={35} />}
                bgColor="bg-warning"
              />
            </div>

            <div className="col-lg-3 col-md-6">
              <StatCard
                title="Offers"
                value={dashboardData?.summary?.offers || 0}
                icon={<FaAward size={35} />}
                bgColor="bg-danger"
              />
            </div>

          </div>

          {/* Recent Projects & Recent Jobs */}
          <div className="row mt-5">

            <div className="col-lg-6">

              <div className="card shadow border-0">

                <div className="card-body">

    <h4>Recent Projects</h4>

    <hr />

    {
        dashboardData?.projects?.recent?.length > 0 ? (

            dashboardData.projects.recent.map((project) => (

                <p key={project._id}>
                    {project.title}
                </p>

            ))

        ) : (

            <p className="text-muted">
                No projects available.
            </p>

        )
    }

</div>
              </div>

            </div>

            <div className="col-lg-6">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4>Recent Jobs</h4>

                  <hr />

                  <p className="text-muted">
                    No jobs available.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;