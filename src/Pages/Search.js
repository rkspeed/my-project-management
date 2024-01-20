import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "./../API";
import { db } from "./../Database/Firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  where,
} from "firebase/firestore";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let searchKey = location.state?.searchKey;
  const [bugsData, setBugsData] = useState([]);

  useEffect(() => {
    getBugs();
    setBugsData([]);
  }, [searchKey]);

  const getBugs = async () => {
    console.log(searchKey);
    const querySnapshot = await query(
      collection(db, "bugs"),
      where("title", ">=", searchKey),
      orderBy("title", "asc")
    );
    onSnapshot(querySnapshot, (snapshot) =>
      setBugsData(
        snapshot.docs.map((doc) => ({
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
      )
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
              <h5>Searched Bugs</h5>
              <button
                style={{
                  backgroundColor: "#008021",
                  padding: 10,
                  color: "white",
                }}
                onClick={() => navigate("/bugs_add")}
              >
                Time Log 
              </button>
            </div>

            <div className="card-block table-border-style">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
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
                    {bugsData.length > 0 &&
                      bugsData.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td style={{ textAlign: "center" }}>
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

export default Search;
