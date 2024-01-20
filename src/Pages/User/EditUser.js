import React, { useState, useEffect, useRef, createRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { getDatabase, ref, set } from "firebase/database";
import API from "./../../API";
import {
  EmailValidation,
  ArrayValidation,
} from "./../../Validation/InputValidation";
import { doc, updateDoc,addDoc } from "firebase/firestore";
import { Privillages } from "../../Constant";
import { db } from "./../../Database/Firebase";


const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let editUser = location.state?.editUser;
  const [editId, setEditId] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(editUser)
    if (editUser) {
      console.log(editUser);
      setEditId(editUser.id)
      setEmail(editUser.email);
      setUserName(editUser.userName);
      
    }
  }, [editUser]);

  const checkValidations = async () => {
    const emailValid = await EmailValidation(email);
    if (emailValid) {
      return true;
    } else {
      return false;
    }
  };


  const editUserCall = async () => {
    const valid = await checkValidations();
    if (valid ) {
      const data = {
        userName: userName,
        email: email,
      
      };
        const taskDocRef = doc(db, 'users', editId)
        try{
          await updateDoc(taskDocRef, data)
          alert("Data saved successfully!");
          navigate("/users")
        } catch (err) {
          alert(err)
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
                    <h5>Edit users</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label for="exampleInputEmail1">User name</label>
                          <input
                          value={userName}
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter name"
                            required
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input
                          value={email}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <small
                            id="emailHelp"
                            className="form-text text-muted"
                          >
                            We'll never share your email with anyone else.
                          </small>
                        </div>
                       

                        <button
                          className="btn btn-primary"
                          onClick={() => editUserCall()}
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

export default EditUser;
