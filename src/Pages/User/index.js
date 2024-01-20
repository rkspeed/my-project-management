import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { db } from "./../../Database/Firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import {
  getUserList,
  getBugsList,
  getProjectList,
} from "./../../CommonFunstion";

const User = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const querySnapshot = await getUserList();
    setUserData(querySnapshot);
  };

  return (
    <div>
      <div>
        <div className="col-md-12" style={{ marginTop: 100 }}>
          <div className="card">
            <div className="card-header">
              <h5>Users</h5>
            </div>
            <div className="card-block table-border-style">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{user.userName}</td>
                        <td>Otto</td>
                        <td>{user.email}</td>
                        <td style={{ textAlign: "center" }}>
                          <i
                            onClick={() =>
                              navigate("/users_edit", {
                                state: {
                                  editUser: user,
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

export default User;
