import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import API from "./../../API";
import {
  EmailValidation,
  ArrayValidation,
  EmptyValidation,
} from "./../../Validation/InputValidation";
import { db } from "./../../Database/Firebase";
import { doc, updateDoc,addDoc } from "firebase/firestore";

const EditTeams = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let editItem = location.state?.editItem;
  const [project, setProject] = useState("select");
  const [members, setMembers] = useState("");
  const [role, setRole] = useState("select");
  const [joinedDate, setJoinedDate] = useState("");
  const [editId, setEditId] = useState("");

  useEffect(() => {
    if (editItem) {
      setEditId(editItem.id);
      setProject(editItem.project);
      setMembers(editItem.members);
      setRole(editItem.role);
      setJoinedDate(editItem.joinedDate);
     
    }
  }, [editItem]);

  const editTeams = async () => {
    try {
     
      

      const data = {
        project: project,
        members: members,
        role: role,
        joinedDate: joinedDate,
      };
     
      const taskDocRef = doc(db, "teams", editId);
      try {
        await updateDoc(taskDocRef, data);
        alert("Data saved successfully!");
        navigate("/teams");
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
        <div className="main-body">
          <div className="page-wrapper">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6" style={{ marginTop: 80 }}>
                <div className="card">
                  <div className="card-header">
                    <h5>Add Teams</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                  
                          <div className="form-group">
                            <label for="cars">Select Project</label>

                            <select
                              name="cars"
                              id="cars"
                              className="form-control"
                              onChange={(e) => setProject(e.target.value)}
                              value={project}
                            >
                              <option value="select">Select Projects</option>
                              <option value="volvo">Volvo</option>
                              <option value="saab">Saab</option>
                              <option value="mercedes">Mercedes</option>
                              <option value="audi">Audi</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label for="exampleInputEmail1">
                              Select member{" "}
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter Title"
                              onChange={(e) => setMembers(e.target.value)}
                              value={members}
                            />
                          </div>
                          <div className="form-group">
                            <label for="cars">Select Role</label>

                            <select
                              name="cars"
                              id="cars"
                              className="form-control"
                              onChange={(e) => setRole(e.target.value)}
                              value={role}
                            >
                              <option value="select">Select Projects</option>
                              <option value="qa">QA</option>
                              <option value="se">SE</option>
                              <option value="atl">ATL</option>
                              <option value="pm">PM</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label for="exampleInputEmail1">Joined date</label>
                            <input
                              type="date"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter Reported Date"
                              onChange={(e) => setJoinedDate(e.target.value)}
                              value={joinedDate}
                            />
                          </div>

                          <button
                            className="btn btn-primary"
                            onClick={() => editTeams()}
                          >
                            Update
                          </button>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTeams;