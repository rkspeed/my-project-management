import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import API from "./../../API";
import {
  EmailValidation,
  ArrayValidation,
} from "./../../Validation/InputValidation";
import { db } from "./../../Database/Firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";


import { Privillages } from "../../Constant";

const AddPrivillages = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [privilagesValue, setPrivilagesValue] = useState([]);
  // const db = getDatabase();

  const checkValidations = async () => {
    const emailValid = await EmailValidation(email);
    const priValid = await ArrayValidation(privilagesValue, "privilages");
    if (emailValid && priValid) {
      return true;
    } else {
      return false;
    }
  };

  const addPrivillages = async () => {
    const valid = await checkValidations();
 
    if (valid && privilagesValue.length > 0) {
      try {
        const data = {
          user: email,
          privillages: privilagesValue,
        };
        await addDoc(collection(db, "privillages"), data);
        alert("success");
        navigate("/privillages")
      } catch (err) {
        alert(err);
      }

    
    } else {
      return false;
    }
  };

  const checkPrivilages = (e) => {
    let newArray = privilagesValue;
    const value = e.currentTarget.value;

    if (!privilagesValue.includes(value)) {
      //checking weather array contain the id
      newArray.push(value); //adding to array because value doesnt exists
    } else {
      newArray.splice(newArray.indexOf(value), 1); //deleting
    }

    setPrivilagesValue(newArray);
  };

  return (
    <div>
      <div>
        <div className="row" style={{ margin: 200 }}>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Add Privillages Access</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                 
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Select User to give permition
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      {Privillages.map((item) => (
                        <div className="form-group form-check" key={item.text}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            value={item.text}
                            onClick={(e) => checkPrivilages(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                          >
                            {item.text}
                          </label>
                        </div>
                      ))}

                      <label
                        className="btn btn-primary"
                        style={{ marginTop: 20 }}
                        onClick={() => addPrivillages()}
                      >
                        Submit
                      </label>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPrivillages;
