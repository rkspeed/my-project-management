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

const Bugs = () => {
  const navigate = useNavigate();
  const [bugsData, setBugsData] = useState([]);
  const [bugsDataTemp, setBugsDataTemp] = useState([]);

  useEffect(() => {
    getBugs();
  }, []);

  useEffect(() => {
    setBugsDataTemp(bugsData);
  }, [bugsData]);

  const getBugs = async () => {
    const querySnapshot = await getDocs(collection(db, "bugs"));

    setBugsData(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        project: doc.data().project,
        title: doc.data().title,
        description: doc.data().description,
        reportedDate: doc.data().reportedDate,
        reportedBy: doc.data().reportedBy,
        uploads: doc.data().uploads,
        assignedTo: doc.data().assignedTo,
        status: doc.data().status,
      }))
    );
  };

  const selectProjectData = (value) => {
    const data =
      value == "all" ? bugsData : bugsData.filter((i) => i.project == value);
    setBugsDataTemp(data);
  };
  const selectStatusData = (value) => {
    const data =
      value == "all" ? bugsData : bugsData.filter((i) => i.status == value);
    setBugsDataTemp(data);
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
              <h5>Bugs</h5>
              <button
                style={{
                  backgroundColor: "#008021",
                  padding: 10,
                  color: "white",
                }}
                onClick={() => navigate("/bugs_add")}
              >
                Add +
              </button>
            </div>

            <div className="card-block table-border-style">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}></th>

                      <th style={{ textAlign: "center" }}>
                        <select
                          name="cars"
                          id="cars"
                          className="form-control"
                          onChange={(e) => selectProjectData(e.target.value)}
                        >
                          <option value="all">Select All</option>
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </th>
                      <th style={{ textAlign: "center" }}></th>
                      <th style={{ textAlign: "center" }}></th>
                      <th style={{ textAlign: "center" }}></th>
                      <th style={{ textAlign: "center" }}></th>
                      <th style={{ textAlign: "center" }}></th>
                      <th style={{ textAlign: "center" }}>
                        {" "}
                        <select
                          name="cars"
                          id="cars"
                          className="form-control"
                          onChange={(e) => selectStatusData(e.target.value)}
                          style={{width:'auto'}}
                        
                        >
                          <option value="all" >
                            Select All
                          </option>

                          <option value="Pending">Pending</option>
                          <option value="Inprogress">Inprogress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Reopened">Reopened</option>
                        </select>
                      </th>
                      <th style={{ textAlign: "center" }}></th>
                    </tr>
                    <tr>
                      <th style={{ textAlign: "center" }}>#</th>

                      <th style={{ textAlign: "center" }}>Project Name</th>
                      <th style={{ textAlign: "center" }}>Title</th>
                      <th style={{ textAlign: "center" }}>Description</th>
                      <th style={{ textAlign: "center" }}>reported Date</th>
                      <th style={{ textAlign: "center" }}>Reported By</th>
                      <th style={{ textAlign: "center" }}>Assigned To</th>
                      <th style={{ textAlign: "center" }}>Status</th>
                      <th style={{ textAlign: "center" }}>Uploads</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bugsDataTemp.length > 0 &&
                      bugsDataTemp.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td style={{ textAlign: "center" }}   onClick={() => navigate("/view_bug",{
                            state: {
                              editItem: item,
                            },
                          })}>
                            {item.project}
                          </td>
                          <td style={{ textAlign: "center" }}>{item.title}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.description}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.reportedDate}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.reportedBy}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.assignedTo}
                          </td>
                          <td style={{ textAlign: "center" }}>{item.status}</td>
                          <td style={{ textAlign: "center" }}>
                            <img src={item.uploads} width={100} height={100} />
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <i
                              onClick={() =>
                                navigate("/bugs_edit", {
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

export default Bugs;
