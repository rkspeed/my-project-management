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
import GetBugRate from "./GetBugRate";
import BugCompleted from "./BugCompleted";
import { getUserList, getBugsList, getProjectList } from "./../../CommonFunstion";

const MemberDashboard = () => {
  const navigate = useNavigate();
  const [bugsData, setBugsData] = useState([]);
  const [bugsDataTemp, setBugsDataTemp] = useState([]);
  const [userData, setUserData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [projectsDataTemp, setProjectsDataTemp] = useState([]);
  const [query, setQuery] = useState("");


  useEffect(() => {
    getBugs();
    getProject();
    getUsers();
  }, []);

  useEffect(() => {
    setBugsDataTemp(bugsData);
  }, [bugsData]);

  useEffect(() => {
    setProjectsDataTemp(projectsData);
  }, [projectsData]);

  const getUsers = async () => {
    const data = await getUserList();
    setUserData(data);
  };

  const getBugs = async () => {
    const querySnapshot = await getBugsList();
    setBugsData(querySnapshot);
  };

  const getProject = async () => {
    const querySnapshot = await getProjectList(collection(db, "projects"));
    setProjectsData(
      querySnapshot
    );
  };

  const getStatusColor = (s) => {
    if (s == "Completed") {
      return "text-c-green";
    } else if (s == "Inprogress") {
      return "text-c-red";
    } else {
      return "text-c-purple";
    }
  };

  const selectStatusData = (value) => {
    const data =
      value == "all" ? bugsData : bugsData.filter((i) => i.assignedTo == value);
    setBugsDataTemp(data);

    // get completed bugs
   
    const data1 =data.filter((i) => i.status == 'Completed')
    console.log(data1,data)
    setProjectsDataTemp(data1);


  };

  return (
    <>
      <div style={{ padding: 20 }}>
        <div className="col-xl-8 col-md-12 m-b-30">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <div className="form-group">
              <label for="cars">Select Member</label>

              <select
                name="cars"
                id="cars"
                className="form-control"
                onChange={(e) => selectStatusData(e.target.value)}
              >
                <option value="all">Select All</option>
                {userData.map((i) => (
                  <option value={i.email}>{i.email}</option>
                ))}
              </select>
            </div>
          </ul>
        </div>
        <div>
          {
            <GetBugRate
              bugsData={bugsDataTemp}
              projectsData={projectsDataTemp}
              textValue1="Reported bug"
              textValue2="Fixed bug"
            />
          }
        </div>

        {<BugCompleted bugsData={bugsDataTemp} />}
        <div className="col-xl-8 col-md-12 m-b-30">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link"
                id="contact-tab"
                data-toggle="tab"
                href="#contact"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                All Bugs Reported
              </a>
            </li>
          </ul>
          <div
            className="tab-content"
            id="myTabContent"
            style={{ padding: "0px 10px" }}
          >
            <div
              className="tab-pane fade active show"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Reported by</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th className="text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {bugsDataTemp.map((item) => (
                    <tr>
                      <td>
                        <h6 className="m-0">{item.reportedBy}</h6>
                      </td>
                      <td>
                        <h6 className="m-0">{item.title}</h6>
                      </td>
                      <td>
                        <h6 className="m-0">{item.description}</h6>
                      </td>
                      <td>
                        <h6 className="m-0">{item.reportedDate}</h6>
                      </td>
                      <td>
                        <h6 className={`m-0 ${getStatusColor(item.status)}`}>
                          {item.status}
                        </h6>
                      </td>
                      <td className="text-right">
                        <i
                          className={`fas fa-circle  f-10 ${getStatusColor(
                            item.status
                          )}`}
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
    </>
  );
};

export default MemberDashboard;
