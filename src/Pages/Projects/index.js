import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import API from "./../../API";
import { db } from "./../../Database/Firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

const Projects = () => {
  const navigate = useNavigate();
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    getprojects();
  }, []);

  const getprojects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
   
    setProjectsData(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        client_name: doc.data().client_name,
        project_name: doc.data().project_name,
        org_name:doc.data().org_name,
        duration:doc.data().duration,
        started_date:doc.data().started_date
      }))
    );
  };

  return (
    <div>
      <div>
        <div className="col-md-12" style={{ marginTop: 100 }}>
          <div className="card">
            <div
              className="card-header"
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <h5>Projects</h5>
              <button
                style={{
                  backgroundColor: "#008021",
                  padding: 10,
                  color: "white",
                }}
                onClick={() => navigate("/projects_add")}
              >
                Add +
              </button>
            </div>

            <div className="card-block table-border-style">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>#</th>
                      <th style={{ textAlign: "center" }}>Client Name</th>
                      <th style={{ textAlign: "center" }}>ORG Name</th>

                      <th style={{ textAlign: "center" }}>Project Name</th>
                      <th style={{ textAlign: "center" }}>Duration</th>
                      <th style={{ textAlign: "center" }}>Project Name</th>
                      <th style={{ textAlign: "center" }}>Started Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {console.log(projectsData)}
                    {projectsData.length > 0 &&
                      projectsData.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td style={{ textAlign: "center" }}>
                            {item.client_name}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.org_name}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.project_name}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.duration}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.started_date}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <i
                              onClick={() =>
                                navigate("/projects_edit", {
                                  state: {
                                    editItem: item,
                                  },
                                })
                              }
                              className="icon feather icon-edit-2"
                              style={{ color: "green" }}
                            ></i>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
