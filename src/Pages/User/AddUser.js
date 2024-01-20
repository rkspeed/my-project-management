import React, { useState } from "react";
import NavSidebar from "./../../Components/NavSidebar";

import { EmailValidation } from "./../../Validation/InputValidation";
import { db } from "./../../Database/Firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const checkValidations = async () => {
    const emailValid = await EmailValidation(email);
    if (emailValid) {
      return true;
    } else {
      return false;
    }
  };

  const addUser = async () => {
    const valid = await checkValidations();
    if (valid) {
      try {
        const data = {
          userName: name,
          email: email,
         
        };
        await addDoc(collection(db, "users"), data);
        alert("success");
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
                    <h5>Add users</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label for="exampleInputEmail1">User name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter name"
                            required
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input
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
                          onClick={() => addUser()}
                        >
                          Add
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

export default AddUser;
