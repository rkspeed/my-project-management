import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import API from "./../../API";
import {
  EmailValidation,
  ArrayValidation,
  EmptyValidation,
} from "./../../Validation/InputValidation";
import { doc, updateDoc,addDoc } from "firebase/firestore";
import { Privillages } from "../../Constant";
import { db } from "./../../Database/Firebase";
const EditProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let editItem = location.state?.editItem;
  const [orgName, setOrgName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [startedDate, setStartedDate] = useState("");
  const [duration, setDuration] = useState("");
  const [editId, setEditId] = useState("");


  useEffect(() => {
    if (editItem) {
      
      setEditId(editItem.id)
      setOrgName(editItem.org_name)
      setProjectName(editItem.project_name);
      setClientName(editItem.client_name);
      setStartedDate(editItem.started_date)
      setDuration(editItem.duration)
    }
  }, [editItem]);

  const checkValidations = async () => {
    const orgNameValid = await EmptyValidation(orgName, "Organization Name");
    const projectNameValid = await EmptyValidation(
      projectName,
      "Project Name"
    );
    const clientNameValid = await EmptyValidation(clientName, "Client Name");
    const startedDateValid = await EmptyValidation(startedDate, "Started Date");
    const durationValid = await EmptyValidation(duration, "Duration");

    if (
      projectNameValid &&
      orgNameValid &&
      clientNameValid &&
      startedDateValid &&
      durationValid
    ) {
      return true;
    } else {
      return false;
    }
  };

  const addProjects = async () => {
    const valid = await checkValidations();

    if (valid) {
      try {
        const data = {
          org_name: orgName,
          project_name: projectName,
          client_name: clientName,
          started_date: startedDate,
          duration: duration,
        };
          const taskDocRef = doc(db, 'projects', editId)
          try{
            await updateDoc(taskDocRef, data)
            alert("Data saved successfully!");
            navigate("/projects")
          } catch (err) {
            alert(err)
          }   


     
       
      } catch (err) {
        alert(err);
      }
    } else {
      return false;
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
                    <h5>Edit Project</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            Organization name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Organization name"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">Project name</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Project name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            Project Client name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Project Client name"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            Project Started date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Project Client name"
                            value={startedDate}
                            onChange={(e) => setStartedDate(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            Project Duration (in months)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Project Duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                          />
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={() => addProjects()}
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

export default EditProject;
