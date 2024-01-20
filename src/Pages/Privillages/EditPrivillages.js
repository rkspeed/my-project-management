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

const EditPrivillages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let editItem = location.state?.editItem;
  const [editId, setEditId] = useState("");
  const [email, setEmail] = useState("");
  const [privilagesValue, setPrivilagesValue] = useState([]);
 

  useEffect(() => {
    if (editItem) {
      console.log(editItem);
      setEditId(editItem.id)
      setEmail(editItem.user);
      setPrivilagesValue(editItem.privillages);
    }
  }, [editItem]);


  
  const checkValidations = async () => {
    const emailValid = await EmailValidation(email);
    const priValid = await ArrayValidation(privilagesValue, "privilages");
    if (emailValid && priValid) {
      return true;
    } else {
      return false;
    }
  };
  const editPrivillages = async () => {
    const valid = await checkValidations();
    if (valid && privilagesValue.length > 0) {
      const data = {
        user: email,
        privillages: privilagesValue,
      };
        const taskDocRef = doc(db, 'privillages', editId)
        try{
          await updateDoc(taskDocRef, data)
          alert("Data saved successfully!");
          navigate("/privillages")
        } catch (err) {
          alert(err)
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
      setPrivilagesValue(newArray);
    } else {
      newArray.splice(newArray.indexOf(value), 1); //deleting
      setPrivilagesValue(newArray);
    }
 
   
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
                      <label for="exampleInputEmail1">
                        Select User to give permiton
                      </label>
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
                    </div>
                    {Privillages.map((item) => (
                      <div className="form-group form-check" key={item.text}>
                        {console.log(privilagesValue,"ll")}
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          value={item.text}
                          onClick={(e) => checkPrivilages(e)}
                          // checked={privilagesValue.includes(item.text)}
                        />
                        <label className="form-check-label" for="exampleCheck1">
                          {item.text}
                        </label>
                      </div>
                    ))}

                    <button
                      className="btn btn-primary"
                      style={{ marginTop: 20 }}
                      onClick={() => editPrivillages()}
                    >
                      Submit
                    </button>
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

export default EditPrivillages;
