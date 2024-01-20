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

const Teams = () => {
  const navigate = useNavigate();
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = async () => {
    const querySnapshot = await getDocs(collection(db, "teams"));

    setTeamsData(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        project: doc.data().project,
        members: doc.data().members,
        role: doc.data().role,
        joinedDate: doc.data().joinedDate,
   
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
              <h5>Teams</h5>
              <button
                style={{
                  backgroundColor: "#008021",
                  padding: 10,
                  color: "white",
                }}
                onClick={() => navigate("/teams_add")}
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

                      <th style={{ textAlign: "center" }}>Project Name</th>
                      <th style={{ textAlign: "center" }}>Members</th>
                      <th style={{ textAlign: "center" }}>Role</th>
                      <th style={{ textAlign: "center" }}>Joined Date</th>
                      <th style={{ textAlign: "center" }}>Action </th>
                   
                    </tr>
                  </thead>

                  <tbody>
                    {teamsData.length > 0 &&
                      teamsData.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td style={{ textAlign: "center" }}>
                            {item.project}
                          </td>
                          <td style={{ textAlign: "center" }}>{item.members}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.role}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.joinedDate}
                          </td>
                        
                          <td style={{ textAlign: "center" }}>
                            <i
                              onClick={() =>
                                navigate("/teams_edit", {
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

export default Teams;
