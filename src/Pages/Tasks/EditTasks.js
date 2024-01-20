import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import API from "../../API";
import {
  EmailValidation,
  ArrayValidation,
  EmptyValidation,
} from "../../Validation/InputValidation";
import { db, storage } from "../../Database/Firebase";

import { doc, updateDoc,addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  getUserList,
  getBugsList,
  getProjectList,
} from "../../CommonFunstion";

const EditBugs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let editItem = location.state?.editItem;
  const [project, setProject] = useState("select");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reportedDate, setReportedDate] = useState("");
  const [reportedBy, setReportedBy] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [uploads, setUploads] = useState("");
  const [storageRef, setStorageRef] = useState("");
  const [editId, setEditId] = useState("");
  const [status, setStatus] = useState("Pending");
  const [userData, setUserData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    getUsers();
    getProject();
  }, []);


  useEffect(() => {
    if (editItem) {
      setEditId(editItem.id);
      setProject(editItem.project);
      setTitle(editItem.title);
      setDescription(editItem.description);
      setReportedDate(editItem.reportedDate);
      setReportedBy(editItem.reportedBy);
      setAssignedTo(editItem.assignedTo)
      setStorageRef(editItem.uploads);
   
    }
  }, [editItem]);

  const getUsers = async () => {
    const data = await getUserList();
    setUserData(data);
  };

  const getProject = async () => {
    const data = await getProjectList();
    setProjectData(data);
  };

  const handleSubmit = async () => {
    try {
     

      const data = {
        project: project,
        title: title,
        description: description,
        reportedBy: reportedBy,
        reportedDate: reportedDate,
        uploads: storageRef,
        assignedTo:assignedTo,
        status:status
      };
      console.log(data)
      const taskDocRef = doc(db, "bugs", editId);
      try {
        await updateDoc(taskDocRef, data);
        alert("Data saved successfully!");
        navigate("/bugs");
      } catch (err) {
        alert(err);
      }
    } catch (err) {
      alert(err);
    }
  };

  const changeProject = (e) => {
    setProject(e.target.value);
  };
  const handleChangeImage = async (e) => {
    setUploads(e.target.value);
    //uplaod image to the firebase storage
      const img = e.target.files[0];
      const storageRef = ref(storage, `files/${img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, img);
      const ImageURL = await getDownloadURL(ref(storage, `files/${img.name}`));
      console.log(storageRef)
      setStorageRef(ImageURL);
    
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
                    <h5>Edit Bug</h5>
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
                            placeholder="Enter Reported by"
                            onChange={(e) => changeProject(e)}
                            value={project}
                          >
                            <option value="all">Select All</option>
                            {projectData.map((i) => (
                              <option value={i.project_name}>{i.project_name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">Issue Title </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            Issue Description
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">Reported date</label>
                          <input
                            type="date"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Reported Date"
                            onChange={(e) => setReportedDate(e.target.value)}
                            value={reportedDate}
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">Reported by</label>
                          <select
                            name="cars"
                            id="cars"
                            className="form-control"
                            placeholder="Enter Reported by"
                            onChange={(e) => setReportedBy(e.target.value)}
                            value={reportedBy}
                          >
                            <option value="all">Select All</option>
                            {userData.map((i) => (
                              <option value={i.email}>{i.email}</option>
                            ))}
                          </select>
                         
                        </div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">Assigned To</label>
                          <select
                            name="cars"
                            id="cars"
                            className="form-control"
                            placeholder="Enter Reported by"
                            onChange={(e) => setAssignedTo(e.target.value)}
                            value={assignedTo}
                          >
                            <option value="all">Select All</option>
                            {userData.map((i) => (
                              <option value={i.email}>{i.email}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            Releated Screenshots
                          </label>
                          <input
                            type="file"
                            id="img"
                            name="img"
                            accept="image/*"
                            className="form-control"
                            onChange={handleChangeImage}
                            // onChange={(e) => setUploads(e.target.files[0]) }
                            value={uploads}
                          />
                        </div>

                        <button
                          className="btn btn-primary"
                          onClick={() => handleSubmit()}
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

export default EditBugs;
