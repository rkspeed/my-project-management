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

const Privillages = () => {
  const navigate = useNavigate();
  const [privillagesData, setPrivillagesData] = useState([]);

  useEffect(() => {
    getPrivillages();
  }, []);

  const getPrivillages = async () => {
    const querySnapshot = await getDocs(collection(db, "privillages"));

    setPrivillagesData(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        privillages: doc.data().privillages,
        user: doc.data().user,
      }))
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
              <h5>Privillages</h5>
              <button
                style={{
                  backgroundColor: "#008021",
                  padding: 10,
                  color: "white",
                }}
                onClick={() => navigate("/privillages_add")}
              >
                Add +
              </button>
            </div>

            <div className="card-block table-border-style">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>#</th>
                      <th style={{ textAlign: "center" }}>User</th>
                      <th style={{ textAlign: "center" }}>Privillages</th>
                      <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(privillagesData)}
                    {privillagesData.length > 0 &&
                      privillagesData.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td style={{ textAlign: "center" }}>{item.user}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.privillages.map((p) => (
                              <p>{p}</p>
                            ))}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <i
                              onClick={() =>
                                navigate("/privillages_edit", {
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

export default Privillages;
