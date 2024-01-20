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
  updateDoc,
  doc
} from "firebase/firestore";



const ChangeStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("select");
  const [bugsData, setBugsData] = useState([]);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    getBugs();
  }, []);

  const getBugs = async () => {
    const querySnapshot = await query(
      collection(db, "bugs"),

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

  const changeProject = (e, i) => {
    setStatus(e.target.value);
    setEditId(i.id);
    handleSubmit(i, e.target.value)
  };

  const handleSubmit = async (i, value) => {
    try {
    
      const data = {
        project: i.project,
        title: i.title,
        description: i.description,
        reportedBy: i.reportedBy,
        reportedDate: i.reportedDate,
        uploads: i.uploads,
        assignedTo:i.assignedTo,
        status:value
     
      };
      console.log(data)
      const taskDocRef = doc(db, "bugs", i.id);
      try {
        await updateDoc(taskDocRef, data);
        alert("Data saved successfully!");
       
        window.location.reload();
      } catch (err) {
        alert(err);
      }
    } catch (err) {
      alert(err);
    }
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
              <h5>Task List</h5>
            </div>

            <div className="card-block table-border-style">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>#</th>

                      <th style={{ textAlign: "center" }}>Title</th>
                      <th style={{ textAlign: "center" }}>Description</th>

                      <th style={{ textAlign: "center" }}>Reported By</th>

                      <th style={{ textAlign: "center" }}>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bugsData.length > 0 &&
                      bugsData.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>

                          <td style={{ textAlign: "center" }}>{item.title}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.description}
                          </td>

                          <td style={{ textAlign: "center" }}>
                            {item.reportedBy}
                          </td>

                          <td style={{ textAlign: "center" }}>{item.status}</td>

                          <td style={{ textAlign: "center" }}>
                            <select
                              name="cars"
                              id="cars"
                              className="form-control"
                              onChange={(e) => changeProject(e, item)}
                              value={item.status}
                         
                            >
                              <option value="select" disabled>Select option</option>

                              <option value="Pending">Pending</option>
                              <option value="Inprogress">Inprogress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Reopened">Reopened</option>
                            </select>
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

export default ChangeStatus;
